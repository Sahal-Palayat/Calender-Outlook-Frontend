import { format, isSameDay, parseISO } from "date-fns"
import { ChevronLeft, ChevronRight, Delete, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useTaskCalendar, { timeSlots } from "@/Hooks/Manager/useTaskCalendar"
import EditTaskDialog from "./EditTasks"
import AddTaskDialog from "./AddTask"

export default function TaskCalendar() {
    const {
        selectedDate,
        tasks,
        isAddingTask,
        weekStart,
        weekDays,
        handlePrevWeek,
        handleNextWeek,
        handleAddTask,
        handleDateClick,
        handleTaskClick,
        getTaskPosition,
        setIsAddingTask,
        employees,
        selectedTask,
        setSelectedTask,
        handleEdit,
        selectedEmployees,
        setSelectedEmployees,
        showEmployeeSelection,
        setShowEmployeeSelection,
        deleteTask
    } = useTaskCalendar()

    const getTaskColor = (priority: number) => {
        switch (priority) {
            case 1: return 'bg-blue-500'
            case 2: return 'bg-yellow-500'
            case 3: return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="container mx-auto p-6 bg-background text-foreground">
            <div className="container mx-auto p-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-primary">Task Calendar</h1>
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
                            onClick={() => handleDateClick(day)}
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
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleTaskClick(task)
                                            }}
                                        >
                                            <div className="p-1 h-full flex flex-col justify-between">
                                                <p className="text-xs flex justify-between font-medium text-[#fff] truncate">
                                                    {task.title}
                                                    <Button variant={"default"} onClick={(e) => {
                                                        e.stopPropagation()
                                                        deleteTask(task._id)
                                                    }} className="bg-red hover:bg-red text-white w-6 h-6" >
                                                        <Trash2 />
                                                    </Button>
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
            {selectedTask && (
                <EditTaskDialog
                    employees={employees}
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={handleEdit}
                    task={selectedTask}
                    key={selectedTask._id}
                />
            )}
            <AddTaskDialog
                isOpen={isAddingTask}
                onClose={() => setIsAddingTask(false)}
                onAddTask={handleAddTask}
                selectedDate={selectedDate}
                employees={employees}
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
                showEmployeeSelection={showEmployeeSelection}
                setShowEmployeeSelection={setShowEmployeeSelection}
            />
        </div>
    )
}