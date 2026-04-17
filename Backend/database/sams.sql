CREATE DATABASE sams_db;

USE sams_db;


-- ================= USERS (REGISTER / LOGIN) =================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================= ADMISSIONS =================
CREATE TABLE admissions (
   id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),my
    dob DATE,
    gender VARCHAR(10),
    course VARCHAR(50),
    state VARCHAR(50),
    address TEXT,
    document VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- ================= CONTACT =================
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    subject VARCHAR(150),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Announcements
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255)
);

INSERT INTO announcements (text) VALUES
('Admissions Open for 2026'),
('Last date is 30th June'),
('Scholarship available');

-- Reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    message TEXT
);

INSERT INTO reviews (name, message) VALUES
('Rahul', 'Very easy admission process'),
('Simran', 'User-friendly website');


