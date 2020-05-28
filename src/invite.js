import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { HashRouter, Link } from "react-router-dom";
import { getProjectWithCode } from "./actions";
import { useStatefulFieldsInvite, useAuthSubmit } from "./hooks";

export default function Invite(props) {
    const dispatch = useDispatch();
    const { code } = props.match.params;
    useEffect(() => {
        dispatch(getProjectWithCode(code));
    }, [project]);

    let project = useSelector((state) => state && state.project);

    const [fields, handleChange] = useStatefulFieldsInvite(code);
    const [error, submit] = useAuthSubmit("/register-invite", fields);

    return (
        <div className="registration">
            {project && (
                <div>
                    <h2>You have been invited to work on {project.project}</h2>
                    <p>Please register to participate in the board.</p>
                </div>
            )}
            <div onChange={handleChange}>
                {error && <div>Oops, something went wrong!</div>}
                <div className="data">
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
            </div>
        </div>
    );
}
