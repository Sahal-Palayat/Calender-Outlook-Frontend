import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import ITasks from "@/Interfaces/Task";

export default async function EditTaskService(data: ITasks): Promise<{ message: string; task: ITasks; }> {
    try {
        const res = await axiosInstance.put(`/manager/tasks/${data._id}`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }) as AxiosResponse<{
            message: string;
            task: ITasks
        }>
        return { message: "Task Added SuccessFully", task: res.data.task }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}