import { Comments } from "./comment";

export interface Task {
    id: number;
    title: string;
    description: string;
    categorie : string;
    dueDate: string;
    comments: Comments[];
}