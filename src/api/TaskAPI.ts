import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project["_id"]
    taskId: Task["_id"]
    status: Task["status"]
}
export async function createTask({formData, projectId}: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getTaskById({taskId, projectId}: Pick<TaskAPI, "taskId" | "projectId">) {
    try {
        const {data} = await api(`/projects/${projectId}/tasks/${taskId}`)
        const response = taskSchema.safeParse(data)
        if (response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateTask({taskId, projectId, formData}: Pick<TaskAPI, "taskId" | "projectId" | "formData">) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}/tasks/${taskId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data.error)
        }
    }
}
export async function deleteTask({taskId, projectId}: Pick<TaskAPI, "taskId" | "projectId">) {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateStatus({taskId, projectId, status}: Pick<TaskAPI, "taskId" | "projectId" | "status">) {
    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks/${taskId}/status`, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}