import type { examSchema } from "@/components/modules/Exam/GenerateExam"
import type { ExamAnswer } from "@/pages/ExamPage";
import { axiosInstance } from "@/utils/axios"
import type z from "zod"

export const generateExam = async (payload: z.infer<typeof examSchema>) => {
    const { data } = await axiosInstance.post(`/exam/generate`, payload);
    return data
}


export const loadExamQuestion = async (examId: string) => {
    const { data } = await axiosInstance.get(`/exam/load-question/${examId}`,);
    return data
}


export const submitExam = async ({ examId, payload }: { examId: string, payload: ExamAnswer[] }) => {
    const { data } = await axiosInstance.patch(`/exam/submit/${examId}`, payload);
    return data
}


export const prevExam = async () => {
    const { data } = await axiosInstance.get("/exam")
    return data
}

export const prevExamDetails = async (examId: string) => {
    const { data } = await axiosInstance.get(`/exam/${examId}`)
    return data
}