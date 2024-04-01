const initialUserState = {
    isAuthenticated: false,
    profile: {}
};


function userReducer(state, action) {
    const user = action.payload;

    switch (action.type) {
        case 'LOG_IN':
            return {
                isAuthenticated: user.isAuthenticated,
                profile:{
                    ...user.profile
                }
            }
            
        case 'LOG_OUT':
            return initialUserState

        default:
            console.log("invalid action");
            break;
    }
}

export { initialUserState,userReducer };