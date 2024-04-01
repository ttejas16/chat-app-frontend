import instance from "../axiosConfig";

async function getMessages({ roomId }) {
    try {
        const { data } = await instance.post("/chat/getMessages", {
            roomId: roomId
        });
        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

export { getMessages };