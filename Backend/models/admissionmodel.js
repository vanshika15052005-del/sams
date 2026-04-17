const db = require("../db");

const createAdmission = async (data) => {
    const sql = `
        INSERT INTO admissions 
        (full_name, father_name, mother_name, email, phone, dob, gender, course, state, address, document, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    const values = [
        data.full_name,
        data.father_name || null,
        data.mother_name || null,
        data.email,
        data.phone,
        data.dob || null,
        data.gender || null,
        data.course,
        data.state || null,
        data.address || null,
        data.document || null
    ];

    const [result] = await db.query(sql, values);
    return result;
};

const getStatus = async (email) => {
    const [rows] = await db.query(
        `SELECT full_name, email, course, status
         FROM admissions 
         WHERE TRIM(LOWER(email)) = TRIM(LOWER(?))`,
        [email]
    );
    return rows[0];
};

module.exports = { createAdmission, getStatus };