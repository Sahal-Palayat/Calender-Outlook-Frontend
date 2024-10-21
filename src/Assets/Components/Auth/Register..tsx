import * as React from "react"
import { Formik, Form, Field } from "formik"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useRegister, { SignupSchema } from "@/Hooks/Manager/useRegister"

export default function RegisterComponent() {
    const {
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        otp,
        setOtp,
        profilePreview,
        handleSignup,
        verifyOtp,
        handleImageChange,
        id,
        setId
    } = useRegister()

    return (
        <div className="min-h-screen pt-3 flex items-center justify-center bg-gray-100 text-foreground">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">Sign Up</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{ email: "", password: "", confirmPassword: "", profileImage: null, name: "" }}
                        validationSchema={SignupSchema}
                        onSubmit={handleSignup}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Name</Label>
                                    <Field
                                        as={Input}
                                        id="name"
                                        name="name"
                                        type="name"
                                        className="border-input"
                                    />
                                    {errors.name && touched.name ? <div className="text-destructive">{errors.name}</div> : null}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="border-input"
                                    />
                                    {errors.email && touched.email ? <div className="text-destructive">{errors.email}</div> : null}
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className="border-input pr-10"
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
                                    {errors.password && touched.password ? <div className="text-destructive">{errors.password}</div> : null}
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="border-input pr-10"
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
                                        <div className="text-destructive">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <Label htmlFor="profileImage">Profile Image</Label>
                                    <Input
                                        id="profileImage"
                                        name="profileImage"
                                        type="file"
                                        accept="image/*"
                                        className="border-input"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setFieldValue("profileImage", event.currentTarget.files?.[0])
                                            handleImageChange(event)
                                        }}
                                    />
                                    {errors.profileImage && touched.profileImage ? (
                                        <div className="text-destructive">{errors.profileImage}</div>
                                    ) : null}
                                    {profilePreview && (
                                        <div className="mt-2">
                                            <img src={profilePreview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                                        </div>
                                    )}
                                </div>
                                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
                <Dialog open={id ? true : false} onOpenChange={()=>setId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter OTP</DialogTitle>
                            <DialogDescription>We've sent a one-time password to your email. Please enter it below.</DialogDescription>
                        </DialogHeader>
                        <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="border-input"
                        />
                        <Button onClick={verifyOtp} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Verify OTP
                        </Button>
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    )
}