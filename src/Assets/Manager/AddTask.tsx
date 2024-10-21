import { format, parseISO, setHours, setMinutes } from "date-fns"
import { Formik, Form, Field } from "formik"
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
import { Dispatch, SetStateAction } from "react"

interface Employee {
    _id: string;
    name: string;
}

interface AddTaskDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: any) => void;
    selectedDate: Date | null;
    employees: Employee[];
    selectedEmployees: string[];
    setSelectedEmployees: Dispatch<SetStateAction<string[]>>
    showEmployeeSelection: boolean;
    setShowEmployeeSelection: Dispatch<SetStateAction<boolean>>;
}

const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    date: Yup.date().required("Date is required"),
    start: Yup.string().required("Start time is required"),
    end: Yup.string()
        .required("End time is required")
        .test('is-after-start', 'End time must be after start time', function (end) {
            const { start } = this.parent;
            if (start && end) {
                return end > start;
            }
            return true;
        }),
    priority: Yup.number().required("Priority is required"),
    assignTo: Yup.string().required("Assignment option is required"),
    employees: Yup.array().of(Yup.string()),
})

const priorityOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
]

export default function AddTaskDialog({ isOpen, onClose, onAddTask, selectedDate, employees, selectedEmployees, setSelectedEmployees, setShowEmployeeSelection, showEmployeeSelection }: AddTaskDialogProps) {


    const handleEmployeeChange = (employeeId: string) => {
        setSelectedEmployees(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Create a new task for{" "}
                        {selectedDate
                            ? format(selectedDate, "MMMM d, yyyy")
                            : "the selected date"}.
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
                        start: "09:00",
                        end: "17:00",
                        priority: 1,
                        assignTo: "myself",
                        employees: [],
                    }}
                    validationSchema={TaskSchema}
                    onSubmit={(values, { resetForm }) => {
                        const date = parseISO(values.date);
                        const [startHours, startMinutes] = values.start.split(':').map(Number);
                        const [endHours, endMinutes] = values.end.split(':').map(Number);

                        const task = {
                            _id: Date.now().toString(),
                            ...values,
                            date: date,
                            start: setMinutes(setHours(date, startHours), startMinutes),
                            end: setMinutes(setHours(date, endHours), endMinutes),
                            managerId: "manager-id",
                            employees: showEmployeeSelection ? selectedEmployees.map(id => ({ id, status: "Pending" })) : [],
                            completed: false,
                        };

                        onAddTask(task);
                        resetForm();
                        setSelectedEmployees([]);
                        setShowEmployeeSelection(false);
                        onClose();
                    }}
                >
                    {({ errors, touched }) => (
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

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="assignTo" className="text-right">
                                    Assign To
                                </Label>
                                <Field name="assignTo">
                                    {({ field }: any) => (
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange({ target: { name: 'assignTo', value } })
                                                setShowEmployeeSelection(value === "selected")
                                                if (value === "all") {
                                                    setSelectedEmployees([...employees.map((val) => val._id)])
                                                }
                                                if (value === "myself") {
                                                    setSelectedEmployees([])
                                                }
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select who to assign" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="myself">Myself</SelectItem>
                                                <SelectItem value="all">All Employees</SelectItem>
                                                <SelectItem value="selected">Selected Employees</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </Field>
                            </div>

                            {showEmployeeSelection && (
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right">Employees</Label>
                                    <div className="col-span-3">
                                        {employees.map((employee) => (
                                            <div key={employee._id} className="flex items-center mb-3 space-x-2">
                                                <Checkbox
                                                    id={`employee-${employee._id}`}
                                                    checked={selectedEmployees.includes(employee._id)}
                                                    onCheckedChange={() => handleEmployeeChange(employee._id)}
                                                />
                                                <Label htmlFor={`employee-${employee._id}`}>{employee.name}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start" className="text-right">
                                    Start Time
                                </Label>
                                <Field
                                    id="start"
                                    name="start"
                                    className="col-span-3"
                                    type="time"
                                    as={Input}
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
                                <Field
                                    id="end"
                                    name="end"
                                    className="col-span-3"
                                    type="time"
                                    as={Input}
                                />
                                {errors.end && touched.end && (
                                    <div className="col-span-3 col-start-2 text-red-500 text-sm">
                                        {errors.end}
                                    </div>
                                )}
                            </div>

                            <DialogFooter>
                                <Button type="submit">Save Task</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}