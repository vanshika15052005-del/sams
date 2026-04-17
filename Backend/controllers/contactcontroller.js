const { addContact } = require("../models/contactmodel");

const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All required fields missing" });
        }

        await addContact({ name, email, subject, message });

        res.status(200).json({ message: "Message Sent ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error ❌" });
    }
};

module.exports = { submitContact };