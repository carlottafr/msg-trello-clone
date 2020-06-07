import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUpload, uploadAvatar } from "./actions";

export default function Upload() {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    return (
        <div className="modal">
            <div className="upload">
                <div
                    className="close"
                    onClick={() => dispatch(toggleUpload(false))}
                >
                    <img src="/close.png" />
                </div>
                <div className="upload-buttons">
                    <input
                        onChange={({ target }) => {
                            setFile(target.files[0]);
                        }}
                        name="file"
                        id="file"
                        type="file"
                        accept="jpg/*"
                        className="inputfile"
                    />
                    <label htmlFor="file" className="inputlabel">
                        Choose
                    </label>
                    <div
                        className="upload-btn"
                        onClick={() => {
                            dispatch(uploadAvatar(file));
                            dispatch(toggleUpload(false));
                        }}
                    >
                        Upload
                    </div>
                </div>
            </div>
        </div>
    );
}
