import React, { useEffect } from "react";
import { HashRouter, Link } from "react-router-dom";
import { useStatefulFields, useAuthSubmit } from "./hooks";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        background: "green",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 40,
        padding: "0 20px",
    },
});

export default function Login() {
    const classes = useStyles();
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/login", fields);

    useEffect(() => {
        console.log("error: ", error);
    });

    return (
        <div className="data" onChange={handleChange}>
            {error && error.noMail && (
                <div>This email has not been registered yet!</div>
            )}
            {error && !error.success && (
                <div>Email or password is incorrect!</div>
            )}
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <Button className={classes.root} onClick={submit}>
                Login
            </Button>
            <HashRouter>
                <div>
                    If you do not have an account yet,{" "}
                    <Link to="/">register here!</Link>
                </div>
            </HashRouter>
        </div>
    );
}
