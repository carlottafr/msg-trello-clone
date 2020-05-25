import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProject } from "./actions";

export default function Board() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProject());
    }, [projectTickets]);

    const stageOne = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 1)
    );
    const stageTwo = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 2)
    );
    const stageThree = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 3)
    );
    const stageFour = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 4)
    );
    const stageFive = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 5)
    );
    const stageSix = useSelector(
        (state) =>
            state &&
            state.tickets &&
            state.tickets.filter((ticket) => ticket.stage == 6)
    );

    const projectTickets = useSelector((state) => state && state.tickets);

    return (
        <div className="board">
            <div className="stage-container">
                <div className="stage-column">
                    <div className="stage-title">Initiation</div>
                    {stageOne && !stageOne.length && (
                        <div>There are no tickets in initiation stage.</div>
                    )}
                    {stageOne &&
                        stageOne.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="stage-column">
                    <div className="stage-title">In Progress</div>
                    {stageTwo && !stageTwo.length && (
                        <div>There are no tickets in progress stage.</div>
                    )}
                    {stageTwo &&
                        stageTwo.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="stage-column">
                    <div className="stage-title">Review</div>
                    {stageThree && !stageThree.length && (
                        <div>There are no tickets in review stage.</div>
                    )}
                    {stageThree &&
                        stageThree.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="stage-column">
                    <div className="stage-title">Testing</div>
                    {stageFour && !stageFour.length && (
                        <div>There are no tickets in testing stage.</div>
                    )}
                    {stageFour &&
                        stageFour.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="stage-column">
                    <div className="stage-title">Implementation</div>
                    {stageFive && !stageFive.length && (
                        <div>There are no tickets in implementation stage.</div>
                    )}
                    {stageFive &&
                        stageFive.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="stage-column">
                    <div className="stage-title">Maintenance</div>
                    {stageSix && !stageSix.length && (
                        <div>There are no tickets in maintenance stage.</div>
                    )}
                    {stageSix &&
                        stageSix.map((ticket) => (
                            <div key={ticket.id}>
                                <Link to={"/ticket/" + ticket.id}>
                                    <div className="ticket-title">
                                        #{ticket.ticketnumber} {ticket.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
