const db = require("../db");

const addContact = async (data) => {
    const { name, email, subject, message } = data;

    // Validation
    if (!name || !email ||!message) {
        throw new Error("Required fields missing");
    }

    const finalSubject = subject || "No Subject";

    return await db.query(
        "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [name, email, finalSubject, message]
    );
};

module.exports = { addContact };