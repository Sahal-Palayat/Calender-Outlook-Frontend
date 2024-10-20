
import * as React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Too Short!").required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
})

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [otpSent, setOtpSent] = React.useState(false)
    const [otp, setOtp] = React.useState("")

    const handleSignup = (values: any) => {
        console.log(values)
        setOtpSent(true)
    }

    const verifyOtp = () => {
        console.log("OTP verified:", otp)
        setOtpSent(false)
        // Handle successful signup here
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue dark:text-blue-light">Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={{ email: "", password: "", confirmPassword: "" }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSignup}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="border-blue dark:border-blue-light"
                                />
                                {errors.email && touched.email ? <div className="text-red">{errors.email}</div> : null}
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="border-blue dark:border-blue-light pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {errors.password && touched.password ? <div className="text-red">{errors.password}</div> : null}
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Field
                                        as={Input}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="border-blue dark:border-blue-light pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className="text-red">{errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <Button type="submit" className="w-full bg-blue text-white hover:bg-blue-dark dark:bg-blue-light dark:text-black dark:hover:bg-blue">
                                Sign Up
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
            <Dialog open={otpSent} onOpenChange={setOtpSent}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogDescription>We've sent a one-time password to your email. Please enter it below.</DialogDescription>
                    </DialogHeader>
                    <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="border-blue dark:border-blue-light"
                    />
                    <Button onClick={verifyOtp} className="w-full bg-blue text-white hover:bg-blue-dark dark:bg-blue-light dark:text-black dark:hover:bg-blue">
                        Verify OTP
                    </Button>
                </DialogContent>
            </Dialog>
        </Card>
    )
}