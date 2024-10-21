import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import ITasks, { IUploadTasks } from "@/Interfaces/Task";

export default async function AddTaskService(data: IUploadTasks): Promise<{ message: string; task: ITasks; }> {
    try {
        const res = await axiosInstance.post("/manager/tasks", data, {
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