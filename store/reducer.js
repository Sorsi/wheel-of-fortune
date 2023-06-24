const initState = {
    users: [],
    selectedUser: {},
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case 'SELECT_USER':
            return {
                ...state,
                selectedUser: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;