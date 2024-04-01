// let room = {
//     id: '',
//     roomName: '',
//     isGroup: false,
//     lastMessage:{ content:'', user: { id:'', userName:'' } }, // or null
//     hasNotification:false,
//     notifications:[
//         {
//             content: '',
//             from: '' // userName
//         },
//     ]
// }

const initialRooms = [];

function roomReducer(state, action) {
    switch (action.type) {

        // add a array of room objects
        case 'SET_ROOMS':
            return [
                ...state,
                ...action.payload
            ]

        // reset rooms
        case 'RESET_ROOMS':
            return [
                ...action.payload
            ]

        // update some information of the current rooms
        case 'UPDATE_ROOMS':
            return [
                ...action.payload
            ]

        // add a single room object
        case 'APPEND_ROOM':
            return [
                ...state,
                { ...action.payload }
            ]

        default:
            console.log("invalid action");
            break;
    }
}

export { initialRooms, roomReducer };