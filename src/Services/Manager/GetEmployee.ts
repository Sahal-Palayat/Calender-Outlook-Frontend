import Cookies from "js-cookie";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import IUser from "@/Interfaces/Auth";

export default async function GetEmployeeService() {
    try {
        const token = Cookies.get("token")
        const res = await axiosInstance.get(`/manager/employee`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) as AxiosResponse<{
            message: string;
            employees: IUser[]
        }>
        return { message: "Verified Successfully", employees: res.data.employees }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}