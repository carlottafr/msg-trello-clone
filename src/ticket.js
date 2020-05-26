import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicket, changeStage } from "./actions";
import { Link } from "react-router-dom";
import Chat from "./chat";

export default function Ticket(props) {
    const [changeState, setChangeState] = useState(false);
    const dispatch = useDispatch();
    const ticketId = props.match.params.id;
    useEffect(() => {
        dispatch(getTicket(ticketId));
    }, [ticketInfo]);

    const updateStage = (num) => {
        dispatch(changeStage(ticketId, num));
        setChangeState(false);
    };

    const ticketInfo = useSelector((state) => state && state.ticket);
    return (
        <div className="modal">
            <div className="ticket-container">
                <Link to={"/"}>
                    <div className="close">X</div>
                </Link>
                {ticketInfo &&
                    ticketInfo.map((ticket) => (
                        <div key={ticket.ticketnumber}>
                            <h2>
                                #{ticket.ticketnumber} {ticket.title}
                            </h2>
                            <div
                                className="open"
                                onClick={() => {
                                    setChangeState(true);
                                }}
                            >
                                Change the stage:
                            </div>
                            {changeState && (
                                <div className="change-state">
                                    <div>Stage 1: Initiation</div>
                                    <div onClick={() => updateStage(2)}>
                                        Stage 2: In progress
                                    </div>
                                    <div onClick={() => updateStage(3)}>
                                        Stage 3: Testing
                                    </div>
                                    <div onClick={() => updateStage(4)}>
                                        Stage 4: Implementation
                                    </div>
                                    <div onClick={() => updateStage(5)}>
                                        Stage 5: Maintenance
                                    </div>
                                    <div onClick={() => updateStage(6)}>
                                        Stage 6: Closed
                                    </div>
                                    <div
                                        onClick={() => {
                                            setChangeState(false);
                                        }}
                                    >
                                        Cancel
                                    </div>
                                </div>
                            )}
                            <div>
                                {ticket.first} {ticket.last} created this ticket
                                on {ticket.created_at}.
                            </div>
                            <Chat ticketId={ticketId} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
