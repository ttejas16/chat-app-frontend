import axios from "axios";
import instance from "../axiosConfig";

async function updateProfile({ avatar, userName, status }) {

  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("userName", userName);
  formData.append("status", status);

  try {
    const { data } = await instance.put("/auth/updateProfile", formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

    return data;

  } catch (err) {
    console.log(err);
    return err.response?.data;
  }
}

export { updateProfile };