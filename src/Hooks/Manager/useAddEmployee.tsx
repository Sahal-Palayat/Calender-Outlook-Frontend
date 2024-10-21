import * as Yup from "yup"
import AddEmployeeService from "@/Services/Manager/AddEmployee"
import { toast } from "sonner"
import VerifyService from "@/Services/Manager/Verify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { FormikHelpers } from "formik"

const AddEmployeeSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Too Short!").required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    profileImage: Yup.mixed().required("Required"),
})

export default function useAddEmployee() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleSubmit = async (values: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        profileImage: File | null
    }, actions: FormikHelpers<{
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        profileImage: null;
    }>) => {
        const id = toast.loading("Loading Please Wait")
        try {
            const res = await AddEmployeeService({ ...values } as any)
            toast.success(res.message, { id })
            actions.resetForm()
        } catch (e: any) {
            toast.error(e.message, { id })
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.currentTarget.files?.[0]
        if (file) {
            setFieldValue("profileImage", file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    async function Verify() {
        const token = Cookies.get('token');
        if (token) {
            try {
                await VerifyService()
            } catch (e) {
                navigate("/manager/login")
            }
        } else navigate('manager/login')
    }


    useEffect(() => {
        Verify()
    }, [])


    return { Verify, handleImageChange, handleSubmit, showPassword, setShowPassword, setPreviewImage, previewImage, AddEmployeeSchema }
}