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

    let ticketInfo = useSelector((state) => state && state.ticket);
    let currentStage = ticketInfo && ticketInfo[0].stage;

    // function that lets users change the ticket's
    // stage only to one that it isn't currently in already
    const showStages = (num) => {
        let availableStages = [1, 2, 3, 4, 5];
        let stagesArray = [];
        for (let i = 0; i < availableStages.length; i++) {
            if (availableStages[i] == num) {
                availableStages.splice(i, 1);
            }
            let stage = {
                stage: availableStages[i],
                name: setStage(availableStages[i]),
            };
            stagesArray.push(stage);
        }
        return stagesArray;
    };

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

    let changeToStages = showStages(currentStage);
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
                                    Change the stage
                                </div>
                                {changeState && (
                                    <div className="change-state">
                                        {changeToStages &&
                                            changeToStages.map((stage) => (
                                                <div
                                                    key={stage.stage}
                                                    id="change"
                                                    onClick={() =>
                                                        updateStage(stage.stage)
                                                    }
                                                >
                                                    {stage.name}
                                                </div>
                                            ))}
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
