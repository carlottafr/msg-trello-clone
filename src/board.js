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

    const showBoard = (num) => {
        const stageColumn =
            projectTickets &&
            projectTickets.filter((ticket) => ticket.stage == num);
        let stage;
        if (num == 1) {
            stage = "Initiation";
        } else if (num == 2) {
            stage = "In progress";
        } else if (num == 3) {
            stage = "Testing";
        } else if (num == 4) {
            stage = "Implementation";
        } else if (num == 5) {
            stage = "Maintenance";
        } else {
            stage = "Closed";
        }

        return (
            <div className="stage-column">
                <div className="stage-title">{stage}</div>
                {stageColumn && !stageColumn.length && (
                    <div>There are no tickets in initiation stage.</div>
                )}
                {stageColumn &&
                    stageColumn.map((ticket) => (
                        <div key={ticket.id} className="ticket">
                            <Link to={"/ticket/" + ticket.id}>
                                <div className="ticket-title">
                                    #{ticket.ticketnumber} {ticket.title}
                                </div>
                                <div className="nr-msgs">
                                    <img src="/msg.png" />
                                    {ticket.msgNumber}
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        );
    };

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
                        {success && (
                            <div className="success">
                                The invite has been sent out!
                            </div>
                        )}
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
                    </div>
                )}
            </div>
            <div className="stage-container">
                {showBoard(1)}
                {showBoard(2)}
                {showBoard(3)}
                {showBoard(4)}
                {showBoard(5)}
                {showBoard(6)}
            </div>
        </div>
    );
}
