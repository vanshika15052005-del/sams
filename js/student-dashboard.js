const API = "http://localhost:5000/api/student-dashboard"; // ✅ FIXED

const studentEmail = localStorage.getItem("email");

// LOAD DATA
async function loadStudent() {
    if (!studentEmail) {
        alert("❌ Please login again");
        window.location.href = "login.html";
        return;
    }

    try {
        console.log("📧 Email:", studentEmail);

        const res = await fetch(`${API}/${studentEmail}`);
        const data = await res.json();

        console.log("📦 Data:", data);

        document.getElementById("name").innerText = data.full_name || "N/A";
        document.getElementById("email").innerText = data.email || "N/A";
        document.getElementById("course").innerText = data.course || "N/A";

        let status = (data.status || "pending").toLowerCase();
        const statusBox = document.getElementById("status");

        statusBox.innerText = status.toUpperCase();
        statusBox.className = "status " + status;

    } catch (err) {
        console.error(err);
        alert("❌ Server error");
    }
}

// UI
function showProfile() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("documentSection").style.display = "none";
}

function showDocuments() {
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("documentSection").style.display = "block";
}

// UPLOAD
function uploadDoc() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = async () => {
        const file = input.files[0];

        const formData = new FormData();
        formData.append("document", file);
        formData.append("email", studentEmail);

        try {
            const res = await fetch(`${API}/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            alert("✅ Uploaded successfully");
        } catch {
            alert("❌ Upload failed");
        }
    };

    input.click();
}

// DOWNLOAD
function downloadSlip() {
    window.open(`${API}/download/${studentEmail}`);
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

loadStudent();