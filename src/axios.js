import axios from "axios";

// axios config object for csrf

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;
