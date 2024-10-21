export default interface ITasks {
    title: string;
    description: string;
    managerId: string;
    employees: { id: string, status: "Pending" | "Completed" | "In Progress" }[],
    date: Date;
    start: Date;
    end: Date;
    completed: boolean;
    _id: string;
    priority: 1 | 2 | 3
}

export interface IUploadTasks {
    title: string;
    description: string;
    employees: string[],
    date: Date;
    start: Date;
    end: Date;
    priority: 1 | 2 | 3;
    myself?: boolean
}