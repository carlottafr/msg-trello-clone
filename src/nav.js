import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpload } from "./actions";
import Avatar from "./avatar";

export default function Nav() {
    const dispatch = useDispatch();
    const [modalVisible, setModal] = useState(false);
    let user = useSelector((state) => state && state.user);

    return (
        <div className="nav-container">
            <img
                src="/menu.svg"
                id="bmenu"
                onClick={() => {
                    setModal(!modalVisible);
                }}
            />
            {modalVisible && (
                <div className="modal">
                    <div className="nav">
                        <div
                            className="close"
                            onClick={() => {
                                setModal(!modalVisible);
                            }}
                        >
                            <img src="/close.png" />
                        </div>
                        <div className="nav-info">
                            {user && (
                                <div className="user">
                                    <div
                                        onClick={() => {
                                            dispatch(toggleUpload(true));
                                        }}
                                    >
                                        <Avatar avatar={user.image} />
                                        <p>Edit your avatar</p>
                                    </div>
                                    <p className="username">
                                        {user.first} {user.last}
                                    </p>
                                </div>
                            )}
                            <div className="logout">
                                <a href="/logout">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
