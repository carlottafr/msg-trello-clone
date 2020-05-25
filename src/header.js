import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
    const project = useSelector((state) => state && state.project);
    const user = useSelector((state) => state && state.user);

    return (
        <div className="header">
            {project && <h1>{project.project}</h1>}
            {user && (
                <div>
                    Hello {user.first} {user.last}!
                </div>
            )}
            <div>
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
}
