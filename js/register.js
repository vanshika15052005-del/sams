document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    // 🔴 empty check
    if (!full_name || !email || !password || !confirm_password) {
        alert("All fields are required ❌");
        return;
    }

    // 🔴 password match check
    if (password !== confirm_password) {
        alert("Passwords do not match ❌");
        return;
    }

    const data = {
        full_name,
        email,
        password
    };

    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });

    const msg = await res.text();
    alert(msg);

    // redirect
    window.location.href = "login.html";
});