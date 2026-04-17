document.getElementById("admissionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const res = await fetch("http://localhost:5000/api/admission", {
            method: "POST",
            body: formData
        });

        // ✅ Handle non-JSON responses safely
        let data;
        try {
            data = await res.json();
        } catch {
            const text = await res.text();
            console.error("❌ Non-JSON response:", text);
            alert("Invalid server response ❌");
            return;
        }

        // ✅ Debug log
        console.log("📥 RESPONSE:", data);

        if (res.ok) {
            alert(data.message || "Form submitted successfully ✅");
            form.reset();
        } else {
            alert(data.message || "Submission failed ❌");
        }

    } catch (err) {
        console.error("🔥 FETCH ERROR:", err);
        alert("Server not responding ❌");
    }
});