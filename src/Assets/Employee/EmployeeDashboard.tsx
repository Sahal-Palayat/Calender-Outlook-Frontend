import { useState } from 'react'
import { format, isSameDay, parseISO } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import useTaskCalendar, { timeSlots } from "@/Hooks/Employee/useTaskCalendar"
import ITasks from '@/Interfaces/Task'
import useUser from '@/Hooks/useUser'

export default function EmployeeDashboardComponent() {
    const {
        tasks,
        weekStart,
        weekDays,
        handlePrevWeek,
        handleNextWeek,
        getTaskPosition,
        updateTaskStatus,
    } = useTaskCalendar()

    const [selectedTask, setSelectedTask] = useState<ITasks | null>(null)

    const getTaskColor = (priority: number) => {
        switch (priority) {
            case 1: return 'bg-blue-500'
            case 2: return 'bg-yellow-500'
            case 3: return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }
    const { user } = useUser()
    const handleTaskClick = (task: ITasks) => {
        setSelectedTask(task)
    }

    const handleStatusChange = (newStatus: "Pending" | "Completed" | "In Progress") => {
        if (selectedTask) {
            updateTaskStatus(selectedTask._id, newStatus)
            setSelectedTask({
                ...selectedTask, employees: [...selectedTask.employees].map((val) => {
                    if (val.id === user?._id) return { ...val, status: newStatus }
                    return val
                })
            })
        }
    }

    return (
        <div className="container mx-auto p-6 bg-background text-foreground">
            <div className="container mx-auto p-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-primary">Employee Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Button onClick={handlePrevWeek} variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold">
                            {format(weekStart, "MMMM d, yyyy")}
                        </span>
                        <Button onClick={handleNextWeek} variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-8 gap-4 min-w-[960px]">
                    <div className="col-span-1 mt-14 min-w-[60px]">
                        {timeSlots.map((hour) => (
                            <div
                                key={hour}
                                className="h-12 border-b border-border text-sm text-muted-foreground pl-2"
                            >
                                {format(new Date().setHours(hour, 0, 0, 0), "h a")}
                            </div>
                        ))}
                    </div>
                    {weekDays.map((day) => (
                        <div
                            key={day.toISOString()}
                            className="col-span-1 border-l border-border relative min-w-[120px]"
                        >
                            <div className="text-sm font-semibold text-center sticky top-0 z-10 bg-background p-2">
                                {format(day, "EEE d")}
                            </div>
                            <div className="relative h-full">
                                {timeSlots.map((hour) => (
                                    <div key={hour} className="h-12 border-b border-border"></div>
                                ))}
                                {tasks
                                    .filter((task) => isSameDay(parseISO(task.date.toString()), day))
                                    .map((task) => (
                                        <div
                                            key={task._id}
                                            className={`absolute w-full min-w-[120px] h-full z-20 cursor-pointer overflow-hidden rounded-md bg-[#222] shadow-sm ${getTaskColor(task.priority)}`}
                                            style={getTaskPosition(task)}
                                            onClick={() => handleTaskClick(task)}
                                        >
                                            <div className="p-1 h-full flex flex-col justify-between">
                                                <p className="text-xs font-medium text-[#fff] truncate">
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-white">
                                                    {format(new Date(task.start), "hh:mm a")} - {format(new Date(task.end), "hh:mm a")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedTask?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Description</Label>
                            <p className="col-span-3">{selectedTask?.description}</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Date</Label>
                            <p className="col-span-3">{selectedTask && format(new Date(selectedTask.date), "MMMM d, yyyy")}</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Time</Label>
                            <p className="col-span-3">
                                {selectedTask && `${format(new Date(selectedTask.start), "h:mm a")} - ${format(new Date(selectedTask.end), "h:mm a")}`}
                            </p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Priority</Label>
                            <p className="col-span-3">{selectedTask?.priority}</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                onValueChange={handleStatusChange}
                                defaultValue={selectedTask?.employees.find(val=>val.id === user?._id)?.status}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setSelectedTask(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}