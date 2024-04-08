import axios from "axios";
import instance from "../axiosConfig";

async function updateProfile({ file, userName, status }) {
  // console.log(file);
  const formData = new FormData();
  formData.append("avatar", file);
  // formData.append("userName", userName);
  // formData.append("status", status);
  // console.log(formData);

  try {
    const { data } = await instance.post("/auth/updateProfile", formData,
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