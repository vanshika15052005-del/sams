const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// ✅ FIX: auto-create uploads folder
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// ✅ ✅ ADD CSP FIX HERE (VERY IMPORTANT)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        `
        default-src 'self';
        connect-src 'self' http://localhost:5000 ws://localhost:*;
        img-src 'self' data: http://localhost:5000/uploads;
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        font-src 'self' data:;
        `
    );
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use("/uploads", express.static("uploads"));

// Debug
app.use((req, res, next) => {
    console.log(`📢 ${req.method} ${req.url}`);
    next();
});

// Routes
const authRoutes = require("./routes/auth");
const admissionRoutes = require("./routes/admission");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");
const studentRoutes = require("./routes/student-dashboard");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin-dashboard", dashboardRoutes);
app.use("/api/student-dashboard", studentRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});