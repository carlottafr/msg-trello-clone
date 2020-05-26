DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
project VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
code VARCHAR NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
first VARCHAR(255) NOT NULL,
last VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(100) NOT NULL,
image TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
creator INT NOT NULL REFERENCES users(id),
title TEXT NOT NULL,
ticketnumber INT NOT NULL,
stage INT NOT NULL DEFAULT 1,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
poster_id INT NOT NULL REFERENCES users(id),
ticket_id INT NOT NULL REFERENCES tickets(id),
text VARCHAR NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (project, email, code) VALUES ('Muffin Gang', 'west.chicory+muffin@spicedling.email', '548022fedce9');

INSERT INTO users (project_id, first, last, email, password, image) VALUES (1, 'Funky', 'Chicken', 'west.chicory+muffin@spicedling.email', '$2a$10$CAfKGY1qpXGBL.PZ26wm6.LnSlkiuNCY.8mdzZSIOuKpFzLNp/kAu', 'https://s3.amazonaws.com/spicedling/eli4POf9_m2BAPKAQsPmC12o7mXpDnyE.png'),(1, 'Caroline', 'Rasmussen', 'msg0@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMTkyNDg4N15BMl5BanBnXkFtZTgwNTYzMzg0MDI@._V1_UY256_CR13,0,172,256_AL_.jpg'),(1, 'Eve', 'Marie Tran', 'msg1@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://m.media-amazon.com/images/M/MV5BMTczMTI1MjQzN15BMl5BanBnXkFtZTgwNjY2ODY2NDE@._V1_UY256_CR157,0,172,256_AL_.jpg'),(1, 'Nicole', 'McNamara', 'msg2@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://m.media-amazon.com/images/M/MV5BMTY1NjAwODIzOV5BMl5BanBnXkFtZTgwNjkwNDk3NTE@._V1_UX172_CR0,0,172,256_AL_.jpg'),(1, 'Polly', 'Heughan', 'msg3@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://m.media-amazon.com/images/M/MV5BMjI4NDcyNjQxNl5BMl5BanBnXkFtZTgwMzI4OTM3NjM@._V1_UY256_CR13,0,172,256_AL_.jpg'),(1, 'Uma', 'Albright', 'msg4@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5NzQ0OTQ5NV5BMl5BanBnXkFtZTgwNzgxOTMzNjE@._V1_UX172_CR0,0,172,256_AL_.jpg'),(1, 'Eli', 'McGrath', 'msg5@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg'),(1, 'Carlos', 'Palicki', 'msg6@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY256_CR9,0,172,256_AL_.jpg'),(1, 'Chacha', 'Pinwheel', 'msg7@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://randomuser.me/api/portraits/women/43.jpg'),(1, 'Ting', 'Velasco', 'msg8@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTU2MTI0NTIyNV5BMl5BanBnXkFtZTcwMTA4Nzc3OA@@._V1_UX172_CR0,0,172,256_AL_.jpg'),(1, 'Geoffrey', 'Bernard', 'msg9@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://randomuser.me/api/portraits/men/90.jpg'),(1, 'Luca', 'Menzies-Urich', 'msg10@example.com', '$2a$10$XHw7Gj41CLKMNr7wX46UjOUMkvMg1HGEfARMZ42dtsscDQC0zzenm', 'https://randomuser.me/api/portraits/men/56.jpg');

INSERT INTO tickets (title, project_id, creator, ticketnumber, stage) VALUES ('Create a page', 1, 1, 1, 3),('Create a muffin page', 1, 1, 2, 2),('Let users see the word muffin all over the page', 1, 1, 3, 1),('Show users a muffin at all times', 1, 1, 4, 1),('Make the register button green', 1, 1, 5, 1);

INSERT INTO messages (project_id, poster_id, ticket_id, text) VALUES (1, 1, 1, 'Let''s check this out!');