export default interface IUser {
    name: string;
    email: string;
    password: string;
    profile: string | File;
    managerId?: string;
    role: "employee" | "manager";
    position?: string;
    _id:string;
    otp:string;
    
}


export interface ILoginResponse {
    user: IUser;
    message:string;
}