import axios from "./axios";

export async function getUser() {
    const { data } = await axios.get("/user");
    return {
        type: "GET_USER_INFO",
        user: data,
    };
}

export async function toggleUpload(data) {
    return {
        type: "TOGGLE_UPLOAD",
        data,
    };
}

export async function uploadAvatar(file) {
    var formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post("/avatar", formData);
    return {
        type: "CHANGE_AVATAR",
        id: data[0].id,
        image: data[0].image,
    };
}

export async function getTeam() {
    const { data } = await axios.get("/team");
    return {
        type: "GET_TEAM_MEMBERS",
        team: data,
    };
}

export async function getProjectWithCode(code) {
    console.log("Actions code: ", code);
    const { data } = await axios.post("/project-code", { code });
    return {
        type: "GET_PROJECT_CODE",
        project: data,
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

export async function addTicket(title) {
    const { data } = await axios.post("/add-ticket", { title });
    return {
        type: "ADD_TICKET",
        ticket: data,
    };
}

export async function getTicket(id) {
    const { data } = await axios.get("/api/ticket/" + id);
    return {
        type: "GET_TICKET_INFO",
        ticket: data,
    };
}

export function ticketMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        msgs,
    };
}

export function ticketMessage(msg) {
    return {
        type: "ADD_NEW_MESSAGE",
        msg,
    };
}

export async function changeStage(id, num) {
    const { data } = await axios.post("/change-stage", { id, num });
    return {
        type: "CHANGE_STAGE",
        id: data[0].id,
        stage: data[0].stage,
    };
}

export async function getMessages(id) {
    const { data } = await axios.get("/api/messages/" + id);
    return {
        type: "GET_TICKET_MESSAGES",
        messages: data,
    };
}
