import * as React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
})


export default function LoginComponent() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue dark:text-blue-light">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            actions.setSubmitting(false)
          }}
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
              <Button type="submit" className="w-full bg-blue text-white hover:bg-blue-dark dark:bg-blue-light dark:text-black dark:hover:bg-blue">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}
