import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:9000/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    const token = localStorage.getItem("token");
    if (token) req.headers["Authorization"] = `${token}`;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
