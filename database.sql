-- Create database
CREATE DATABASE IF NOT EXISTS banking_app;
USE banking_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (username, password, email, first_name, last_name)
VALUES ('user1', '$2y$10$YourHashedPasswordHere', 'user1@example.com', 'John', 'Doe');

INSERT INTO accounts (user_id, account_number, balance)
VALUES (1, '1000123456', 1250.75);

INSERT INTO transactions (user_id, type, amount, date, description)
VALUES 
(1, 'deposit', 500.00, '2023-04-10 09:15:00', 'Salary deposit'),
(1, 'withdrawal', 120.50, '2023-04-08 14:30:00', 'Grocery shopping'),
(1, 'deposit', 200.00, '2023-04-05 11:45:00', 'Refund'),
(1, 'withdrawal', 45.99, '2023-04-03 19:20:00', 'Restaurant'),
(1, 'withdrawal', 350.00, '2023-04-01 10:00:00', 'Rent payment');
