import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { getTicket, changeStage } from "./actions";
import { Link } from "react-router-dom";
import Chat from "./chat";
import setStage from "./stage";

export default function Ticket(props) {
    const [changeState, setChangeState] = useState(false);
    const dispatch = useDispatch();
    const ticketId = props.match.params.id;
    useEffect(() => {
        dispatch(getTicket(ticketId));
    }, [ticketInfo]);

    const updateStage = (num) => {
        dispatch(changeStage(ticketId, num));
        let stage = setStage(num);
        // write an automatic chat message with the stage change
        socket.emit("newMessage", {
            ticketId,
            msg: `changed the ticket stage to ${stage}.`,
        });
        setChangeState(false);
    };

    const ticketInfo = useSelector((state) => state && state.ticket);
    console.log("ticketInfo: ", ticketInfo);
    return (
        <div className="modal">
            <div className="ticket-container">
                <div className="ticket-inner-container">
                    <Link to={"/"}>
                        <div className="close">Close</div>
                    </Link>
                    {ticketInfo &&
                        ticketInfo.map((ticket) => (
                            <div
                                key={ticket.ticketnumber}
                                className="ticket-info"
                            >
                                <h2>
                                    #{ticket.ticketnumber} {ticket.title}
                                </h2>
                                <div className="ticket-created">
                                    {ticket.first} {ticket.last} created this
                                    ticket on {ticket.created_at}.
                                </div>
                                <div
                                    className="open"
                                    onClick={() => {
                                        setChangeState(!changeState);
                                    }}
                                >
                                    Change the stage:
                                </div>
                                {changeState && (
                                    <div className="change-state">
                                        <div id="change">
                                            Stage 1: Initiation
                                        </div>
                                        <div
                                            id="change"
                                            onClick={() => updateStage(2)}
                                        >
                                            Stage 2: In progress
                                        </div>
                                        <div
                                            id="change"
                                            onClick={() => updateStage(3)}
                                        >
                                            Stage 3: Testing
                                        </div>
                                        <div
                                            id="change"
                                            onClick={() => updateStage(4)}
                                        >
                                            Stage 4: Implementation
                                        </div>
                                        <div
                                            id="change"
                                            onClick={() => updateStage(5)}
                                        >
                                            Stage 5: Maintenance
                                        </div>
                                        <div
                                            id="change"
                                            onClick={() => updateStage(6)}
                                        >
                                            Stage 6: Closed
                                        </div>
                                        <div
                                            onClick={() => {
                                                setChangeState(!changeState);
                                            }}
                                        >
                                            Cancel
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    <Chat ticketId={ticketId} />
                </div>
            </div>
        </div>
    );
}
