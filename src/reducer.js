export default function reducer(state = {}, action) {
    if (action.type == "GET_USER_INFO") {
        state = {
            ...state,
            user: action.user,
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
        console.log("Reducer is at work!");
        state = {
            ...state,
            ticketMessages: action.msgs,
        };
    }

    // if (action.type == "GET_TICKET_MESSAGES") {
    //     state = {
    //         ...state,
    //         ticketChatMessages: action.msgs,
    //     };
    // }

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
    console.log(state);
    return state;
}
