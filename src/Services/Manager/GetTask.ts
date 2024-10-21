import Cookies from "js-cookie";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import ITasks from "@/Interfaces/Task";
import IUser from "@/Interfaces/Auth";

export default async function GetTaskService() {
    try {
        const token = Cookies.get("token")
        const res = await axiosInstance.get(`/manager/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) as AxiosResponse<{
            message: string;
            tasks: ITasks[];
            employees: IUser[]
        }>
        return { message: "Verified Successfully", tasks: res.data.tasks, employees: res.data.employees }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}