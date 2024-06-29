import { Task } from "./task";

export interface List {
    id: number;
    title: string;
    tasks: Task[];
    projectId: number;
}
