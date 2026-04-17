document.addEventListener("DOMContentLoaded", () => {
    console.log("status.js loaded");

    const form = document.getElementById("statusForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        if (!email) {
            resultDiv.innerHTML = "⚠️ Please enter email";
            return;
        }

        resultDiv.innerHTML = "⏳ Checking status...";

        try {
            const res = await fetch(`http://localhost:5000/api/admission/status/${encodeURIComponent(email)}`);

            if (!res.ok) {
                resultDiv.innerHTML = "❌ Server error or record not found";
                return;
            }

            const data = await res.json();
            const student = data.data || data;

            if (!student) {
                resultDiv.innerHTML = "❌ No record found";
                return;
            }

            // 🎨 Status color
            let statusColor = "orange";
            if (student.status === "Approved") statusColor = "green";
            else if (student.status === "Rejected") statusColor = "red";

            // 🎯 Download button (only if Approved)
            let downloadBtn = "";
            if (student.status === "Approved") {
                downloadBtn = `
                    <button onclick="downloadSlip('${student.email}')"
                        style="margin-top:10px; padding:8px 15px; border:none; border-radius:6px; background:#2563eb; color:white; cursor:pointer;">
                        📄 Download Slip
                    </button>
                `;
            }

            resultDiv.innerHTML = `
                <div style="margin-top:10px; padding:15px; border:1px solid #ddd; border-radius:10px; background:#fff;">
                    <p><strong>👤 Name:</strong> ${student.full_name || "N/A"}</p>
                    <p><strong>📧 Email:</strong> ${student.email || "N/A"}</p>
                    <p><strong>🎓 Course:</strong> ${student.course || "N/A"}</p>
                    <p><strong>📍 Status:</strong> 
                        <span style="color:${statusColor}; font-weight:bold;">
                            ${student.status || "Pending"}
                        </span>
                    </p>

                    ${downloadBtn}
                </div>
            `;

        } catch (err) {
            console.error(err);
            resultDiv.innerHTML = "⚠️ Server not responding";
        }
    });
});


// 📄 Download Function
function downloadSlip(email) {
    // You can connect backend PDF route here
    window.open(`http://localhost:5000/api/admission/download-slip/${email}`, "_blank");
}