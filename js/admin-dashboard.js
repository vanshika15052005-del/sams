const API = "http://localhost:5000/api/admin-dashboard"; // backend route
let students = [];

// ----------------- LOAD DATA -----------------
async function loadData() {
    try {
        console.log("Admin Dashboard Loaded ✅");
        const res = await fetch(API);
        students = await res.json();
        renderTable(students);
    } catch (err) {
        console.error("Load Error:", err);
        alert("Failed to load data ❌");
    }
}

// ----------------- RENDER TABLE -----------------
function renderTable(data) {
    let approved = 0, rejected = 0, pending = 0;
    let html = "";

    data.forEach(d => {
        const id = d.id; // keep as is
        if (!id) return; // skip invalid rows

        const status = (d.status || "Pending").toLowerCase();

        if (status === "approved") approved++;
        else if (status === "rejected") rejected++;
        else pending++;

        html += `
        <tr>
            <td>${d.full_name || "N/A"}</td>
            <td>${d.email || "N/A"}</td>
            <td>${d.course || "N/A"}</td>
            <td><span class="status ${status}">${status.toUpperCase()}</span></td>
            <td>
                <button class="btn approve" onclick="updateStatus('${id}', 'Approved')">✔</button>
                <button class="btn reject" onclick="updateStatus('${id}', 'Rejected')">✖</button>
                <button class="btn delete" onclick="deleteStudent('${id}')">🗑</button>
            </td>
        </tr>`;
    });

    document.getElementById("tableData").innerHTML = html;

    document.getElementById("total").innerText = data.length;
    document.getElementById("approved").innerText = approved;
    document.getElementById("rejected").innerText = rejected;
    document.getElementById("pending").innerText = pending;
}

// ----------------- UPDATE STATUS -----------------
async function updateStatus(id, status) {
    id = Number(id); // convert string -> number
    if (!id) return alert("Invalid student ID ❌");

    try {
        const res = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        if (res.ok) {
            alert(`${status} Successfully ✅`);
            loadData();
        } else {
            console.error("Update Error:", data);
            alert("Error: " + (data.message || "Update failed"));
        }
    } catch (err) {
        console.error("Update Error:", err);
        alert("Server error ❌");
    }
}

// ----------------- DELETE STUDENT -----------------
async function deleteStudent(id) {
    id = Number(id);
    if (!id) return alert("Invalid student ID ❌");
    if (!confirm("Delete this student?")) return;

    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (res.ok) {
            alert("Deleted Successfully ✅");
            loadData();
        } else {
            console.error("Delete Error:", data);
            alert("Error: " + (data.message || "Delete failed"));
        }
    } catch (err) {
        console.error("Delete Error:", err);
        alert("Server error ❌");
    }
}

// ----------------- SEARCH -----------------
function searchStudent(query) {
    const filtered = students.filter(s =>
        (s.full_name || "").toLowerCase().includes(query.toLowerCase()) ||
        (s.email || "").toLowerCase().includes(query.toLowerCase())
    );
    renderTable(filtered);
}

// ----------------- FILTER BY STATUS -----------------
function filterStatus(status) {
    if (status === "All") return renderTable(students);

    const filtered = students.filter(s =>
        (s.status || "Pending").toLowerCase() === status.toLowerCase()
    );
    renderTable(filtered);
}

// ----------------- LOGOUT -----------------
function logout() {
    localStorage.removeItem("admin");
    window.location.href = "index.html";
}

// ----------------- INIT -----------------
loadData();