import axios from "axios";

export const authAPI = axios.create({
  baseURL: "https://reskillinghenrique.auth.us-east-1.amazoncognito.com",
});
