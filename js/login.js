document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // 🔴 Check response first
        if (!res.ok) {
            alert("❌ Invalid email or password");
            return;
        }

        const data = await res.json();
        console.log("🔍 Login Response:", data);

        // ✅ FIX: check email instead of id
        if (data.email) {
            alert("Login Success ✅");

            // store email
            localStorage.setItem("email", data.email);

            // role-based redirect
            if (data.role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "student-dashboard.html";
            }

        } else {
            alert("Login Failed ❌");
        }

    } catch (err) {
        console.error("❌ Login error:", err);
        alert("Server error!");
    }
});