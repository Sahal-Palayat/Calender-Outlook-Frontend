import IUser from "@/Interfaces/Auth";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export default async function AddEmployeeService({ email, password, name, profile }: IUser): Promise<{ message: string; }> {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", profile);
        await axiosInstance.post("/manager/employee", formData,{
            headers:{
                Authorization:`Bearer ${Cookies.get("token")}`
            }
        }) as AxiosResponse<{
            message: string;
        }>
        return { message: "Employee Added SuccessFully" }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}