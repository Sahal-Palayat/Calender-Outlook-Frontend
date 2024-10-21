import React from 'react'
import { format, parseISO } from "date-fns"
import { Formik, Form, Field, FieldArray } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface ITasks {
    title: string;
    description: string;
    managerId: string;
    employees: { id: string, status: "Pending" | "Completed" | "In Progress" }[];
    date: Date;
    start: Date;
    end: Date;
    completed: boolean;
    _id: string;
    priority: 1 | 2 | 3;
}

interface EditTaskDialogProps {
    task: ITasks | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: ITasks) => void;
    employees: { _id: string; name: string }[];
}

const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    date: Yup.date().required("Date is required"),
    start: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
        .required("Start time is required"),
    end: Yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
        .required("End time is required")
        .test("is-greater", "End time must be after start time", function (value) {
            const { start } = this.parent;
            return value > start; // Check if end time is after start time
        }),
    priority: Yup.number().required("Priority is required"),
    completed: Yup.boolean(),
})


const priorityOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
]

export default function EditTaskDialog({ task, isOpen, onClose, onSave, employees }: EditTaskDialogProps) {
    if (!task) return null
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        ...task,
                        date: format(task.date, "yyyy-MM-dd"),
                        start: format(task.start, "HH:mm"),
                        end: format(task.end, "HH:mm"),
                    }}
                    validationSchema={TaskSchema}
                    onSubmit={(values) => {
                        const date = parseISO(values.date);

                        const [startHours, startMinutes] = values.start.split(':').map(Number);
                        const [endHours, endMinutes] = values.end.split(':').map(Number);

                        const start = new Date(date);
                        start.setHours(startHours, startMinutes);

                        const end = new Date(date);
                        end.setHours(endHours, endMinutes);

                        onSave({
                            ...values,
                            date,
                            start,
                            end,
                        });
                        onClose();
                    }}

                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Field
                                    id="title"
                                    name="title"
                                    className="col-span-3"
                                    as={Input}
                                />
                                {errors.title && touched.title && (
                                    <div className="col-span-3 col-start-2 text-red-500 text-sm">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Field
                                    id="description"
                                    name="description"
                                    className="col-span-3"
                                    as={Textarea}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Field name="priority">
                                    {({ field }: any) => (
                                        <Select
                                            onValueChange={(value) => field.onChange({ target: { name: 'priority', value: Number(value) } })}
                                            defaultValue={field.value.toString()}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select a priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorityOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value.toString()}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </Field>
                            </div>

                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right">Employees</Label>
                                <FieldArray name="employees">
                                    {({ push, remove }) => (
                                        <div className="col-span-3">
                                            {employees.map((employee) => (
                                                <div key={employee._id} className="flex mb-3 items-center space-x-2">
                                                    <Checkbox
                                                        id={`employee-${employee._id}`}
                                                        checked={values.employees.some(e => e.id === employee._id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                push({ id: employee._id, status: "Pending" })
                                                            } else {
                                                                const idx = values.employees.findIndex(e => e.id === employee._id)
                                                                remove(idx)
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor={`employee-${employee._id}`}>{employee.name}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>

                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start" className="text-right">
                                    Start Time
                                </Label>
                                <Input
                                    id="start"
                                    name="start"
                                    className="col-span-3"
                                    type="time"
                                    value={values.start}
                                    onChange={(e) => setFieldValue('start', e.target.value)}
                                />

                                {errors.start && touched.start && (
                                    <div className="col-span-3 col-start-2 text-red-500 text-sm">
                                        {errors.start}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end" className="text-right">
                                    End Time
                                </Label>
                                <Input
                                    id="end"
                                    name="end"
                                    className="col-span-3"
                                    type="time"
                                    value={values.end}
                                    onChange={(e) => setFieldValue('end', e.target.value)}
                                />

                                {errors.end && touched.end && (
                                    <div className="col-span-3 col-start-2 text-red-500 text-sm">
                                        {errors.end}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="completed" className="text-right">
                                    Completed
                                </Label>
                                <Field name="completed">
                                    {({ field }: any) => (
                                        <Checkbox
                                            id="completed"
                                            checked={field.value}
                                            onCheckedChange={(checked) => setFieldValue('completed', checked)}
                                        />
                                    )}
                                </Field>

                            </div>

                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}