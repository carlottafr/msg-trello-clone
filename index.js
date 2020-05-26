const express = require("express");
const app = express();
const compression = require("compression");
// - socket needs a Node server instead of Express one
// - we pass it our Express server so that all
// non-socket-related requests are handled
// by our Express server, but the socket one
// is handled by the Node server:
const server = require("http").Server(app);
// origins protects against attacks
// 'localhost:8080 mysocialnetwork.herokuapp.com:*' for deployment
const io = require("socket.io")(server, { origins: "localhost:8080" });
// io is an object
const cookieSession = require("cookie-session");
const db = require("./db");
const { showTime } = require("./showtime");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3");
const config = require("./config");

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);

// with the following code
// socket.request.session will be available
// when a user connects

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// CSRF security

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// Serve /public files

app.use(express.static("./public"));

// parses the req.body

app.use(express.json());

// Image upload boilerplate start v
// will upload sent files to my
// hard drive in a folder called /uploads

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////// Helper Functions ////////////////////

const setCookie = (project_id, id) => {
    let user = {
        projectId: project_id,
        userId: id,
    };
    return user;
};

const userObj = (arrObj) => {
    let user = {
        id: arrObj[0].id,
        first: arrObj[0].first,
        last: arrObj[0].last,
        image: arrObj[0].image,
    };
    return user;
};

//////////////////// GET /welcome ////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
        // ^ renders the welcome component
    }
});

//////////////////// POST /register ////////////////////

app.post("/register", async (req, res) => {
    let { project, first, last, email, password } = req.body;
    try {
        let hashedPw = await hash(password);
        // create access code to project board
        let secretCode = cryptoRandomString({
            length: 12,
        });
        const data = await db.registerProject(project, email, secretCode);
        const { rows } = await db.registerUser(
            data.rows[0].id,
            first,
            last,
            email,
            hashedPw
        );
        // set user cookie with projectId and userId
        req.session.user = setCookie(data.rows[0].id, rows[0].id);
        res.json({ success: true });
    } catch (err) {
        console.log("Error in POST /register: ", err);
        res.json({ success: false });
    }
});

//////////////////// POST /login ////////////////////

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let data = await db.login(email);

    if (!data.rows.length) {
        res.json({ noMail: true });
    } else {
        let databasePw = data.rows[0].password;
        let matchValue = await compare(password, databasePw);
        if (matchValue) {
            // set user cookie with projectId and userId
            req.session.user = setCookie(
                data.rows[0].project_id,
                data.rows[0].id
            );
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    }
});

//////////////////// GET /user ////////////////////

app.get("/user", async (req, res) => {
    const { rows } = await db.getUser(req.session.user.userId);
    res.json(userObj(rows));
});

//////////////////// GET /team ////////////////////

app.get("/team", async (req, res) => {
    const { rows } = await db.getTeam(req.session.user.projectId);
    res.json(rows);
});

//////////////////// GET /project-info ////////////////////

app.get("/project-info", async (req, res) => {
    const { rows } = await db.getProjectInfo(req.session.user.projectId);
    res.json({ project: rows[0].project });
});

//////////////////// GET /project ////////////////////

app.get("/project", async (req, res) => {
    const { rows } = await db.getProject(req.session.user.projectId);
    res.json(rows);
});

//////////////////// POST /add-ticket ////////////////////

app.post("/add-ticket", async (req, res) => {
    let { title } = req.body;
    const data = await db.addTicket(
        req.session.user.projectId,
        req.session.user.userId,
        title
    );
    res.json(data[0]);
});

//////////////////// GET /ticket ////////////////////

app.get("/api/ticket/:id", async (req, res) => {
    let { id } = req.params;
    const { rows } = await db.getTicket(req.session.user.projectId, id);
    rows[0].created_at = showTime(rows[0].created_at);
    res.json(rows);
});

//////////////////// GET /logout ////////////////////

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

// GET /

app.get("*", function (req, res) {
    if (!req.session.user) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
