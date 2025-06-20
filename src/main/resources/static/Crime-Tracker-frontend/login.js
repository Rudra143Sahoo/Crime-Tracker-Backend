// console.log("Login JS loaded");

// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById('loginForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();

//       fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => { throw new Error(text); });
//         }
//         return response.text();
//       })
//       .then(data => {
//         alert('✅ Login successful!');
//         window.location.href = 'index.html'; // Redirect on success
//       })
//       .catch(error => {
//         alert('❌ Login failed: ' + error.message);
//       });
//     });
//   } else {
//     console.error("⚠️ loginForm not found in DOM.");
//   }
// });
// function getCsrfToken() {
//   const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//   return match ? decodeURIComponent(match[1]) : null;
// }
// console.log("Login JS loaded");

// document.addEventListener("DOMContentLoaded", function () {
//    // Step 1: Trigger backend to set CSRF cookie
//   fetch('http://localhost:8080/api/auth/csrf-check', {
//     method: 'GET',
//     credentials: 'include'
//   }).then(() => {
//     console.log("✅ CSRF cookie received");
//   });

//   // Step 2: Setup login form submit
//   const loginForm = document.getElementById('loginForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();
      

//       fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',  // important for session cookies
//         body: JSON.stringify({ email, password })
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => { throw new Error(text); });
//         }
//         return response.text();
//       })
//       .then(data => {
//         alert('✅ Login successful!');
//         window.location.href = 'casefeed.html'; // Change if needed
//       })
//       .catch(error => {
//         alert('❌ Login failed: ' + error.message);
//       });
//     });
//   } else {
//     console.error("⚠️ loginForm not found in DOM.");
//   }
// });
// function getCsrfToken() {
//   const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//   return match ? decodeURIComponent(match[1]) : null;
// }

// console.log("Login JS loaded");

// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById('loginForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();

//       fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': getCsrfToken()   // 💥 CSRF token added here
//         },
//         credentials: 'include',  // ⚠️ Needed for session cookies
//         body: JSON.stringify({ email, password })
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => { throw new Error(text); });
//         }
//         return response.text();
//       })
//       .then(data => {
//         alert('✅ Login successful!');
//         window.location.href = 'casefeed.html'; // 👈 Update as needed
//       })
//       .catch(error => {
//         alert('❌ Login failed: ' + error.message);
//       });
//     });
//   } else {
//     console.error("⚠️ loginForm not found in DOM.");
//   }
//});
// function getCsrfToken() {
//   const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//   return match ? decodeURIComponent(match[1]) : null;
// }

// console.log("Login JS loaded");

// document.addEventListener("DOMContentLoaded", function () {
//   // 🧠 First, fetch CSRF cookie
//   fetch('http://localhost:8080/api/auth/csrf-check', {
//     method: 'GET',
//     credentials: 'include'
//   }).then(() => {
//     console.log("✅ CSRF cookie fetched");
//   });

//   const loginForm = document.getElementById('loginForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();

//       fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': getCsrfToken()   // ✅ CSRF token from cookie
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, password })
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => { throw new Error(text); });
//         }
//         return response.text();
//       })
//       .then(data => {
//         alert('✅ Login successful!');
//         window.location.href = 'casefeed.html';
//       })
//       .catch(error => {
//         alert('❌ Login failed: ' + error.message);
//       });
//     });
//   } else {
//     console.error("⚠️ loginForm not found in DOM.");
//   }
// });










// ---------------------------------------------------------------------------------------------------------

// function getCsrfToken() {
//   const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//   return match ? decodeURIComponent(match[1]) : null;
// }
// function getCsrfToken() {
//   const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
//   return match ? decodeURIComponent(match[2]) : null;
// }


// console.log("✅ Login JS loaded");

// document.addEventListener("DOMContentLoaded", function () {
//   //Force session creation
//   fetch('http://localhost:8080/test-session', {
//     method: 'GET',
//     credentials: 'include'
//   })
//   .then(response => response.text())
//   .then(data => {
//     console.log("✅ Session + cookie setup:", data);
//   });
//   // Step 1: Trigger CSRF token setting
//   fetch('http://localhost:8080/api/auth/csrf-check', {
//     method: 'GET',
//     credentials: 'include'
//   })
//   .then(() => {
//     console.log("✅ CSRF cookie received");
//     console.log("🍪 document.cookie =", document.cookie); // ← check if XSRF-TOKEN is here 

//   })
//   .catch(err => console.error("❌ Failed to get CSRF cookie", err));

//   // Step 2: Handle login
//   const loginForm = document.getElementById('loginForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value.trim();
//       const csrfToken = getCsrfToken();
//       console.log("🔐 CSRF Token:", csrfToken);

//       if (!csrfToken) {
//         alert("❌ CSRF token not found!");
//         return;
//       }

//       fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': csrfToken
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, password })
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.text().then(text => { throw new Error(text); });
//         }
//         return response.text();
//       })
//       .then(data => {
//         alert('✅ Login successful!');
//         window.location.href = 'casefeed.html';
//       })
//       .catch(error => {
//         alert('❌ Login failed: ' + error.message);
//       });
//     });
//   } else {
//     console.error("⚠️ loginForm not found in DOM.");
//   }
// });






// function getCsrfToken() {
//     const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
//     return match ? decodeURIComponent(match[2]) : null;
// }

// console.log("✅ Login JS loaded");

// document.addEventListener("DOMContentLoaded", async function () { // Made the callback async

//     // Force session creation - this can run in parallel or before the CSRF check if needed
//     // But it's good to ensure a session exists before asking for a CSRF token.
//     try {
//         const sessionResponse = await fetch('http://localhost:8080/test-session', {
//             method: 'GET',
//             credentials: 'include'
//         });
//         const sessionData = await sessionResponse.text();
//         console.log("✅ Session + cookie setup:", sessionData);
//     } catch (err) {
//         console.error("❌ Failed to set up session:", err);
//         // Consider stopping here or showing an error to the user if session is critical
//         return; 
//     }

//     let csrfToken = null; // Declare csrfToken here, so it's accessible

//     // Step 1: Trigger CSRF token setting and wait for it
//     try {
//         const csrfResponse = await fetch('http://localhost:8080/api/auth/csrf-check', {
//             method: 'GET',
//             credentials: 'include'
//         });
//         // Assuming your /api/auth/csrf-check endpoint sets the XSRF-TOKEN cookie.
//         // If it returns the token in the body, you'd parse response.json() and get it from there.
//         console.log("✅ CSRF cookie fetch initiated/completed.");
        
//         // Give a tiny moment for browser to process Set-Cookie headers if fetch is too fast
//         // though typically not needed if the server is setting the cookie correctly with the response.
//         // await new Promise(resolve => setTimeout(resolve, 50)); 

//         csrfToken = getCsrfToken(); // Attempt to get the token from cookies after the fetch
//         console.log("🍪 document.cookie =", document.cookie); // ← check if XSRF-TOKEN is here
//         console.log("🔐 Initial CSRF Token after fetch:", csrfToken);

//         if (!csrfToken) {
//             console.error("❌ XSRF-TOKEN cookie not found after CSRF check. Check server configuration (HttpOnly, path, domain) or if the endpoint correctly sets it.");
//             alert("Error: Could not retrieve CSRF token. Please try again.");
//             return; // Stop execution if we can't get the token
//         }

//     } catch (err) {
//         console.error("❌ Failed to get CSRF cookie:", err);
//         alert("Error: Failed to connect to server for CSRF token. Please check your connection.");
//         return; // Stop execution if we can't get the token
//     }


//     // Step 2: Handle login - This part will only run once csrfToken is available
//     const loginForm = document.getElementById('loginForm');

//     if (loginForm) {
//         loginForm.addEventListener('submit', async function (e) { // Made this callback async too
//             e.preventDefault();

//             const email = document.getElementById('email').value.trim();
//             const password = document.getElementById('password').value.trim();
            
//             // Re-check csrfToken here, or ensure the one captured earlier is still valid.
//             // For simple cases, the 'csrfToken' from the outer scope should suffice.
//             // If the token can expire quickly, you might need a refresh mechanism.
//             if (!csrfToken) { // This should ideally not happen if the earlier check passed
//                 alert("❌ CSRF token is missing! Please refresh the page.");
//                 return;
//             }
//             console.log("🔐 CSRF Token used for login:", csrfToken);

//             try {
//                 const response = await fetch('http://localhost:8080/api/auth/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-XSRF-TOKEN': csrfToken // Use the acquired token
//                     },
//                     credentials: 'include',
//                     body: JSON.stringify({ email, password })
//                 });

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(errorText);
//                 }
//                 const data = await response.text(); // Or response.json() if your API returns JSON

//                 alert('✅ Login successful!');
//                 window.location.href = 'casefeed.html';
//             } catch (error) {
//                 alert('❌ Login failed: ' + error.message);
//                 console.error("Login fetch error:", error);
//             }
//         });
//     } else {
//         console.error("⚠️ loginForm not found in DOM.");
//     }
// });

// The getCsrfToken function is no longer needed as we'll fetch the token from an API endpoint.
// function getCsrfToken() {
//     const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
//     return match ? decodeURIComponent(match[2]) : null;
// }




// console.log("✅ Login JS loaded");

// document.addEventListener("DOMContentLoaded", async function () { // Make this callback async

//     let csrfTokenValue = null; // To store the actual CSRF token string
//     let csrfHeaderName = null; // To store the header name (e.g., 'X-XSRF-TOKEN')

//     // Step 0: Force session creation (optional, but good for consistent setup)
//     // This runs first to ensure a session is established before requesting a CSRF token.
//     try {
//         const sessionResponse = await fetch('http://localhost:8080/test-session', {
//             method: 'GET',
//             credentials: 'include' // Important for sending/receiving cookies
//         });
//         const sessionData = await sessionResponse.text();
//         console.log("✅ Session + cookie setup:", sessionData);
//     } catch (err) {
//         console.error("❌ Failed to set up session:", err);
//         alert("Error: Failed to connect to server for session setup. Please check server status.");
//         return; // Stop if session setup fails
//     }

//     // Step 1: Fetch CSRF token from the API endpoint.
//     // This assumes your Spring Boot /api/auth/csrf-check endpoint returns JSON
//     // with 'token' and 'headerName' fields.
//     try {
//         const csrfResponse = await fetch('http://localhost:8080/api/auth/csrf-check', {
//             method: 'GET',
//             credentials: 'include' // Important for associating with the session and getting the cookie
//         });

//         // Check if the HTTP response itself was successful
//         if (!csrfResponse.ok) {
//             throw new Error(`Failed to fetch CSRF token: ${csrfResponse.status} ${csrfResponse.statusText}`);
//         }

//         const csrfData = await csrfResponse.json(); // Parse the JSON response
//         csrfTokenValue = csrfData.token;
//         csrfHeaderName = csrfData.headerName; // Typically "X-XSRF-TOKEN"

//         console.log("✅ CSRF token received directly from endpoint:", csrfTokenValue);
//         console.log("✅ CSRF header name:", csrfHeaderName);
//         console.log("🍪 document.cookie =", document.cookie); // Note: HttpOnly tokens won't appear here

//         // Validate that we received the necessary token information
//         if (!csrfTokenValue || !csrfHeaderName) {
//             console.error("❌ CSRF token or header name missing from endpoint response. Check server's /api/auth/csrf-check response.");
//             alert("Error: Could not retrieve CSRF token from server. Please try again.");
//             return; // Stop if token data is incomplete
//         }

//     } catch (err) {
//         console.error("❌ Failed to get CSRF token from API:", err);
//         alert("Error: Could not connect to server for CSRF token. Please check your network and server.");
//         return; // Stop if CSRF token fetch fails
//     }

//     // Step 2: Handle login - This part will only execute if csrfTokenValue and csrfHeaderName are available
//     const loginForm = document.getElementById('loginForm');

//     if (loginForm) {
//         loginForm.addEventListener('submit', async function (e) { // Make this callback async too
//             e.preventDefault(); // Prevent default form submission

//             const email = document.getElementById('email').value.trim();
//             const password = document.getElementById('password').value.trim();
            
//             // Re-check token availability before submission, though it should be set by now
//             if (!csrfTokenValue || !csrfHeaderName) {
//                 alert("❌ CSRF token is missing! Please refresh the page and try again.");
//                 return;
//             }
//             console.log("🔐 CSRF Token used for login submission:", csrfTokenValue);

//             try {
//                 const headers = {
//                     'Content-Type': 'application/json',
//                 };
//                 // Dynamically set the CSRF header using the name received from the API
//                 headers[csrfHeaderName] = csrfTokenValue;

//                 const response = await fetch('http://localhost:8080/api/auth/login', {
//                     method: 'POST',
//                     headers: headers,
//                     credentials: 'include', // Ensure cookies (like JSESSIONID) are sent
//                     body: JSON.stringify({ email, password })
//                 });

//                 if (!response.ok) {
//                     // If response is not OK (e.g., 401 Unauthorized), read the error message from the body
//                     const errorText = await response.text(); 
//                     throw new Error(errorText); // Throw error to be caught below
//                 }
                
//                 // Assuming success returns a simple text message
//                 const data = await response.text(); 

//                 alert('✅ Login successful!');
//                 window.location.href = 'casefeed.html'; // Redirect on success
//             } catch (error) {
//                 alert('❌ Login failed: ' + error.message);
//                 console.error("Login fetch error:", error);
//             }
//         });
//     } else {
//         console.error("⚠️ loginForm not found in DOM.");
//     }
// });



console.log("✅ Login JS loaded");

document.addEventListener("DOMContentLoaded", async function () {
    let csrfTokenValue = null; // To store the actual CSRF token string
    let csrfHeaderName = null; // To store the header name (e.g., 'X-XSRF-TOKEN')

    // --- IMPORTANT: Removed the /test-session fetch call. ---
    // The /api/auth/csrf-check call should implicitly handle session creation/reuse.

    // Step 1: Fetch CSRF token from the API endpoint.
    // This assumes your Spring Boot /api/auth/csrf-check endpoint returns JSON
    // with 'token' and 'headerName' fields.
    try {
        const csrfResponse = await fetch('http://localhost:8080/api/auth/csrf-check', {
            method: 'GET',
            credentials: 'include' // Important for associating with the session and getting the cookie
        });

        // Check if the HTTP response itself was successful
        if (!csrfResponse.ok) {
            throw new Error(`Failed to fetch CSRF token: ${csrfResponse.status} ${csrfResponse.statusText}`);
        }

        const csrfData = await csrfResponse.json(); // Parse the JSON response
        csrfTokenValue = csrfData.token;
        csrfHeaderName = csrfData.headerName; // Typically "X-XSRF-TOKEN" or "X-CSRF-TOKEN"

        console.log("✅ CSRF token received directly from endpoint:", csrfTokenValue);
        console.log("✅ CSRF header name:", csrfHeaderName);
        console.log("🍪 document.cookie =", document.cookie); // Note: HttpOnly tokens won't appear here

        console.log("✅ Session likely established/reused with CSRF token retrieval."); // Added log for session indication

        // Validate that we received the necessary token information
        if (!csrfTokenValue || !csrfHeaderName) {
            console.error("❌ CSRF token or header name missing from endpoint response. Check server's /api/auth/csrf-check response.");
            // Using console.error instead of alert for non-critical user-facing messages in development
            return; // Stop if token data is incomplete
        }

    } catch (err) {
        console.error("❌ Failed to get CSRF token from API:", err);
        // Using console.error instead of alert for non-critical user-facing messages in development
        return; // Stop if CSRF token fetch fails
    }

    // Step 2: Handle login - This part will only execute if csrfTokenValue and csrfHeaderName are available
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) { // Make this callback async too
            e.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Re-check token availability before submission, though it should be set by now
            if (!csrfTokenValue || !csrfHeaderName) {
                console.error("❌ CSRF token is missing! Please refresh the page and try again.");
                return;
            }
            console.log("🔐 CSRF Token used for login submission:", csrfTokenValue);

            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                // Dynamically set the CSRF header using the name received from the API
                headers[csrfHeaderName] = csrfTokenValue;

                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: headers,
                    credentials: 'include', // Ensure cookies (like JSESSIONID) are sent
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    // If response is not OK (e.g., 401 Unauthorized), read the error message from the body
                    const errorText = await response.text(); 
                    throw new Error(errorText); // Throw error to be caught below
                }
                
                // Assuming success returns a simple text message
                const data = await response.text(); 

                console.log('✅ Login successful!');
                // Optionally store login flag in localStorage (UI logic only)
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = 'landingpage.html';
            } catch (error) {
                console.error('❌ Login failed: ' + error.message);
            }
        });
    } else {
        console.error("⚠️ loginForm not found in DOM.");
    }
});
