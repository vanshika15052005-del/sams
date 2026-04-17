const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const multer = require("multer");

const { getStudentData } = require("../controllers/student-dashboardController");


// 📁 MULTER CONFIG
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// ✅ UPLOAD DOCUMENT (FIXED)
router.post("/upload", upload.single("document"), async (req, res) => {
    const email = req.body.email;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileName = req.file.filename;

        await db.query(
            "UPDATE admissions SET document=? WHERE email=?",
            [fileName, email]
        );

        res.json({ message: "✅ File uploaded successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ DOWNLOAD
router.get("/download/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const [result] = await db.query(
            "SELECT document FROM admissions WHERE email=?",
            [email]
        );

        if (result.length === 0 || !result[0].document) {
            return res.status(404).send("No file found");
        }

        const filePath = path.join(__dirname, "../uploads", result[0].document);

        res.download(filePath);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});


// ✅ GET DATA
router.get("/:email", getStudentData);

module.exports = router;