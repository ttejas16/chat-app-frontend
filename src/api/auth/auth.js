import instance from "../axiosConfig";


async function login({ email, password }) {

    try {
        const { data } = await instance.post("/auth/login", {
            email: email,
            password: password
        });

        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

async function logout(){

    try {
        const { data } = await instance.post("/auth/logout");
        
        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

async function signup({ email, password, userName }) {
    try {
        const { data } = await instance.post("/auth/signup", {
            email: email,
            password: password,
            userName: userName
        });
        return data;

    } catch (err) {
        return err.response?.data;
    }
}

async function getUser(){
    try {
        const { data } = await instance.post("/auth/getUser");
        return data;

    } catch (err) {
        console.log(err);
        return err.response?.data;
    }
}

export { login, logout, signup, getUser };