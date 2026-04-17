// main.js

// Welcome alert
// ✅ GLOBAL DATA FOR SLIP
let admissionData = null;

document.addEventListener("DOMContentLoaded", () => {

    console.log("SAMS Project Loaded Successfully");

    /* ================= NAV ACTIVE ================= */
    let links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function() {
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /* ================= MOBILE MENU ================= */
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    /* ================= DROPDOWN FIX ================= */
    const dropdown = document.querySelector(".dropdown");

    if (dropdown) {
        const dropbtn = dropdown.querySelector(".dropbtn");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropbtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });

        dropdownContent.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("active");
            }
        });
    }

    /* ================= CLOSE MENU AFTER CLICK ================= */
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    /* ================= ANNOUNCEMENTS ================= */
    fetch("http://localhost:5000/api/admission/announcements")
    .then(res => res.ok ? res.json() : [])
    .then(data => {
        const list = document.getElementById("announcementList");
        if (!list) return;

        data.forEach(a => {
            const li = document.createElement("li");
            li.textContent = a.text;
            list.appendChild(li);
        });
    })
    .catch(err => console.error("Announcement error:", err));

    /* ================= REVIEWS ================= */
    fetch("http://localhost:5000/api/admission/reviews")
    .then(res => res.ok ? res.json() : [])
    .then(data => {
        const reviews = document.getElementById("reviews");
        if (!reviews) return;

        data.forEach(r => {
            const div = document.createElement("div");
            div.innerHTML = `<b>${r.name}</b>: ${r.message}`;
            reviews.appendChild(div);
        });
    })
    .catch(err => console.error("Review error:", err));

    /* ================= CONTACT FORM ================= */
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            try {
                const res = await fetch("http://localhost:5000/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                alert(result.message);
            } catch (err) {
                console.error(err);
                alert("Server error ❌");
            }
        });
    }

});


/* ================= DOWNLOAD SLIP FUNCTION ================= */
function downloadSlip() {

    if (!admissionData) {
        alert("No data available ❌");
        return;
    }

    const slipWindow = window.open("", "_blank");

    slipWindow.document.write(`
        <html>
        <head>
            <title>Admission Slip</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 20px;
                    text-align: center;
                }
                .slip {
                    border: 2px solid #333;
                    padding: 20px;
                    max-width: 400px;
                    margin: auto;
                    border-radius: 10px;
                }
                h2 {
                    color: #0d47a1;
                }
                p {
                    margin: 10px 0;
                }
                button {
                    margin-top: 15px;
                    padding: 8px 15px;
                    background: #0d47a1;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>

            <div class="slip">
                <h2>🎓 SAMS Admission Slip</h2>

                <p><strong>Name:</strong> ${admissionData.full_name}</p>
                <p><strong>Email:</strong> ${admissionData.email || "N/A"}</p>
                <p><strong>Course:</strong> ${admissionData.course}</p>
                <p><strong>Status:</strong> ${admissionData.status}</p>

                <button onclick="window.print()">🖨 Print / Save as PDF</button>
            </div>

        </body>
        </html>
    `);

    slipWindow.document.close();
}