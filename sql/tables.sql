DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS boards;
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

CREATE TABLE boards(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
section VARCHAR(255) NOT NULL
);

CREATE TABLE tickets(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
section_id INT NOT NULL REFERENCES boards(id)
);

CREATE TABLE messages(
id SERIAL PRIMARY KEY,
project_id INT NOT NULL REFERENCES projects(id),
poster_id INT NOT NULL REFERENCES users(id),
section_id INT NOT NULL REFERENCES boards(id),
ticket_id INT NOT NULL REFERENCES tickets(id),
text VARCHAR NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);