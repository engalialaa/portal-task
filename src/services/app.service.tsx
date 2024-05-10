import axios from "axios";

let userInfo = localStorage.getItem("_user_info");

const token = userInfo ? JSON.parse(userInfo)?.token : null;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token,
  },
});
