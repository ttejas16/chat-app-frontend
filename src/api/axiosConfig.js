import axios from "axios";

const URL = "http://localhost:3000/api/v1";

const instance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default instance;