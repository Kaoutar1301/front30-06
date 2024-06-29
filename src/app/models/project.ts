import { List } from "./lists";

export interface Project {
    id: number;
    title: string;
    description: string;
    lists: List[];
}
