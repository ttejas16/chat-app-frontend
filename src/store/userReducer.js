const initialUserState = {
    isAuthenticated: false,
    profile: {}
};


function userReducer(state, action) {

    switch (action.type) {
        case 'LOG_IN':
            return {
                isAuthenticated: true,
                profile: {
                    ...action.payload
                }
            }

        case 'LOG_OUT':
            return initialUserState

        case 'UPDATE_PROFILE':
            return {
                isAuthenticated: state.isAuthenticated,
                profile: {
                    ...action.payload,
                }
            }

        default:
            console.log("invalid action");
            break;
    }
}

export { initialUserState, userReducer };