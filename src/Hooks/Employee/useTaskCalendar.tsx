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
import EmployeeGetTaskService from "@/Services/Employee/GetTasks";

export const priorityOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
];


export const timeSlots = Array.from({ length: 24 }, (_, i) => i);

export default function useTaskCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
    const navigate = useNavigate()


    async function getTasks() {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await EmployeeGetTaskService()
                setTasks(res.tasks)
            } catch (e) {
                navigate("/employee/login")
            }
        } else navigate('employee/login')
    }

    async function updateTaskStatus(id:string,status:string) {

    }

    useEffect(() => {
        getTasks()
    }, [])


    const getTaskPosition = (task: ITasks) => {
        const startMinutes = new Date(task.start).getHours() * 60 + new Date(task.start).getMinutes();
        const endMinutes = new Date(task.end).getHours() * 60 + new Date(task.end).getMinutes();
        const top = (startMinutes / 1440) * 100;
        const height = ((endMinutes - startMinutes) / window.innerHeight) * 100;
        return {
            top: `${top}%`, height: `${Math.max(height, 60)}px`
        };
    };


    return {
        tasks,
        weekStart,
        weekDays,
        handlePrevWeek,
        handleNextWeek,
        getTaskPosition,
        updateTaskStatus
    }
}
