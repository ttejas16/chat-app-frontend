import instance from "../axiosConfig";

async function addRoom({ userId, roomName, isGroup, participantIds = [] }) {
    try {
        const { data } = await instance.post("/chat/addRoom", {
            userId: userId,
            participants: participantIds,
            roomName: roomName,
            isGroup: isGroup
        })

        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

async function getRooms({ userId }) {
    try {
        const { data } = await instance.post("/chat/getRooms", {
            userId: userId
        });

        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

async function searchUsers({ email }) {
    try {
        const { data } = await instance.post("/chat/searchUsers", {
            email: email
        });

        return data;
    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

export { getRooms, searchUsers, addRoom };