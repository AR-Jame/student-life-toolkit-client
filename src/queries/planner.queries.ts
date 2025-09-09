/* eslint-disable @typescript-eslint/no-explicit-any */
import type { milestoneSchema } from "@/components/modules/planner/AddMilestone";
import type { plannerSchema } from "@/components/modules/planner/AddPlanner";
import type { taskSchema } from "@/components/modules/planner/AddTask";
import { queryClient } from "@/main";
import { addMilestone, addPlanner, addTask, getPlanners, toggleTask } from "@/services/planner.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";
import type z from "zod";

interface IProps<T> {
    data: T;
    plannerId?: string
    milestoneId?: string
    taskId?: string
    setOpen: (open: boolean) => void;
    reset: () => void;
}


export const useAddPlanner = () => {
    return useMutation({
        mutationFn: ({ data }: IProps<z.infer<typeof plannerSchema>>) => addPlanner(data),
        onSuccess: (_data, variables: IProps<z.infer<typeof plannerSchema>>) => {
            queryClient.invalidateQueries({ queryKey: ["planner"] })
            toast.success(`Goal added successfully.`)
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}

export const useAddMilestone = () => {
    return useMutation({
        mutationFn: ({ data, plannerId }: IProps<z.infer<typeof milestoneSchema>>) => addMilestone({ payload: data, plannerId: plannerId as string }),
        onSuccess: (_data, variables: IProps<z.infer<typeof milestoneSchema>>) => {
            queryClient.invalidateQueries({ queryKey: ["planner"] })
            toast.success(`Goal added successfully.`)
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}

export const useAddTask = () => {
    return useMutation({
        mutationFn: ({ data, plannerId, milestoneId }: IProps<z.infer<typeof taskSchema>>) => addTask({ payload: data, plannerId: plannerId as string, milestoneId: milestoneId as string }),
        onSuccess: (_data, variables: IProps<z.infer<typeof taskSchema>>) => {
            queryClient.invalidateQueries({ queryKey: ["planner"] })
            toast.success(`Goal added successfully.`)
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}

export const useToggleTask = () => {
    return useMutation({
        mutationFn: ({ plannerId, milestoneId, taskId }: { plannerId: string, milestoneId: string, taskId: string }) => toggleTask({ plannerId: plannerId as string, milestoneId: milestoneId as string, taskId: taskId as string }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planner"] })
            toast.success(`task toggled successfully.`)

        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}

export const useGetPlanner = () => {
    return useQuery({
        queryKey: ["planner"],
        queryFn: () => getPlanners(),
        staleTime: 1000 * 60 * 5
    })
}