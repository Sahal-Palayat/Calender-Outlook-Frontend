import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL || "http://localhost:7000",
});

export default axiosInstance;
