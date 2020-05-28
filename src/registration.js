import React from "react";
// import axios from "./axios";
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
        margin: "10px",
    },
});

export default function Registration() {
    const classes = useStyles();
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", fields);

    return (
        <div className="registration">
            <div onChange={handleChange}>
                {error && <div>Oops, something went wrong!</div>}
                <div className="data">
                    <input
                        name="project"
                        type="text"
                        placeholder="Project name"
                    />
                    <input name="first" type="text" placeholder="First name" />
                    <input name="last" type="text" placeholder="Last name" />
                    <input name="email" type="email" placeholder="Email" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                submit();
                            }
                        }}
                    />
                    <Button className={classes.root} onClick={submit}>
                        Register
                    </Button>
                </div>
                <HashRouter>
                    <div id="login">
                        You already have an account?{" "}
                        <Link to="/login">You can log in here!</Link>
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
