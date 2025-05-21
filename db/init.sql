create table if not exists Users (
    id INT auto_increment primary key,
    username  varchar(50) not null,
    email varchar(100) not null,
    password_hash varchar(255) not null
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(50),
    amount DECIMAL(10, 2),
    date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);