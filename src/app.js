import React, { useEffect } from "react";
// import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions";
import Header from "./header";
import Board from "./board";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
        <div>
            <h1>This is App!</h1>
            <Header />
            <BrowserRouter>
                <Route exact path="/" render={() => <Board />} />
            </BrowserRouter>
        </div>
    );
}
