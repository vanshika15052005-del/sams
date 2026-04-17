const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin@1505",
    database: "sams_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.log("Database Error:", err);
    } else {
        console.log("MySQL Pool Connected");
        connection.release(); // very important
    }
});

module.exports = db.promise();