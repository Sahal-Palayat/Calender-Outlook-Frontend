import RegisterService from "@/Services/Manager/Register";
import OTPService from "@/Services/Manager/OTP"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import VerifyService from "@/Services/Manager/Verify";
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
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [profilePreview, setProfilePreview] = useState<string | null>(null)
    const [id, setId] = useState<string | null>(null)
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    async function Verify() {
        const token = Cookies.get('token');
        if (token) {
            try {
                await VerifyService()
                navigate("/manager")
            } catch (e) {
                navigate("/manager/login")

            }
        }
    }

    useEffect(() => {
        Verify()
    }, [])
    const handleSignup = async (values: Values) => {
        let id = toast.loading("Loading Please Wait")
        try {
            const response = await RegisterService({ ...values, profile: profileImage } as any);
            toast.success(response.message, {
                id
            })
            setId(response.id)
        } catch (e: any) {
            toast.error(e.message, {
                id
            })
        }
    }

    const verifyOtp = async () => {
        const idx = toast.loading("Loading Please Wait")
        try {
            if (otp.length < 6) return toast.error("Invalid OTP", { id: idx });
            if (id) {
                const response = await OTPService({ otp, _id: id } as any);
                toast.success(response.message, { id: idx })
            }
            navigate("/manager/login")
        } catch (e: any) {
            toast.error(e.message, {
                id: idx
            })
        }
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
        id,
        setId,
        otp,
        setOtp,
        profileImage,
        profilePreview,
        handleSignup,
        verifyOtp,
        handleImageChange,
    }
}