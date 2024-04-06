const initialMessages = [];

function messagesReducer(state, action) {
    switch (action.type) {

        // add a array of message objects
        case 'SET_MESSAGES':
            return [
                ...state,
                ...action.payload
            ]

        // clear all messages
        case 'RESET_MESSAGES':
            return [
                ...action.payload
            ]

        // add single message object
        case 'ADD_MESSAGE':
            return [
                ...state,
                { ...action.payload }
            ]

        case 'APPEND_MESSAGES':
            return [
                ...action.payload,
                ...state,
            ]

        default:
            console.log("invalid action");
            break;
    }
}

export { initialMessages, messagesReducer };