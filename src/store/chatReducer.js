const initialChat = {
    id: -1,
    roomName: null,
    isGroup: null
}

function chatReducer(state, action) {
    switch (action.type) {

        // set new chat object
        case 'SET_CHAT':
            return { ...action.payload };
        
        // reset chat
        case 'RESET_CHAT':
            return initialChat;

        default:
            console.log("invalid action");
            break;
    }
}

export { initialChat, chatReducer };