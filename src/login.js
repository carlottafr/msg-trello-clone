import React, { useEffect } from "react";
import { HashRouter, Link } from "react-router-dom";
import { useStatefulFields, useAuthSubmit } from "./hooks";

export default function Login() {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/login", fields);

    useEffect(() => {
        console.log("error: ", error);
    });

    return (
        <div className="login">
            <div className="data" onChange={handleChange}>
                {error && error.noMail && (
                    <div>This email has not been registered yet!</div>
                )}
                {error && !error.noMail && !error.success && (
                    <div>Email or password is incorrect!</div>
                )}
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
                    Login
                </button>
                <HashRouter>
                    <div id="addon">
                        If you do not have an account yet,{" "}
                        <Link to="/">register here!</Link>
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
