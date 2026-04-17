// contact.js
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactform"); // match HTML id
    const msg = document.getElementById("msg"); // <p> for messages

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent page reload

        // Get input values
        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        // Basic frontend validation
        if (!data.name || !data.email || !data.message) {
            msg.innerText = "Please fill in all required fields.";
            msg.style.color = "red";
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/contact", { // make sure port and route match backend
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                msg.innerText = result.message; // show success message
                msg.style.color = "green";
                contactForm.reset(); // clear the form
            } else {
                msg.innerText = result.error || "Something went wrong!";
                msg.style.color = "red";
            }

        } catch (err) {
            console.error("Error submitting contact form:", err);
            msg.innerText = "Server error ❌";
            msg.style.color = "red";
        }
    });
});