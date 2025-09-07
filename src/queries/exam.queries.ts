/* eslint-disable @typescript-eslint/no-explicit-any */
import type { examSchema } from "@/components/modules/Exam/GenerateExam"
import { queryClient } from "@/main";
import type { ExamAnswer } from "@/pages/ExamPage";
import { generateExam, loadExamQuestion, submitExam } from "@/services/exam.api";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod"

interface IProps<T> {
    data: T;
    setOpen: (open: boolean) => void;
    reset: () => void;
}

export const useGenerateExam = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ data }: IProps<z.infer<typeof examSchema>>) => generateExam(data),
        onSuccess: (_data, variables) => {
            console.log(_data);
            queryClient.invalidateQueries({ queryKey: ["examAttempt"] })
            toast.success(`exam generated successfully.`)
            variables.setOpen(false)
            variables.reset()
            navigate(`/exam/${_data?.data?.examAttempt}`)
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}
export const useSubmitExam = () => {
    return useMutation({
        mutationFn: (data: { examId: string, payload: ExamAnswer[] }) => submitExam(data),
        onSuccess: (_data) => {
            console.log(_data);
            queryClient.invalidateQueries({ queryKey: ["examAttempt"] })
            toast.success(`exam submitted successfully.`)
            // TODO: navigate to the result page
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}


export const useGetExamQuestion = (examId: string) => {
    return useQuery({
        queryKey: ["budgets"],
        queryFn: () => loadExamQuestion(examId),
        staleTime: 1000 * 60 * 5
    })
}
