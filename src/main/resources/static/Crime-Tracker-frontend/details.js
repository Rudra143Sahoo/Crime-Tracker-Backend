
// ✅ 1. CSRF Token Extractor – place this at the top
function getCsrfToken() {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}


console.log("case-details.js loaded (or main script if shared)"); // Clarified log for debugging
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get("id");

  if (!caseId) {
    alert("No case ID provided in the URL.");
    return;
  }

  // fetch(`http://localhost:8080/api/cases/${caseId}`)
  // Fetch with credentials and CSRF token
  fetch(`http://localhost:8080/api/cases/${caseId}`, {
    method: 'GET',
    credentials: 'include', // 🔐 Send session cookie like JSESSIONID
    headers: {
      'X-XSRF-TOKEN': getCsrfToken() // 🔒 CSRF token from cookie
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Image loading
      document.getElementById("mainImage").src = "http://localhost:8080" + data.images[0];
      document.getElementById("image1").src = "http://localhost:8080" + (data.images[1] || data.images[0]);
      document.getElementById("image2").src = "http://localhost:8080" + (data.images[2] || data.images[0]);

      // YouTube video link
      // const videoLink = data.videoEvidence?.url || "https://www.youtube.com/results?search_query=crime+case";
      // document.getElementById("videoLink").href = videoLink;
      // ✅ Populate video evidence link if available
      if (data.videoEvidence && data.videoEvidence.url) {
        const link = document.getElementById("videoEvidenceLink");
        link.href = data.videoEvidence.url;
        link.textContent = data.videoEvidence.title || "Watch Video";
      } else {
        // Hide or disable the link if not present
        document.querySelector(".video-evidence-box").style.display = "none";
      }

      // Text fields
      document.getElementById("title").innerText = data.title || "N/A";
      document.getElementById("caseId").innerText = data.caseId || "N/A";
      document.getElementById("location").innerText = data.location || "N/A";
      document.getElementById("dateOfIncident").innerText = data.dateOfIncident || "N/A";
      document.getElementById("timeOfCrime").innerText = data.timeOfCrime || "N/A";
      document.getElementById("crimeMethod").innerText = data.crimeMethod || "N/A";
      document.getElementById("caseStatus").innerText = data.caseStatus || "N/A";
      document.getElementById("investigationDetails").innerText = data.investigationDetails || "N/A";
      document.getElementById("chargesFiled").innerText = data.chargesFiled || "N/A";
      document.getElementById("policeStation").innerText = data.policeStation || "N/A";
      document.getElementById("firNumber").innerText = data.firNumber || "N/A";
      document.getElementById("courtProceedings").innerText = data.courtProceedings || "N/A";
      document.getElementById("investigatingOfficer").innerText = data.investigatingOfficer || "N/A";
      document.getElementById("caseDetails").innerText = data.caseDetails || "N/A";
      document.getElementById("caseType").innerText = data.caseType || "N/A";

      // Lists
      const renderList = (elementId, list) => {
        const ul = document.getElementById(elementId);
        ul.innerHTML = "";
        if (list?.length > 0) {
          list.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            ul.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.innerText = "No data available.";
          ul.appendChild(li);
        }
      };

      renderList("suspectList", data.suspects);
      renderList("victimList", data.victims);
      renderList("securityLapses", data.securityLapses);
      renderList("mediaCoverage", data.mediaCoverage);
    })
    .catch(err => {
      console.error("Failed to fetch case details:", err);
      alert("Oops! Could not load case details.");
    });
});
