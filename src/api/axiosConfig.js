import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default instance;