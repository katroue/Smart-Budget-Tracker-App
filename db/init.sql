create table if not exists users (
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

CREATE TABLE budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category VARCHAR(50),
  period ENUM('monthly','yearly') DEFAULT 'monthly',
  limit_amount DECIMAL(10,2),
  start_month DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);