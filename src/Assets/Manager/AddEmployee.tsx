import * as React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const AddEmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Required"),
  profileImage: Yup.mixed().required("Required"),
})

export default function AddEmployeeComponent() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)

  const handleSubmit = (values: any) => {
    console.log("Add Employee:", values)
    // Implement add employee logic here
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>Enter employee details to create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "", mobile: "", profileImage: null }}
          validationSchema={AddEmployeeSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Field name="name" as={Input} id="name" placeholder="John Doe" />
                {errors.name && touched.name ? <div className="text-red text-sm mt-1">{errors.name}</div> : null}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Field name="email" as={Input} id="email" placeholder="name@example.com" />
                {errors.email && touched.email ? <div className="text-red text-sm mt-1">{errors.email}</div> : null}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red text-sm mt-1">{errors.password}</div>
                ) : null}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Field
                  name="confirmPassword"
                  as={Input}
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-red text-sm mt-1">{errors.confirmPassword}</div>
                ) : null}
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Field name="mobile" as={Input} id="mobile" placeholder="1234567890" />
                {errors.mobile && touched.mobile ? <div className="text-red text-sm mt-1">{errors.mobile}</div> : null}
              </div>
              <div>
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    className="hidden"
                  />
                  <Label htmlFor="profileImage" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-blue text-white px-4 py-2 rounded-md">
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                    </div>
                  </Label>
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                  )}
                </div>
                {errors.profileImage && touched.profileImage ? (
                  <div className="text-red text-sm mt-1">{errors.profileImage}</div>
                ) : null}
              </div>
              <Button type="submit" className="w-full">Add Employee</Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}