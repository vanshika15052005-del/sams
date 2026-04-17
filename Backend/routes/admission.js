const express = require("express");
const router = express.Router();
const multer = require("multer");

console.log("✅ admission routes loaded");

const {
    addAdmission,
    checkAdmission,
    downloadSlip
} = require("../controllers/admissionController");

const upload = multer({ dest: "uploads/" });

/* ================= ADMISSION ================= */

// Submit form
router.post("/", upload.single("document"), addAdmission);

// Check status
router.get("/status/:email", checkAdmission);

// ✅ DOWNLOAD SLIP ROUTE (IMPORTANT)
router.get("/download-slip/:email", downloadSlip);


/* ================= EXTRA APIs ================= */

// Announcements
router.get("/announcements", (req, res) => {
    res.json([
        { text: "Admissions Open 2026 🎓" },
        { text: "Apply before last date ⏳" }
    ]);
});

// Reviews
router.get("/reviews", (req, res) => {
    res.json([
        { name: "Rahul", message: "Great college!" },
        { name: "Simran", message: "Nice environment 👍" }
    ]);
});

module.exports = router;