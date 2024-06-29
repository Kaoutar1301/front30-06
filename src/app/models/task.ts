import { Comments } from "./comment";

export interface Task {
    id: number;
    title: string;
    description: string;
    comments: Comments[];
}