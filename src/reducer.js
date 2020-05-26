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

    if (action.type == "GET_PROJECT_INFO") {
        state = {
            ...state,
            project: action.project,
        };
    }

    if (action.type == "OPEN_NAV") {
        state = {
            ...state,
            modalVisible: action.modalVisible,
        };
    }

    if (action.type == "CLOSE_NAV") {
        state = {
            ...state,
            modalVisible: action.modalVisible,
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
    console.log(state);
    return state;
}
