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

INSERT INTO projects (project, email, code) VALUES 
('Muffin Gang', 'west.chicory+muffin@spicedling.email', '548022fedce9'),
('Fellowship', 'west.chicory+gandalf@spicedling.email', 'bc867d2f0ffe');

INSERT INTO users (project_id, first, last, email, password, image) VALUES 
(1, 'Funky', 'Chicken', 'west.chicory+muffin@spicedling.email', '$2a$10$CAfKGY1qpXGBL.PZ26wm6.LnSlkiuNCY.8mdzZSIOuKpFzLNp/kAu', 'https://s3.amazonaws.com/spicedling/eli4POf9_m2BAPKAQsPmC12o7mXpDnyE.png'),
(2, 'Gandalf', 'Greyhame', 'west.chicory+gandalf@spicedling.email', '$2a$10$rNcSKCO0HGbPiGpR7ajomuLebThvFjrAVCFy/7Wb0I7YaLoqHxZ0W', 'https://s3.amazonaws.com/spicedling/lVj2tHSIWUv2a1j8XOilSPgxJF9RHoTB.jpg'),
(2, 'Aragorn', 'Elessar', 'west.chicory+aragorn@spicedling.email', '$2a$10$UIoQb5NrWTZmt3PH2MMyUeHezz1yZbz42zsK5uLoEsmJ0HktNEDwK', 'https://s3.amazonaws.com/spicedling/FU3wKd34eaNDpolVqto9T1oHkwKYCZII.jpg'),
(2, 'Legolas', 'Greenleaf', 'west.chicory+legolas@spicedling.email', '$2a$10$a6/kxR6RIBZz4ufEsfVJg.G2ZeWW8haLbDV2x3jmp4sO1FYK52luS', 'https://s3.amazonaws.com/spicedling/rfOl77uYbh76FzH1qYwrKIkT7RejkMa_.jpg'),
(2, 'Gimli', 'Gloinsson', 'west.chicory+gimli@spicedling.email', '$2a$10$mCylGwlPPE7/f9A.NVCLdOTJC83k7RnK5TssHteqT48PyRBdxl3EK', 'https://s3.amazonaws.com/spicedling/eIIxA2WQU5yo-7xSg7IOhpO6lNEm3TBT.jpg'),
(2, 'Boromir', 'of Gondor', 'west.chicory+boromir@spicedling.email', '$2a$10$/C4Aotj63GK7wYpjXgWATu.FmGvdjoQ088l08u/Uf6SmSBHaFByoO', 'https://s3.amazonaws.com/spicedling/ak4ptu6Bo6-JVpif7Fgche4AUlQf-sqS.jpg'),
(2, 'Meriadoc', 'Brandybuck', 'west.chicory+merry@spicedling.email', '$2a$10$7iCUvWZukb09GXqI5Q35BuYR6N8Hd.6R3MRfeZrYuVolMfw3tBuIC', 'https://s3.amazonaws.com/spicedling/Pc7k-nmxmYg0z9nxfcTUp3EfxWjMshXo.jpg'),
(2, 'Peregrin', 'Took', 'west.chicory+pippin@spicedling.email', '$2a$10$QgB2D383.hx9f0q.l49c2eklCra36A1Bu2aPlgV1P2uekHLUTB71m', 'https://s3.amazonaws.com/spicedling/XntxR2_52saLqr_yMJi2l4ABABpZvXfg.jpeg'),
(2, 'Samwise', 'Gamgee', 'west.chicory+sam@spicedling.email', '$2a$10$RhMgI5V4o70GmdFMD9FQ7.J3SE8gdingZoyu6ArLAJQfMPDcXKE7C', 'https://s3.amazonaws.com/spicedling/G6sIf4wHUlWd55-AN8iiM_Iy7sHqYJfo.png'),
(2, 'Frodo', 'Baggins', 'west.chicory+frodo@spicedling.email', '$2a$10$8q8D5vOmq71yb7Qt1l5SHuRNj/fENBOgHrYLCAurWKOqUOAFV6hua', 'https://s3.amazonaws.com/spicedling/FQKebrUWfjbw6IvZGMxMwGw1NnNftufb.jpeg');

INSERT INTO tickets (title, project_id, creator, ticketnumber, stage) VALUES ('Create a page', 1, 1, 1, 3),('Create a muffin page', 1, 1, 2, 2),('Let users see the word muffin all over the page', 1, 1, 3, 1),('Show users a muffin at all times', 1, 1, 4, 1),('Make the register button green', 1, 1, 5, 1);

INSERT INTO messages (project_id, poster_id, ticket_id, text) VALUES (1, 1, 1, 'Let''s check this out!');