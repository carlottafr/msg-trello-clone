export default function reducer(state = {}, action) {
    if (action.type == "GET_USER_INFO") {
        state = {
            ...state,
            user: action.user,
        };
    }

    if (action.type == "GET_PROJECT_INFO") {
        state = {
            ...state,
            project: action.project,
        };
        console.log(state);
    }

    if (action.type == "GET_PROJECT_TICKETS") {
        state = {
            ...state,
            tickets: action.tickets,
        };
    }

    if (action.type == "GET_TICKET_INFO") {
        state = {
            ...state,
            ticket: action.ticket,
        };
    }
    return state;
}
