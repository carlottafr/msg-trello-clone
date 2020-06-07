import * as io from "socket.io-client";

import { ticketMessages, ticketMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        // establish connection
        socket = io.connect();

        socket.on("ticketMessages", (msgs) =>
            store.dispatch(ticketMessages(msgs))
        );

        socket.on("ticketMessage", (msg) => {
            store.dispatch(ticketMessage(msg));
        });
    }
};
