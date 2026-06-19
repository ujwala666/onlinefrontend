import axios from "axios";

const api = axios.create({
  baseURL: "https://onlinebackend-wv8o.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;