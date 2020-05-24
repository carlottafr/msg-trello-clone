import axios from "./axios";

export async function getUser() {
    const { data } = await axios.get("/user");
    return {
        type: "GET_USER_INFO",
        user: data,
    };
}

export async function getProject() {
    //
}
