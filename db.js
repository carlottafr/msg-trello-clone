const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/finalproject"
);

module.exports.registerProject = (project, email, code) => {
    return db.query(
        `INSERT INTO projects (project, email, code) 
        VALUES ($1, $2, $3) RETURNING id;`,
        [project, email, code]
    );
};

module.exports.registerUser = (project_id, first, last, email, password) => {
    return db.query(
        `INSERT INTO users (project_id, first, last, email, password) 
        VALUES ($1, $2, $3, $4, $5) RETURNING id, first, last;`,
        [project_id, first, last, email, password]
    );
};

module.exports.login = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

module.exports.getUser = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
};

module.exports.getProject = (id) => {
    return db.query(`SELECT * FROM tickets WHERE project_id = $1;`, [id]);
};

module.exports.getMessages = (id) => {
    return db.query(
        `SELECT messages.id AS id, messages.poster_id AS poster_id, 
        messages.ticket_id AS ticket_id, messages.text AS text, 
        messages.created_at AS created_at, users.first AS first, 
        users.last AS last, users.image AS image 
        FROM messages 
        JOIN users 
        ON (messages.project_id = $1 AND messages.poster_id = users.id);`,
        [id]
    );
};
