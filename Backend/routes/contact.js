const express = require("express");
const router = express.Router();

// ✅ FIX (capital C)
const { submitContact } = require("../controllers/contactController");

// POST contact form
router.post("/", submitContact);

module.exports = router;