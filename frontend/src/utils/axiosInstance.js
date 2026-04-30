import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://prepai-backend-apa2.onrender.com/api",
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
