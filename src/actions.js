import axios from "./axios";

export async function getUser() {
    const { data } = await axios.get("/user");
    return {
        type: "GET_USER_INFO",
        user: data,
    };
}

export async function getTeam() {
    const { data } = await axios.get("/team");
    return {
        type: "GET_TEAM_MEMBERS",
        team: data,
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
    return {
        type: "GET_TICKET_INFO",
        ticket: data,
    };
}

export async function addTicket(title) {
    console.log("Title: ", title);
    const { data } = await axios.post("/add-ticket", { title });
    return {
        type: "ADD_TICKET",
        ticket: data,
    };
}

export async function getMessages(id) {
    const { data } = await axios.get("/api/messages/" + id);
    return {
        type: "GET_TICKET_MESSAGES",
        messages: data,
    };
}
