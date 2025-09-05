/* eslint-disable @typescript-eslint/no-explicit-any */
import { addSchedule, addSubject, getSchedules, getSubjects } from "@/services/schedule.api";
import type { ISchedule, ISubject } from "@/types/schedules.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/main";

interface IProps<T> {
    data: Partial<T>;
    setOpen: (open: boolean) => void;
    reset: () => void;
}

export const useAddSubject = () => {
    return useMutation({
        mutationFn: ({ data }: IProps<ISubject>) => addSubject(data),
        onSuccess: (_data, variables: IProps<ISubject>) => {
            toast.success("Subject added successfully.")
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
            queryClient.invalidateQueries({ queryKey: ["subjects"] })
        },
    })
}

export const useGetSubjects = () => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => getSubjects(),
        staleTime: 1000 * 60 * 5
    })
}


export const useAddSchedule = () => {
    return useMutation({
        mutationFn: ({ data }: IProps<ISchedule>) => addSchedule(data),
        onSuccess: (_data, variables: IProps<ISchedule>) => {
            toast.success("Schedule added successfully.")
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
            queryClient.invalidateQueries({ queryKey: ["schedule"] })
        },
    })
}

export const useGetSchedules = () => {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: () => getSchedules(),
        staleTime: 1000 * 60 * 5
    })
}