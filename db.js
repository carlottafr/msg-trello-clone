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
