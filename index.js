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

// Parse request body

app.use(express.json());

// Upload sent files to my
// hard drive in a folder called /uploads
// and delete them in s3.js

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

// GET /

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// app is switched for server so that non-socket requests
// are handled by app (Express server), and socket requests
// are handled by the Node server
server.listen(8080, function () {
    console.log("I'm listening.");
});
