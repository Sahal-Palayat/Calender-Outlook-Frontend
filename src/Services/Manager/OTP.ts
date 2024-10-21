import IUser from "@/Interfaces/Auth";
import axiosInstance from "../Axios";
import { AxiosResponse } from "axios";

export default async function OTPService({ otp, _id }: IUser): Promise<{ message: string; }> {
    try {
        await axiosInstance.post(`/auth/manager/otp/${_id}`, { otp }) as AxiosResponse<{
            message: string;
        }>
        return { message: "Verified Successfully" }
    } catch (e: any) {
        return { message: e.response.data.message }
    }
}