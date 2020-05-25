import React, { useEffect } from "react";
// import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getTeam, getProjectInfo } from "./actions";
import Nav from "./nav";
import Board from "./board";
import Ticket from "./ticket";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getTeam());
        dispatch(getProjectInfo());
    }, []);

    return (
        <div className="body">
            <Nav />
            <BrowserRouter>
                <Route exact path="/" render={() => <Board />} />
                <Route
                    exact
                    path="/ticket/:id"
                    render={(props) => (
                        <Ticket
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
            </BrowserRouter>
        </div>
    );
}
