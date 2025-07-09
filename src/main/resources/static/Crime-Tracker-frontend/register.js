// console.log("JS loaded"); // Add this line
// document.getElementById('registerForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const username = document.getElementById('username').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
   

//   fetch('http://localhost:8080/api/auth/register', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username , email , password })
//   })
//   .then(response => {
//     if (!response.ok) {
//       return response.text().then(text => { throw new Error(text); });
//     }
//     return response.text();
//   })
//   .then(data => {
//     alert('✅ Registered successfully!');
//     window.location.href = 'login.html';
//   })
//   .catch(error => {
//     alert('❌ Registration failed: ' + error.message);
//   });
// });
console.log("JS loaded"); // Add this line

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Step 1: Fetch the CSRF token from the backend
        //const csrfResponse = await fetch('http://localhost:8080/api/auth/csrf-check', {
			const csrfResponse = await fetch('/api/auth/csrf-check', {
            method: 'GET',
            credentials: 'include' // <--- THIS IS THE CRITICAL ADDITION
        });

        if (!csrfResponse.ok) {
            const errorText = await csrfResponse.text();
            throw new Error('Failed to fetch CSRF token: ' + errorText);
        }
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.token;
        const csrfHeaderName = csrfData.headerName; // This will be "X-XSRF-TOKEN" by default

        console.log("CSRF Token obtained:", csrfToken);
        console.log("CSRF Header Name:", csrfHeaderName);

        // Step 2: Send the registration request with the CSRF token in the header
       // const registerResponse = await fetch('http://localhost:8080/api/auth/register', {
		const registerResponse = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Dynamically set the CSRF header name, which is typically "X-XSRF-TOKEN"
                [csrfHeaderName]: csrfToken
            },
            body: JSON.stringify({ username, email, password }),
            credentials: 'include' // IMPORTANT: This ensures cookies (including XSRF-TOKEN cookie and JSESSIONID) are sent
        });

        if (!registerResponse.ok) {
            const errorText = await registerResponse.text();
            throw new Error(errorText); // The backend provides a descriptive error in the body
        }

        const data = await registerResponse.text(); // Assuming backend returns plain text "User registered successfully"
        alert('✅ Registered successfully! ' + data);
        window.location.href = 'login.html';

    } catch (error) {
        alert('❌ Registration failed: ' + error.message);
        console.error('Registration error:', error);
    }
});