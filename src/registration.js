import React from "react";
// import axios from "./axios";
import { HashRouter, Link } from "react-router-dom";
import { useStatefulFields, useAuthSubmit } from "./hooks";

export default function Registration() {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", fields);

    return (
        <div className="registration">
            <h1>Go through it together</h1>
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
                    <button className="open" onClick={submit}>
                        Register
                    </button>
                </div>
                <HashRouter>
                    <div id="addon">
                        You already have an account?{" "}
                        <Link to="/login">Log in here!</Link>
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
