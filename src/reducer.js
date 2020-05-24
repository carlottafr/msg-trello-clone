export default function reducer(state = {}, action) {
    if (action.type == "GET_USER_INFO") {
        state = {
            ...state,
            user: action.user,
        };
    }
    return state;
}
