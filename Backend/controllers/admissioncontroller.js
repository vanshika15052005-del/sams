const admissionModel = require("../models/admissionModel");

// ✅ ADD ADMISSION
const addAdmission = async (req, res) => {
    try {
        console.log("📩 BODY:", req.body);
        console.log("📂 FILE:", req.file);

        const {
            full_name,
            father_name,
            mother_name,
            email,
            phone,
            dob,
            gender,
            course,
            state,
            address
        } = req.body;

        if (!full_name || !email || !phone || !course) {
            return res.status(400).json({
                message: "All required fields must be filled ❌"
            });
        }

        const document = req.file ? req.file.filename : null;

        const result = await admissionModel.createAdmission({
            full_name,
            father_name: father_name || null,
            mother_name: mother_name || null,
            email,
            phone,
            dob: dob || null,
            gender: gender || null,
            course,
            state: state || null,
            address: address || null,
            document
        });

        console.log("✅ DB RESULT:", result);

        res.status(200).json({
            message: "Form Submitted Successfully ✅"
        });

    } catch (err) {
        console.error("🔥 REAL ERROR:", err);

        res.status(500).json({
            message: "Server Error ❌",
            error: err.message
        });
    }
};

// ✅ CHECK ADMISSION STATUS
const checkAdmission = async (req, res) => {
    try {
        const email = req.params.email?.trim();

        console.log("📧 Checking:", email);

        if (!email) {
            return res.status(400).json({
                message: "Email is required ❌"
            });
        }

        const data = await admissionModel.getStatus(email);

        if (!data) {
            return res.status(404).json({
                message: "No record found ❌"
            });
        }

        res.status(200).json(data);

    } catch (err) {
        console.error("🔥 CHECK ERROR:", err);

        res.status(500).json({
            message: "Server Error ❌",
            error: err.message
        });
    }
};

// ✅ DOWNLOAD SLIP (FINAL FIXED)
const downloadSlip = async (req, res) => {
    try {
        const email = req.params.email?.trim();

        console.log("📥 Download request for:", email);

        if (!email) {
            return res.status(400).json({
                message: "Email required ❌"
            });
        }

        const data = await admissionModel.getStatus(email);

        if (!data) {
            return res.status(404).json({
                message: "No record found ❌"
            });
        }

        // ✅ Response (can convert to PDF later)
        res.status(200).json({
            success: true,
            message: "Admission Slip Generated ✅",
            student: data
        });

    } catch (err) {
        console.error("🔥 DOWNLOAD ERROR:", err);

        res.status(500).json({
            message: "Server Error ❌",
            error: err.message
        });
    }
};

module.exports = { addAdmission, checkAdmission, downloadSlip };