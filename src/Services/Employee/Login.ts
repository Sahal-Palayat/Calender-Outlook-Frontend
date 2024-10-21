import IUser from "@/Interfaces/Auth";
import axiosInstance from "../Axios";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";

export default async function EmployeeLoginService({ email, password }: IUser): Promise<{ message: string; }> {
    try {
        const response = await axiosInstance.post("/auth/employee/login", { email, password }) as AxiosResponse<{
            message: string;
            user: IUser;
            token: string;
        }>
        Cookies.set("token", response.data.token);
        return { message: "Login successful" }
    } catch (e: any) {
        throw new Error(e.response.data.message)
    }
}