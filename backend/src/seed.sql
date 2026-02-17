CREATE DATABASE IF NOT EXISTS tailorgo;
USE tailorgo;

-- users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user',
  created_at DATETIME
);

-- tailors
CREATE TABLE IF NOT EXISTS tailors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  bio TEXT,
  rating DECIMAL(2,1) DEFAULT 5.0,
  img_url VARCHAR(512),
  location VARCHAR(255),
  approved TINYINT DEFAULT 0
);

-- cart
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  tailor_id INT,
  created_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tailor_id) REFERENCES tailors(id)
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  tailor_id INT,
  measurements JSON,
  address VARCHAR(500),
  total_amount DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tailor_id) REFERENCES tailors(id)
);

-- messages (chat)
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT,
  to_user_id INT,
  order_id INT,
  content TEXT,
  created_at DATETIME,
  FOREIGN KEY (from_user_id) REFERENCES users(id),
  FOREIGN KEY (to_user_id) REFERENCES users(id)
);

-- notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  payload JSON,
  created_at DATETIME,
  read_flag TINYINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- sample tailors
INSERT INTO tailors (name, bio, rating, img_url, location, approved) VALUES
('Ravi Tailor', 'Expert in men suits', 4.8, '', 'Hyderabad', 1),
('Priya Stitch', 'Bridal specialist', 4.9, '', 'Hyderabad', 1),
('StitchCraft', 'Quick stitching & delivery', 4.6, '', 'Hyderabad', 1);
-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tailor_id INT NOT NULL,
  measurements JSON,
  address TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'placed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tailor_id) REFERENCES tailors(id) ON DELETE SET NULL
);
