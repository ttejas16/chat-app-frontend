import axios from "axios";

const instance = axios.create({
    baseURL: "https://sttacked-backend.onrender.com/api/v1/",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default instance;