import React from "react";
// need this whenever I write components
import ReactDOM from "react-dom";
// ^ only in start.js
import Welcome from "./welcome";
// no curly brackets because I export default it in the original file
// import Logo from "./logo";
import App from "./app";
// giving socket.js file access to redux
// import { init } from "./socket";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

// createStore (Redux) contains the global state
// 2 args: reducer (function that updates global state)
// composeWithDevTools with middleware reduxPromise:
// use promises with Redux (allows action creators
// to return promises)

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    // elem = <Logo />;
    // init(store);
    elem = (
        // any component in App has
        // access to global state
        // via Provider and store prop
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
