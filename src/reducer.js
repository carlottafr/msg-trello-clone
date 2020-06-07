export default function reducer(state = {}, action) {
    if (action.type == "GET_USER_INFO") {
        state = {
            ...state,
            user: action.user,
        };
    }

    // if (action.type == "GET_ALL_PROJECTS") {
    //     state = {
    //         ...state,
    //         multipleProjects: action.multipleProjects,
    //     };
    // }

    if (action.type == "TOGGLE_UPLOAD") {
        state = {
            ...state,
            uploadVisible: action.data,
        };
    }

    if (action.type == "CHANGE_AVATAR") {
        state = {
            ...state,
            ticketMessages: state.ticketMessages.map((message) => {
                if (message.user_id == action.id) {
                    return {
                        ...message,
                        image: action.image,
                    };
                } else {
                    return message;
                }
            }),
            user: {
                ...state.user,
                image: action.image,
            },
        };
    }

    if (action.type == "GET_TEAM_MEMBERS") {
        state = {
            ...state,
            team: action.team,
        };
    }

    if (
        action.type == "GET_PROJECT_INFO" ||
        action.type == "GET_PROJECT_CODE"
    ) {
        state = {
            ...state,
            project: action.project,
        };
    }

    if (action.type == "GET_PROJECT_TICKETS") {
        state = {
            ...state,
            tickets: action.tickets,
        };
    }

    if (action.type == "ADD_TICKET") {
        state = {
            ...state,
            tickets: [...state.tickets, action.ticket],
        };
    }

    if (action.type == "GET_TICKET_INFO") {
        state = {
            ...state,
            ticket: action.ticket,
        };
    }

    if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            ticketMessages: action.msgs,
        };
    }

    if (action.type == "ADD_NEW_MESSAGE") {
        state = {
            ...state,
            ticketMessages: [action.msg, ...state.ticketMessages],
        };
    }

    if (action.type == "CHANGE_STAGE") {
        state = {
            ...state,
            tickets: state.tickets.map((ticket) => {
                if (ticket.id == action.id) {
                    return {
                        ...ticket,
                        stage: action.stage,
                    };
                } else {
                    return ticket;
                }
            }),
        };
    }
    return state;
}
