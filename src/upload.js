import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUpload, uploadAvatar } from "./actions";

export default function Upload() {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    return (
        <div className="modal">
            <div className="upload">
                <p id="close" onClick={() => dispatch(toggleUpload(false))}>
                    X
                </p>
                <input
                    onChange={({ target }) => {
                        setFile(target.files[0]);
                    }}
                    name="file"
                    type="file"
                    accept="jpg/*"
                />
                <button
                    onClick={() => {
                        dispatch(uploadAvatar(file));
                        dispatch(toggleUpload(false));
                    }}
                >
                    Upload
                </button>
            </div>
        </div>
    );
}
