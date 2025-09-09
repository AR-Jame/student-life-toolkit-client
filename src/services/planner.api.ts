import type { milestoneSchema } from "@/components/modules/planner/AddMilestone";
import type { plannerSchema } from "@/components/modules/planner/AddPlanner";
import type { taskSchema } from "@/components/modules/planner/AddTask";
import { axiosInstance } from "@/utils/axios"
import type z from "zod";

export const getPlanners = async () => {
    const { data } = await axiosInstance.get(`/planner`);
    return data
}


export const addPlanner = async (payload: z.infer<typeof plannerSchema>) => {
    const { data } = await axiosInstance.post(`/planner/add-planner`, payload);
    return data
}

export const addMilestone = async ({ payload, plannerId }: { payload: z.infer<typeof milestoneSchema>, plannerId: string }) => {
    const { data } = await axiosInstance.patch(`/planner/add-milestone/${plannerId}`, payload);
    return data
}

export const addTask = async ({ payload, plannerId, milestoneId }: { payload: z.infer<typeof taskSchema>, plannerId: string, milestoneId: string }) => {
    const { data } = await axiosInstance.patch(`/planner/add-task/${plannerId}/${milestoneId}`, payload);
    return data
}

export const toggleTask = async ({ plannerId, milestoneId, taskId }: { plannerId: string, milestoneId: string, taskId: string }) => {
    const { data } = await axiosInstance.patch(`/planner/toggle-task/${plannerId}/${milestoneId}/${taskId}`);
    return data
}