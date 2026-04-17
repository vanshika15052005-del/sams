const db = require("../db");

const getStudentData = async (req, res) => {
    const email = req.params.email;

    try {
        const [result] = await db.query(
            "SELECT full_name, email, course, status FROM admissions WHERE email=?",
            [email]
        );

        if (result.length === 0) {
            return res.json({});
        }

        res.json(result[0]);

    } catch (err) {
        console.log("🔥 ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getStudentData };