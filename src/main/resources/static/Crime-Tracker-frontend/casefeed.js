// document.getElementById('crimeCaseForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const formData = new FormData();
//     formData.append('caseTitle', document.getElementById('caseTitle').value);
//     formData.append('caseDescription', document.getElementById('caseDescription').value);
//     formData.append('caseLocation', document.getElementById('caseLocation').value);

//     const caseImage = document.getElementById('caseImage').files[0];
//     if (caseImage) {
//         formData.append('caseImage', caseImage);
//     }

//     console.log('--- Sending Form Data to Spring Boot Backend ---');

//     fetch('http://localhost:8080/api/userfeed/submit', {  // ✅ Full backend URL
//         method: 'POST',
//         body: formData,
//         credentials: 'include' // ✅ Needed to send session cookie to Spring Security
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(err => {
//                 throw new Error(err.message || `Server error: ${response.status}`);
//             }).catch(() => {
//                 throw new Error(`Server error: ${response.status}`);
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Case submitted successfully:', data);
//         alert('✅ Crime case submitted successfully!');
//         this.reset(); // Clear form after successful submission

//         // Optional: Refresh newsfeed after post
//         // if (typeof fetchCrimeCases === 'function') {
//         //     fetchCrimeCases();
//         // }
//     })
//     .catch(error => {
//         console.error('🚫 Error submitting case:', error);
//         alert('Error submitting your case: ' + error.message);
//     });
// });
document.addEventListener('DOMContentLoaded', async function() {
    const crimeCaseForm = document.getElementById('crimeCaseForm');

    // --- CSRF TOKEN HANDLING ---
    let csrfTokenValue = null; // To store the actual CSRF token string
    let csrfHeaderName = null; // To store the header name (e.g., 'X-XSRF-TOKEN')

    // Function to fetch CSRF token from the API endpoint.
    async function fetchCsrfToken() {
        try {
            console.log("Attempting to fetch CSRF token...");
            const csrfResponse = await fetch('http://localhost:8080/api/auth/csrf-check', {
                method: 'GET',
                credentials: 'include' // ESSENTIAL: Ensures JSESSIONID is sent and XSRF-TOKEN cookie is received
            });

            if (!csrfResponse.ok) {
                const errorText = await csrfResponse.text();
                throw new Error(`Failed to fetch CSRF token: ${csrfResponse.status} ${errorText}`);
            }

            const csrfData = await csrfResponse.json();
            csrfTokenValue = csrfData.token;
            csrfHeaderName = csrfData.headerName;

            if (!csrfTokenValue || !csrfHeaderName) {
                console.error("❌ CSRF token or header name missing from endpoint response. Check server's /api/auth/csrf-check response.");
                return false; // Indicate failure
            }

            console.log("✅ CSRF token obtained:", csrfTokenValue);
            console.log("✅ CSRF header name:", csrfHeaderName);
            // console.log("🍪 document.cookie =", document.cookie); // For debugging, HttpOnly tokens won't show here
            return true; // Indicate success

        } catch (error) {
            console.error("❌ Error fetching CSRF token:", error);
            alert("Error initializing page: Could not get security token. Please try again.");
            return false; // Indicate failure
        }
    }

    // Call fetchCsrfToken immediately when the page loads
    const csrfFetched = await fetchCsrfToken();
    if (!csrfFetched) {
        // If CSRF token couldn't be fetched, perhaps disable the form or show an error
        crimeCaseForm.querySelector('button[type="submit"]').disabled = true;
        return; // Stop further execution if CSRF isn't ready
    }

    // --- FORM SUBMISSION ---
    crimeCaseForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Re-check CSRF token just before submission, in case it expired or was missed
        if (!csrfTokenValue || !csrfHeaderName) {
            console.error("❌ CSRF token not available. Attempting to re-fetch.");
            const reFetched = await fetchCsrfToken(); // Try fetching again
            if (!reFetched) {
                alert("Error: Security token not available. Please refresh the page.");
                return; // Stop if re-fetch fails
            }
        }

        const formData = new FormData();
        formData.append('caseTitle', document.getElementById('caseTitle').value);
        formData.append('caseDescription', document.getElementById('caseDescription').value);
        formData.append('caseLocation', document.getElementById('caseLocation').value);

        const caseImage = document.getElementById('caseImage').files[0];
        if (caseImage) {
            formData.append('caseImage', caseImage);
        }

        console.log('--- Sending Form Data to Spring Boot Backend ---');

        const headers = {};
        // Add the CSRF token to the request headers
        headers[csrfHeaderName] = csrfTokenValue;

        try {
            const response = await fetch('http://localhost:8080/api/userfeed/submit', {
                method: 'POST',
                // IMPORTANT: DO NOT manually set 'Content-Type': 'multipart/form-data' when using FormData.
                // Fetch will automatically set it correctly with the boundary.
                headers: headers, // Pass the headers object with CSRF
                body: formData, // The FormData object
                credentials: 'include' // Needed to send session cookie AND XSRF-TOKEN cookie to Spring Security
            });

            if (!response.ok) {
                let errorMessage = `Server error: ${response.status}`;
                try {
                    const errorJson = await response.json();
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const data = await response.text(); // Assuming your backend returns JSON on success
            console.log('Case submitted successfully:', data);
            alert('✅ Crime case submitted successfully!');
            crimeCaseForm.reset(); // Clear form after successful submission

            // Optional: Refresh newsfeed after post
            // if (typeof fetchCrimeCases === 'function') {
            //     fetchCrimeCases();
            // }

        } catch (error) {
            console.error('🚫 Error submitting case:', error);
            alert('Error submitting your case: ' + error.message);
        }
        window.location.href = "landingpage.html";
    });
});