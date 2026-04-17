const db = require("../db");

// REGISTER
const register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        await db.query(
            "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
            [full_name, email, password]
        );

        res.send("Registered Successfully ✅");
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email=? AND password=?",
            [email, password]
        );

        console.log("ROWS:", rows); // 🔍 debug

        if (rows.length > 0) {
            const user = rows[0];

            res.json({
                email: user.email,
                name: user.full_name || user.name, // handles both cases
                role: user.role ? user.role : "student" // safe default
            });

        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (err) {
        console.error("🔥 LOGIN ERROR:", err); // 🔥 VERY IMPORTANT
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { register, login };