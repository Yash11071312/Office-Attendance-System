import axios from "axios";

const api = axios.create({
  baseURL: "https://office-attendance-system-zp4v.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("REQUEST URL:", config.baseURL + config.url);

  return config;
});

export default api;