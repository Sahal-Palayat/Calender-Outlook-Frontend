import axios from "axios";
// import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL || "http://localhost:7000",
    withCredentials:true,
});

export default axiosInstance;
