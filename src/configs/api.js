import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-rb-lyvt.onrender.com", // or your backend URL
  headers: { "Content-Type": "application/json" },
});

export default api;
