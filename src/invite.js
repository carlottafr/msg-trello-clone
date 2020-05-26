import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Link } from "react-router-dom";
import { getProjectWithCode } from "./actions";
import { useStatefulFieldsInvite, useAuthSubmit } from "./hooks";
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

export default function Invite(props) {
    const dispatch = useDispatch();
    const { code } = props.match.params;
    useEffect(() => {
        dispatch(getProjectWithCode(code));
    }, [project]);

    let project = useSelector((state) => state && state.project);

    const classes = useStyles();
    const [fields, handleChange] = useStatefulFieldsInvite(code);
    const [error, submit] = useAuthSubmit("/register-invite", fields);

    return (
        <div className="welcome">
            {project && (
                <div>
                    <h1>You have been invited to work on {project.project}</h1>
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
