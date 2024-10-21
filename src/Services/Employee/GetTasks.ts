import Cookies from "js-cookie";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import ITasks from "@/Interfaces/Task";

export default async function EmployeeGetTaskService() {
    try {
        const token = Cookies.get("token")
        const res = await axiosInstance.get(`/employee/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) as AxiosResponse<{
            message: string;
            tasks: ITasks[];
        }>
        return { message: "Verified Successfully", tasks: res.data.tasks }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}