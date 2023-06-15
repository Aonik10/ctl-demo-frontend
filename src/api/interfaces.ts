import { Dayjs } from "dayjs";

export interface Task {
    title: string;
    description: string;
    date: Dayjs;
    completed: boolean;
    image: string;
}

export interface TaskResponse extends Task {
    id: number;
}

export interface TaskUpd {
    title?: string;
    description?: string;
    date?: Dayjs;
    completed?: boolean;
}

export interface TokenData {
    access_token: string;
    token_type: string;
}
