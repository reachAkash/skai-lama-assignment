import axios from "axios";

// Create an Axios instance
const devMode = false;

const axiosInstance = axios.create({
  baseURL: devMode ? "http://localhost:4000" : import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
