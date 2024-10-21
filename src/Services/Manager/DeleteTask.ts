import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export default async function DeleteTaskService(id: string): Promise<{ message: string; }> {
    try {
        await axiosInstance.delete(`/manager/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }) as AxiosResponse<{
            message: string;
        }>
        return { message: "Task Deleted SuccessFully" }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}