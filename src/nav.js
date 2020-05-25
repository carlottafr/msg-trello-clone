import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from "./avatar";

export default function Nav() {
    const [modalVisible, setModal] = useState(false);
    let project = useSelector((state) => state && state.project);
    let user = useSelector((state) => state && state.user);

    useEffect(() => {
        console.log("Nav mounted or changed.");
    }, []);

    return (
        <div className="nav-container">
            <img
                src="/menu.svg"
                id="bmenu"
                onClick={() => {
                    console.log("There was a click!");
                    setModal(true);
                }}
            />
            {modalVisible && (
                <div className="modal">
                    <div className="nav">
                        <div
                            id="close"
                            onClick={() => {
                                console.log("There was a click!");
                                setModal(false);
                            }}
                        >
                            X
                        </div>
                        {project && <h1>{project.project}</h1>}
                        {user && (
                            <div className="user">
                                <Avatar avatar={user.image} />
                                {user.first} {user.last}
                            </div>
                        )}
                        <div>
                            <a href="/logout">Logout</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
