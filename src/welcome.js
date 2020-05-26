import React from "react";
// import Registration from "./registration";
import Registration from "./registration";
import Invite from "./invite";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route
                        path="/:code"
                        render={(props) => (
                            <Invite
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route exact path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
