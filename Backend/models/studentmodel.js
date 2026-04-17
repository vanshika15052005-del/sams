const db = require("../db");
const bcrypt = require("bcrypt");

// REGISTER
const registerUser = async (data) => {
    const { name, email, password } = data;

    // Validation
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check duplicate email
    const [existing] = await db.query(
        "SELECT * FROM students WHERE email=?",
        [email]
    );

    if (existing.length > 0) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    return await db.query(
        "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    );
};

// LOGIN
const loginUser = async (email, password) => {
    const [rows] = await db.query(
        "SELECT * FROM students WHERE email=?",
        [email]
    );

    if (rows.length === 0) {
        throw new Error("User not found");
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

module.exports = { registerUser, loginUser };