import Cookies from "js-cookie";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";

export default async function DeleteEmployeeService(id:string) {
    try {
        const token = Cookies.get("token")
        await axiosInstance.delete(`/manager/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) as AxiosResponse<{
            message: string;
        }>
        return { message: "Deleted Successfully" }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}