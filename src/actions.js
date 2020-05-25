import axios from "./axios";

export async function getUser() {
    const { data } = await axios.get("/user");
    return {
        type: "GET_USER_INFO",
        user: data,
    };
}

export async function getProjectInfo() {
    const { data } = await axios.get("/project-info");
    return {
        type: "GET_PROJECT_INFO",
        project: data,
    };
}

export async function getProject() {
    const { data } = await axios.get("/project");
    return {
        type: "GET_PROJECT_TICKETS",
        tickets: data,
    };
}

export async function getTicket(id) {
    const { data } = await axios.get("/api/ticket/" + id);
    console.log("Action data: ", data);
    return {
        type: "GET_TICKET_INFO",
        ticket: data,
    };
}
