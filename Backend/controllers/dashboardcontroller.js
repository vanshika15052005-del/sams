const db = require("../db");

// ----------------- GET ALL ADMISSIONS -----------------
async function getAllAdmissions(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM admissions");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// ----------------- UPDATE ADMISSION -----------------
async function updateAdmission(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const [result] = await db.query(
            "UPDATE admissions SET status = ? WHERE id = ?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: `Status updated to ${status}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// ----------------- DELETE ADMISSION -----------------
async function deleteAdmission(req, res) {
    try {
        const id = req.params.id;

        const [result] = await db.query(
            "DELETE FROM admissions WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// ✅ IMPORTANT FIX (MATCH ROUTES)
module.exports = {
    getAllAdmissions,
    updateAdmission,
    deleteAdmission
};