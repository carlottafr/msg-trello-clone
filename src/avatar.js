import React from "react";

export default function Avatar({ avatar }) {
    avatar = avatar || "/default.png";
    return (
        <div className="avatar-wrapper">
            <img
                className="avatar"
                src={avatar}
                onError={(e) => (e.target.src = "/default.png")}
            />
        </div>
    );
}
