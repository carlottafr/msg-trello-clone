import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "./actions";
import { Link } from "react-router-dom";

export default function Ticket(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        let ticketId = props.match.params.id;
        dispatch(getTicket(ticketId));
        console.log("ticketInfo: ", ticketInfo);
    }, [ticketInfo]);

    const ticketInfo = useSelector((state) => state && state.ticket);
    console.log(ticketInfo);
    return (
        <div className="modal">
            <div className="ticket-container">
                {ticketInfo &&
                    ticketInfo.map((ticket) => (
                        <div key={ticket.ticketnumber}>
                            <Link to={"/"}>
                                <div className="close">X</div>
                            </Link>

                            <h2>
                                #{ticket.ticketnumber} {ticket.title}
                            </h2>
                            <div>
                                {ticket.first} {ticket.last} created this ticket
                                on {ticket.created_at}.
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
