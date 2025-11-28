CREATE DATABASE IF NOT EXISTS dbcloud;
    USE dbcloud;

    CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mensaje VARCHAR(255) NOT NULL,
        imagen VARCHAR(255),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO logs (mensaje, imagen) VALUES ('Manual', 'dock.png');