import { Task, TaskResponse, TaskUpd, TokenData } from "./interfaces";

export const SERVER_URL = "http://127.0.0.1:8000";

async function request(url: string, method: string, body: any = null, contentType = "application/json") {
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": contentType,
            Authorization: localStorage.token ? "Bearer " + localStorage.token : "",
        },
        body: body,
    });
    await wait(200);
    return response.json();
}

export async function getTasks(filter = "all"): Promise<TaskResponse[]> {
    let filterParam = "";
    switch (filter) {
        case "all":
            break;
        case "completed":
            filterParam = "?filter=true";
            break;
        case "pending":
            filterParam = "?filter=false";
            break;
    }
    return await request(SERVER_URL + "/tasks/" + filterParam, "GET");
}

export async function createTask(task: Task): Promise<TaskResponse> {
    return await request(SERVER_URL + "/tasks/", "POST", JSON.stringify(task));
}

export async function deleteTaskById(id: number): Promise<TaskResponse> {
    return await request(SERVER_URL + "/tasks/" + id, "DELETE");
}

export async function updateTaskById(id: number, body: TaskUpd): Promise<TaskResponse> {
    return await request(SERVER_URL + "/tasks/" + id, "PUT", JSON.stringify(body));
}

export async function get_token(body: any): Promise<TokenData> {
    const data = new URLSearchParams(body);
    return await request(SERVER_URL + "/token/", "POST", data, "application/x-www-form-urlencoded");
}

export async function login(body: any): Promise<any> {
    const response = await get_token(body);
    localStorage.setItem("token", response.access_token);
    return response;
}

export async function createAccount(body: any): Promise<any> {
    const response = await request(SERVER_URL + "/users/", "POST", JSON.stringify(body));
    return response;
}

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
