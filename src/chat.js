import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Avatar from "./avatar";

export default function Chat({ ticketId }) {
    useEffect(() => {
        console.log("Chat has mounted/changed!");
    }, [ticketChatMessages]);

    const ticketChatMessages = useSelector(
        (state) =>
            state &&
            state.ticketMessages &&
            state.ticketMessages.filter(
                (message) => (message.ticket_id = ticketId)
            )
    );

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            // prevent jumping to the next line
            e.preventDefault();
            socket.emit("newMessage", { ticketId, msg: e.target.value });
            e.target.value = "";
        }
    };
    console.log("ticketId: ", ticketId);

    console.log("ticketChatMessages: ", ticketChatMessages);
    return (
        <div className="chat">
            <div className="chatmsg-container">
                <textarea
                    placeholder="Add your message here and press enter"
                    onKeyDown={keyCheck}
                />
                {!ticketChatMessages && (
                    <div>Be the first to write a message!</div>
                )}
                {ticketChatMessages &&
                    ticketChatMessages.map((message) => (
                        <div key={message.id} className="message-unit">
                            <Avatar avatar={message.image} />
                            <div id="name">
                                {message.first} {message.last}
                            </div>
                            <div className="date-msg-container">
                                <div className="date">{message.created_at}</div>
                                <div className="message-text">
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
