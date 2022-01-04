create table if not exists users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(16) UNIQUE NOT NULL,
  password VARCHAR(16) NOT NULL
);

create table if not exists posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE 
);