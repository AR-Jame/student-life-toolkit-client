import type { ISchedule, ISubject } from "@/types/schedules.types"
import { axiosInstance } from "@/utils/axios"

export const addSubject = async (payload: Partial<ISubject>) => {
    const { data } = await axiosInstance.post("/schedule/subject", payload)
    return data
}

export const getSubjects = async () => {
    const { data } = await axiosInstance.get("/schedule/subject")
    return data?.data as ISubject[]
}


export const addSchedule = async (payload: Partial<ISchedule>) => {
    const { data } = await axiosInstance.post("/schedule", payload)
    return data;
}

export const getSchedules = async () => {
    const { data } = await axiosInstance.get("/schedule")
    return data?.data as ISchedule[]
}