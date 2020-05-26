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

module.exports.getProjectWithCode = (code) => {
    return db.query(`SELECT * FROM projects WHERE code = $1;`, [code]);
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

module.exports.getTeam = (project_id) => {
    return db.query(
        `SELECT first, last, image FROM users WHERE project_id = $1;`,
        [project_id]
    );
};

module.exports.getProjectInfo = (id) => {
    return db.query(`SELECT * FROM projects WHERE id = $1;`, [id]);
};

module.exports.getProject = (id) => {
    return db.query(`SELECT * FROM tickets WHERE project_id = $1;`, [id]);
};

module.exports.addTicket = (project_id, creator, title) => {
    return db
        .query(
            `SELECT ticketnumber FROM tickets 
            WHERE (project_id = $1) 
            ORDER BY id DESC LIMIT 1;`,
            [project_id]
        )
        .then(({ rows }) => {
            let ticketnumber;
            if (rows[0].ticketnumber > 0) {
                ticketnumber = rows[0].ticketnumber + 1;
            } else {
                ticketnumber = 1;
            }
            console.log("ticketnumber: ", ticketnumber);
            return db.query(
                `INSERT INTO tickets (project_id, creator, title, ticketnumber) 
                VALUES ($1, $2, $3, ${ticketnumber}) RETURNING *;`,
                [project_id, creator, title]
            );
        })
        .then(({ rows }) => {
            return rows;
        })
        .catch((err) => {
            console.log("Error in addTicket: ", err);
        });
};

module.exports.getTicket = (project_id, id) => {
    return db.query(
        `SELECT tickets.creator AS creator, tickets.title AS title, 
        tickets.ticketnumber AS ticketnumber, tickets.created_at AS created_at, 
        users.first AS first, users.last AS last, users.image AS image 
        FROM tickets 
        JOIN users 
        ON tickets.creator = users.id 
        WHERE (tickets.project_id = $1 AND tickets.id = $2);`,
        [project_id, id]
    );
};

module.exports.getMessages = (project_id) => {
    return db.query(
        `SELECT messages.id AS id, 
        messages.ticket_id AS ticket_id, messages.text AS text, 
        messages.created_at AS created_at, users.first AS first, 
        users.last AS last, users.image AS image 
        FROM messages 
        JOIN users 
        ON (messages.project_id = $1 AND messages.poster_id = users.id);`,
        [project_id]
    );
};

module.exports.addMessage = (project_id, poster_id, ticket_id, text) => {
    return db
        .query(`INSERT INTO messages VALUES ($1, $2, $3, $4) RETURNING id;`, [
            project_id,
            poster_id,
            ticket_id,
            text,
        ])
        .then(({ rows }) => {
            let id = rows[0].id;
            return db.query(
                `SELECT messages.id AS id, messages.ticket_id AS ticket_id, 
        messages.text AS text, messages.created_at AS created_at, 
        users.first AS first, users.last AS last, users.image AS image 
        FROM messages 
        JOIN users 
        ON (messages.id = $1 AND messages.poster_id = users.id);`,
                [id]
            );
        })
        .catch((err) => {
            console.log("Error in addMessage: ", err);
        });
};

module.exports.changeStage = (id, stage) => {
    return db.query(
        `UPDATE tickets SET stage = $2 
        WHERE id = $1 RETURNING id;`,
        [id, stage]
    );
};
