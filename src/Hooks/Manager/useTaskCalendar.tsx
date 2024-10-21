import { useEffect, useState } from "react";
import { addDays, startOfWeek } from "date-fns";
import IUser from "@/Interfaces/Auth";
import ITasks, { IUploadTasks } from "@/Interfaces/Task";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import AddTaskService from "@/Services/Manager/AddTask";
import GetTaskService from "@/Services/Manager/GetTask";
import EditTaskService from "@/Services/Manager/EditTask";
import DeleteTaskService from "@/Services/Manager/DeleteTask";

export const priorityOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
];


export const timeSlots = Array.from({ length: 24 }, (_, i) => i);

export default function useTaskCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ITasks | null>(null);
    const [assignTo, setAssignTo] = useState("myself");
    const [showEmployeeSelection, setShowEmployeeSelection] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const [employees, setEmployees] = useState<IUser[]>([])
    const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
    const navigate = useNavigate()



    const handleAddTask = async (newTask: IUploadTasks) => {
        console.log(newTask)
        const id = toast.loading("Adding please wait")
        try {
            const res = await AddTaskService({ ...newTask, employees: selectedEmployees, myself: selectedEmployees.length === 0 })
            toast.success(res.message, { id })
            setTasks([...tasks, res.task])
        } catch (e: any) {
            toast.error(e.message, { id })
        }
    };

    async function deleteTask(idx: string) {
        const id = toast.loading("Editing Please Wait")
        try {
            const res = await DeleteTaskService(idx)
            setTasks((prev) => prev.filter((value) => value._id!== idx))
            toast.success(res.message, { id })
        } catch (e: any) {
            toast.error(e.message, { id })
        }
    }


    async function handleEdit(task: ITasks) {
        const id = toast.loading("Editing Please Wait")
        try {
            const res = await EditTaskService(task)
            setTasks((prev) => {
                return prev.map((value) => {
                    if (value._id === task._id) return res.task;
                    return value
                })
            })
            toast.success(res.message, { id })
        } catch (e: any) {
            toast.error(e.message, { id })
        }
    }
    useEffect(() => {
        getEmployees()
    }, [])


    async function getEmployees() {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await GetTaskService()
                console.log(res)
                setEmployees(res.employees)
                setTasks(res.tasks)
            } catch (e) {
                navigate("/manager/login")
            }
        } else navigate('manager/login')
    }


    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsAddingTask(true);
    };

    const handleTaskClick = (task: ITasks) => {
        setSelectedTask(task);
    };

    const getTaskPosition = (task: ITasks) => {
        const startMinutes = new Date(task.start).getHours() * 60 + new Date(task.start).getMinutes();
        const endMinutes = new Date(task.end).getHours() * 60 + new Date(task.end).getMinutes();
        const top = (startMinutes / 1440) * 100;
        const height = ((endMinutes - startMinutes) / window.innerHeight) * 100;
        return {
            top: `${top}%`, height: `${Math.max(height, 60)}px`
        };
    };

    const handleEmployeeChange = (employeeId: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(employeeId)
                ? prev.filter((id) => id !== employeeId)
                : [...prev, employeeId]
        )
    }

    return {
        currentDate,
        selectedDate,
        tasks,
        isAddingTask,
        selectedTask,
        assignTo,
        selectedEmployees,
        weekStart,
        weekDays,
        handlePrevWeek,
        handleNextWeek,
        handleAddTask,
        handleDateClick,
        handleTaskClick,
        getTaskPosition,
        setIsAddingTask,
        setSelectedTask,
        setAssignTo,
        setSelectedEmployees,
        employees,
        getEmployees,
        setShowEmployeeSelection,
        showEmployeeSelection,
        handleEmployeeChange,
        handleEdit,
        deleteTask
    };
}
