import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProject, addTicket } from "./actions";

export default function Board() {
    const dispatch = useDispatch();
    const [addSomething, setAddSomething] = useState(false);
    const [newTicket, setNewTicket] = useState(false);
    const [inviteMember, setInviteMember] = useState(false);
    const [error, setError] = useState(false);
    const [alreadyMember, setAlreadyMember] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(getProject());
    }, [projectTickets]);

    const projectTickets = useSelector((state) => state && state.tickets);
    const project = useSelector((state) => state && state.project);

    const stageOne =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 1);
    const stageTwo =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 2);
    const stageThree =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 3);
    const stageFour =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 4);
    const stageFive =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 5);
    const stageSix =
        projectTickets && projectTickets.filter((ticket) => ticket.stage == 6);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            // prevent jumping to the next line
            e.preventDefault();
            dispatch(addTicket(e.target.value));
            setNewTicket(false);
        }
    };

    const inviteTeamMember = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const { data } = await axios.post("/invite-member", {
                email: e.target.value,
            });
            if (data.mailSent) {
                setSuccess(true);
                setInviteMember(false);
            } else if (data.alreadyMember) {
                setAlreadyMember(true);
            } else {
                setError(true);
            }
        }
    };

    console.log("projectTickets: ", projectTickets);

    return (
        <div className="board">
            <div className="header">
                {project && <h1>{project.project}</h1>}
            </div>
            <div className="add">
                <div
                    className="open"
                    onClick={() => {
                        setAddSomething(!addSomething);
                    }}
                >
                    <img src="/add.png" className="open" />
                </div>
                {addSomething && (
                    <div className="add-sth">
                        <div
                            className="open"
                            onClick={() => {
                                setNewTicket(true);
                            }}
                        >
                            Add a ticket
                        </div>
                        {newTicket && (
                            <div className="textarea">
                                <input
                                    type="text"
                                    placeholder="Add the ticket title and press enter"
                                    onKeyDown={(e) => keyCheck(e)}
                                />
                                <button
                                    onClick={() => {
                                        setNewTicket(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        {success && <div>The invite has been sent out!</div>}
                        {error && (
                            <div>
                                Uh oh, something went wrong, please try again!
                            </div>
                        )}
                        {alreadyMember && (
                            <div>
                                This email is already registered for this
                                project!
                            </div>
                        )}
                        <div
                            className="open"
                            onClick={() => {
                                setInviteMember(true);
                            }}
                        >
                            Invite a new team member
                        </div>
                        {inviteMember && (
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter the email address press enter"
                                    onKeyDown={(e) => inviteTeamMember(e)}
                                />
                                <button
                                    onClick={() => {
                                        setInviteMember(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
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
                    <div className="stage-title">Testing</div>
                    {stageThree && !stageThree.length && (
                        <div>There are no tickets in testing stage.</div>
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
                    <div className="stage-title">Implementation</div>
                    {stageFour && !stageFour.length && (
                        <div>There are no tickets in implementation stage.</div>
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
                    <div className="stage-title">Maintenance</div>
                    {stageFive && !stageFive.length && (
                        <div>There are no tickets in maintenance stage.</div>
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
                    <div className="stage-title">Closed</div>
                    {stageSix && !stageSix.length && (
                        <div>There are no closed tickets.</div>
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
