import IUser from "@/Interfaces/Auth";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";

export default async function RegisterService({ email, password, name, profile }: IUser): Promise<{ message: string; id:string }> {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", profile);
        const res = await axiosInstance.post("/auth/manager/register", formData) as AxiosResponse<{
            message: string;
            id:string;
        }>
        return { message: res.data.message,id:res.data.id }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}