// document.addEventListener('DOMContentLoaded', () => {
//     // Authentication elements (from previous iterations)
//     const usernameInput = document.getElementById('username');
//     const passwordInput = document.getElementById('password');
//     // const loginBtn = document.getElementById('login-btn');
//     // const registerBtn = document.getElementById('register-btn'); // Assuming you have a register button
//     // const logoutBtn = document.getElementById('logout-btn');
    
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//   const loginBtn = document.querySelector(".login-btn");
//   const logoutBtn = document.querySelector(".logout-btn");

//   if (isLoggedIn === "true") {
//     // User is logged in
//     if (loginBtn) loginBtn.style.display = "none";
//     if (logoutBtn) logoutBtn.style.display = "inline-block";
//   } else {
//     // Not logged in
//     if (loginBtn) loginBtn.style.display = "inline-block";
//     if (logoutBtn) logoutBtn.style.display = "none";
//   }

//   // Logout handler
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", function () {
//       localStorage.removeItem("isLoggedIn");
//       window.location.href = "login.html";
//     });
//   }
//     const authStatusDiv = document.getElementById('auth-status');

//     // Post creation elements (from previous iterations)
//     const postDescriptionInput = document.querySelector('.post-input'); // Renamed for clarity
//     const mediaFileInput = document.getElementById('media-file');
//     const submitPostBtn = document.getElementById('submit-post-btn');

//     // Newsfeed container
//     const newsfeed = document.getElementById('newsfeed'); // Assuming this ID for the feed container

//     // Base URL for your Spring Boot backend
//     const BASE_URL = 'http://localhost:8080';
//     const API_AUTH_URL = `${BASE_URL}/api/auth`;
//     const API_USERFEED_URL = `${BASE_URL}/api/userfeed`;
//     const UPLOADS_BASE_URL = `${BASE_URL}`; // Base URL to serve uploaded files from static/uploads

//     // --- Authentication Functions (from previous discussions) ---
//     function updateAuthStatus(username = null) {
//         if (username) {
//             authStatusDiv.textContent = `Logged in as: ${username}`;
//             loginBtn.style.display = 'none';
//             registerBtn.style.display = 'none';
//             logoutBtn.style.display = 'inline-block';
//             postDescriptionInput.disabled = false;
//             mediaFileInput.disabled = false;
//             submitPostBtn.disabled = false;
//         } else {
//             authStatusDiv.textContent = 'Not logged in.';
//             loginBtn.style.display = 'inline-block';
//             registerBtn.style.display = 'inline-block';
//             logoutBtn.style.display = 'none';
//             postDescriptionInput.disabled = true;
//             mediaFileInput.disabled = true;
//             submitPostBtn.disabled = true;
//         }
//     }

//     async function checkAuthStatus() {
//         try {
//             const response = await fetch(`${API_AUTH_URL}/checkAuth`, { credentials: 'include' });
//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.status === 'authenticated') {
//                     updateAuthStatus(data.username);
//                     fetchPosts();
//                 } else {
//                     updateAuthStatus();
//                 }
//             } else {
//                 updateAuthStatus();
//             }
//         } catch (error) {
//             console.error('Error checking authentication status:', error);
//             updateAuthStatus();
//         }
//     }

//     loginBtn.addEventListener('click', async () => {
//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();
//         if (!username || !password) { alert('Please enter both username and password.'); return; }
//         try {
//             const response = await fetch(`${API_AUTH_URL}/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ username, password })
//             });
//             if (response.ok) {
//                 alert('Login successful!');
//                 updateAuthStatus(username);
//                 fetchPosts();
//                 usernameInput.value = ''; passwordInput.value = '';
//             } else {
//                 const errorText = await response.text();
//                 alert(`Login failed: ${errorText}`);
//             }
//         } catch (error) { console.error('Error during login:', error); alert('An error occurred during login.'); }
//     });

//     // Assuming you have a register endpoint (e.g., /api/auth/register)
//     registerBtn.addEventListener('click', async () => {
//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();
//         if (!username || !password) { alert('Please enter both username and password.'); return; }
//         try {
//             const response = await fetch(`${API_AUTH_URL}/register`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ username, password })
//             });
//             if (response.ok) { alert('Registration successful! You can now log in.'); usernameInput.value = ''; passwordInput.value = ''; }
//             else { const errorText = await response.text(); alert(`Registration failed: ${errorText}`); }
//         } catch (error) { console.error('Error during registration:', error); alert('An error occurred during registration.'); }
//     });


//     logoutBtn.addEventListener('click', async () => {
//         try {
//             const response = await fetch(`${API_AUTH_URL}/logout`, { method: 'POST', credentials: 'include' });
//             if (response.ok) { alert('Logged out successfully!'); updateAuthStatus(); newsfeed.innerHTML = ''; }
//             else { alert('Logout failed.'); }
//         } catch (error) { console.error('Error during logout:', error); alert('An error occurred during logout.'); }
//     });

//     // --- Post Feed Functions (Adapted to your UserFeedPost model) ---

//     function formatTimeAgo(timestamp) {
//         const now = new Date();
//         const postDate = new Date(timestamp);
//         const seconds = Math.floor((now - postDate) / 1000);

//         let interval = seconds / 31536000;
//         if (interval > 1) { return Math.floor(interval) + " years ago"; }
//         interval = seconds / 2592000;
//         if (interval > 1) { return Math.floor(interval) + " months ago"; }
//         interval = seconds / 86400;
//         if (interval > 1) { return Math.floor(interval) + " days ago"; }
//         interval = seconds / 3600;
//         if (interval > 1) { return Math.floor(interval) + " hours ago"; }
//         interval = seconds / 60;
//         if (interval > 1) { return Math.floor(interval) + " minutes ago"; }
//         return Math.floor(seconds) + " seconds ago";
//     }

//     function createPostElement(post) {
//         const postElement = document.createElement('div');
//         postElement.className = 'feed-post'; // Assuming your CSS uses this class

//         let mediaHtml = '';
//         if (post.mediaUrl) {
//             const fullMediaUrl = `${UPLOADS_BASE_URL}${post.mediaUrl}`;
//             if (post.mediaType === 'video') {
//                 mediaHtml = `<video controls class="post-img"><source src="${fullMediaUrl}" type="video/mp4"></video>`;
//             } else { // Assume image
//                 mediaHtml = `<img src="${fullMediaUrl}" class="post-img" alt="Post Image">`;
//             }
//         }

//         // Use post.authorAvatarUrl and post.username from backend
//         // Use post.description and post.timestamp from backend
//         // Use post.commentsCount and post.likesCount from backend
//         postElement.innerHTML = `
//             <div class="post-header">
//                 <img src="${post.authorAvatarUrl || 'https://placehold.co/48x48/CCCCCC/FFFFFF?text=U'}" class="post-avatar">
//                 <div>
//                     <p class="post-author">${post.username}</p>
//                     <p class="post-time">${formatTimeAgo(post.timestamp)}</p>
//                 </div>
//             </div>
//             <h3 class="post-heading">Incident Update: ${post.description.substring(0, 50)}${post.description.length > 50 ? '...' : ''}</h3>
//             <p class="post-text">${post.description}</p>
//             ${mediaHtml}
//             <div class="post-footer">
//                 <button class="like-btn cursor-pointer" data-id="${post.id}">
//                     <i class="fas fa-thumbs-up"></i> Like (<span class="like-count">${post.likesCount || 0}</span>)
//                 </button>
//                 <button class="comment-toggle-btn cursor-pointer" data-id="${post.id}">
//                     <i class="fas fa-comment"></i> Comments (<span class="comment-count">${post.commentsCount || 0}</span>)
//                 </button>
//             </div>
//             <div class="comments-section hidden" id="comments-${post.id}">
//                 <div class="comments-list mb-3"></div>
//                 <input type="text" class="comment-input w-full p-2 border border-gray-300 rounded mb-2" placeholder="Write a comment..."/>
//                 <button class="add-comment-btn bg-blue-600 text-white px-3 py-1 rounded" data-post-id="${post.id}">Add Comment</button>
//             </div>
//         `;

//         // Event Listeners for Like and Comment
//         postElement.querySelector('.like-btn').addEventListener('click', () => handleLike(post.id, postElement));

//         postElement.querySelector('.comment-toggle-btn').addEventListener('click', () => {
//             const commentsSection = postElement.querySelector(`#comments-${post.id}`);
//             commentsSection.classList.toggle('hidden');
//             if (!commentsSection.classList.contains('hidden')) {
//                 loadComments(post.id, commentsSection.querySelector('.comments-list'));
//             }
//         });

//         // Add comment event listener for the button (not input change)
//         postElement.querySelector('.add-comment-btn').addEventListener('click', async (event) => {
//             const postId = event.target.dataset.postId;
//             const input = postElement.querySelector('.comment-input');
//             const text = input.value.trim();

//             if (!text) { alert('Please enter a comment.'); return; }

//             try {
//                 const response = await fetch(`${BASE_URL}/api/comments`, { // Assuming a dedicated comments endpoint
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                     body: JSON.stringify({ postId: postId, text: text }) // Send postId and text
//                 });

//                 if (response.ok) {
//                     input.value = ''; // Clear input
//                     loadComments(postId, postElement.querySelector('.comments-list')); // Reload comments for this post
//                     // You might need to refetch all posts or update the count if your backend doesn't automatically increment
//                     // For now, let's assume `fetchPosts()` is enough for simplicity if counts are updated server-side.
//                     fetchPosts(); // Reload all posts to ensure counts are accurate (less efficient but simple)
//                 } else {
//                     const errorText = await response.text();
//                     alert(`Failed to add comment: ${errorText}`);
//                 }
//             } catch (error) {
//                 console.error('Error adding comment:', error);
//                 alert('An error occurred while adding comment.');
//             }
//         });

//         return postElement;
//     }

//     async function fetchPosts() {
//         try {
//             // Use the correct backend endpoint
//             const response = await fetch(API_USERFEED_URL, {
//                 method: 'GET',
//                 credentials: 'include' // Needed for session cookies
//             });

//             if (!response.ok) {
//                 if (response.status === 401 || response.status === 403) {
//                     console.warn("Not authenticated to fetch posts. Please log in.");
//                     newsfeed.innerHTML = '<p style="text-align: center; color: #666;">Please log in to view the news feed.</p>';
//                     return;
//                 }
//                 throw new Error(`Failed to fetch posts: ${response.statusText}`);
//             }
//             const posts = await response.json();
//             newsfeed.innerHTML = ''; // Clear existing posts
//             posts.forEach(post => {
//                 const postEl = createPostElement(post);
//                 newsfeed.appendChild(postEl);
//             });
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//             alert('Failed to load posts. Please check backend and network.');
//         }
//     }

//     async function handleLike(postId, postDiv) {
//         try {
//             // Assuming your backend has a dedicated like endpoint like /api/likes
//             // And it expects postId and potentially userId (which backend gets from session)
//             const response = await fetch(`${BASE_URL}/api/likes`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ postId: postId })
//             });

//             if (response.ok) {
//                 // To reflect the updated like count, you should ideally get it from the response
//                 // or refetch the posts. For simplicity, just refetch all posts for now.
//                 fetchPosts(); // This will refresh all posts and their counts
//             } else {
//                 const errorText = await response.text();
//                 alert(`Failed to like post: ${errorText}`);
//             }
//         } catch (error) {
//             console.error('Error during like:', error);
//             alert('An error occurred while liking the post.');
//         }
//     }

//     async function loadComments(postId, commentsListEl) {
//         try {
//             // Assuming comments are fetched from /api/comments?postId=...
//             const response = await fetch(`${BASE_URL}/api/comments?postId=${postId}`, { credentials: 'include' });
//             if (!response.ok) throw new Error('Failed to fetch comments');
//             const comments = await response.json();
//             commentsListEl.innerHTML = comments.map(comment => `
//                 <p><strong>${comment.username}:</strong> ${comment.text} <span class="text-xs text-gray-500">(${formatTimeAgo(comment.commentedAt)})</span></p>
//             `).join('');
//         } catch (error) {
//             console.error('Error loading comments:', error);
//             commentsListEl.innerHTML = `<p class="text-red-500">Error loading comments.</p>`;
//         }
//     }

//     // New post creation - Modified to send FormData
//     submitPostBtn.addEventListener('click', async () => {
//         const description = postDescriptionInput.value.trim();
//         const mediaFile = mediaFileInput.files[0];
//         // You might add a location input if needed

//         if (!description && !mediaFile) {
//             alert('Please enter some text or select media to share an incident.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('description', description);
//         // formData.append('location', 'Unknown'); // Add if you have an input for location
//         if (mediaFile) {
//             formData.append('mediaFile', mediaFile);
//         }

//         try {
//             const response = await fetch(API_USERFEED_URL, {
//                 method: 'POST',
//                 credentials: 'include',
//                 body: formData, // Send FormData for multipart content
//             });

//             if (response.ok) {
//                 alert('Incident shared successfully!');
//                 postDescriptionInput.value = '';
//                 mediaFileInput.value = '';
//                 fetchPosts(); // Reload posts to show the new one
//             } else {
//                 const errorText = await response.text();
//                 alert(`Failed to share incident: ${errorText}`);
//             }
//         } catch (error) {
//             console.error('Error sharing incident:', error);
//             alert(`An error occurred while sharing: ${error.message}`);
//         }
//     });

//     // Initial load
//     checkAuthStatus(); // Check auth status and then fetch posts if logged in
// });
console.log("✅ landingpage.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    async function loadFeed() {
        try {
            const response = await fetch("http://localhost:8080/api/userfeed/all");
            const posts = await response.json();

            const feed = document.getElementById("newsfeed");
            feed.innerHTML = ""; // Clear previous content

            posts.reverse().forEach(post => {
                const div = document.createElement("div");
                div.className = "feed-post";

                div.innerHTML = `
                    <div class="post-header">
                        <img src="https://placehold.co/48x48/6B46C1/FFFFFF?text=U" class="post-avatar">
                        <div>
                            <p class="post-author">${post.submittedBy}</p>
                            <p class="post-time">${new Date(post.submittedAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <h3 class="post-heading">${post.caseTitle}</h3>
                    <p class="post-text">${post.caseDescription}</p>
                    
                    ${post.imageUrl ? `<img src="http://localhost:8080/${post.imageUrl.replace(/\\/g, '/')}" class="post-img">` : ""}

                    <div class="post-footer">
                        <span>0 Comments</span>
                        <span>0 Shares</span>
                    </div>
                `;
                feed.prepend(div);
            });

        } catch (error) {
            console.error("❌ Error loading feed:", error);
        }
    }

    loadFeed(); // 👈 Call it on page load

    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Toggle login/logout button visibility
    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-flex";
    } else {
        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    // Logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                const csrfToken = getCsrfTokenFromCookie();

                await fetch("http://localhost:8080/api/auth/logout", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "X-XSRF-TOKEN": csrfToken
                    }
                });

                console.log("✅ Backend logout successful");
            } catch (error) {
                console.error("⚠️ Logout failed:", error);
            } finally {
                localStorage.clear();
                sessionStorage.clear();
                // OPTIONAL: clear all cookies manually
                document.cookie.split(";").forEach(c => {
                document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
});

                // localStorage.removeItem("isLoggedIn");
                // window.location.reload();
                window.location.href = "landingpage.html"; // 👈 Redirect instead of reload
            }
        });
    }
});

// Helper to get CSRF token from cookie
function getCsrfTokenFromCookie() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}
