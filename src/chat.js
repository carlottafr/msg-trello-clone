import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Avatar from "./avatar";

export default function Chat({ ticketId }) {
    useEffect(() => {
        console.log("Chat has mounted/changed!");
    }, [ticketChatMessages]);

    // get the respective ticket's chat messages
    const ticketChatMessages = useSelector(
        (state) =>
            state &&
            state.ticketMessages &&
            state.ticketMessages.filter(
                (message) => message.ticket_id == ticketId
            )
    );

    // add a message by pressing enter, empty the textarea
    const keyCheck = (e) => {
        if (e.key === "Enter") {
            // prevent jumping to the next line
            e.preventDefault();
            socket.emit("newMessage", { ticketId, msg: e.target.value });
            e.target.value = "";
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-inner-container">
                <div className="chat">
                    {ticketChatMessages && !ticketChatMessages.length && (
                        <div className="first-msg">
                            Be the first to write a message!
                        </div>
                    )}
                    {ticketChatMessages &&
                        ticketChatMessages.map((message) => (
                            <div key={message.id} className="message-unit">
                                <Avatar avatar={message.image} />
                                <div className="msg-info-wrapper">
                                    <div className="name-date-container">
                                        <div className="date">
                                            {message.created_at}
                                        </div>
                                        <p>
                                            {message.first} {message.last}
                                        </p>
                                    </div>
                                    <div className="msg-container">
                                        <div className="message-text">
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <textarea
                placeholder="Add your message here and press enter"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
