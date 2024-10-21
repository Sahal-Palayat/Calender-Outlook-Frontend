import Cookies from "js-cookie";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";

export default async function VerifyService() {
    try {
        const token = Cookies.get("token")
        await axiosInstance.get(`/manager/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) as AxiosResponse<{
            message: string;
        }>
        return { message: "Verified Successfully" }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}