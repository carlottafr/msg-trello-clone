import React, { useEffect } from "react";
// import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, getProjectInfo } from "./actions";
import Header from "./header";
import Board from "./board";
import Ticket from "./ticket";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        dispatch(getProjectInfo());
    }, []);
    return (
        <div>
            <Header />
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
