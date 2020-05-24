import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
    const user = useSelector((state) => state && state.user);

    return (
        <div className="header">
            {user && (
                <div>
                    Hello {user.first} {user.last}!
                </div>
            )}
        </div>
    );
}
