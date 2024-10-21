import RegisterService from "@/Services/Manager/Register";
import * as React from "react"
import * as Yup from "yup"
import { toast } from "sonner"
interface Values {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Too Short!").required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    profileImage: Yup.mixed().required("Profile image is required"),
    name: Yup.string().required("")
})

export default function useRegister() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [otpSent, setOtpSent] = React.useState(false)
    const [otp, setOtp] = React.useState("")
    const [profileImage, setProfileImage] = React.useState<File | null>(null)
    const [profilePreview, setProfilePreview] = React.useState<string | null>(null)

    const handleSignup = async (values: Values) => {
        let id = toast.loading("Loading Please Wait")
        alert(id)
        try {
            const response = await RegisterService({...values,profile:profileImage} as any);
            console.log(response)
            toast.success(response.message, {
                id
            })
        } catch (e:any) {
            toast.success(e.message, {
                id
            })
        }
    }

    const verifyOtp = () => {
        console.log("OTP verified:", otp)
        setOtpSent(false)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setProfileImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return {
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        otpSent,
        setOtpSent,
        otp,
        setOtp,
        profileImage,
        profilePreview,
        handleSignup,
        verifyOtp,
        handleImageChange,
    }
}