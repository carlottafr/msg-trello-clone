import { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(path, fields) {
    const [error, setError] = useState(error);

    function submit() {
        axios
            .post(path, fields)
            .then(({ data }) =>
                data.success ? location.replace("/") : setError(data)
            );
    }
    return [error, submit];
}

export function useStatefulFields() {
    const [fields, setFields] = useState({});
    function handleChange({ target }) {
        setFields({
            ...fields,
            [target.name]: target.value,
        });
    }
    console.log(fields);
    return [fields, handleChange];
}

export function useStatefulFieldsInvite(code) {
    const [fields, setFields] = useState({ code });
    function handleChange({ target }) {
        setFields({
            ...fields,
            [target.name]: target.value,
        });
    }
    console.log("fields: ", fields);
    return [fields, handleChange];
}
