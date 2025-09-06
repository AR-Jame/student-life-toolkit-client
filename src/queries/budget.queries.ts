/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryClient } from "@/main";
import { addBudget, getBudgets, getBudgetsByType, getBudgetSummary } from "@/services/budget.api";
import type { IBudget } from "@/types/budget.type";
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";

interface IProps<T> {
    data: Partial<T>;
    setOpen: (open: boolean) => void;
    reset: () => void;
}

export const useBudget = () => {
    return useMutation({
        mutationFn: ({ data }: IProps<IBudget>) => addBudget(data),
        onSuccess: (_data, variables: IProps<IBudget>) => {
            queryClient.invalidateQueries({ queryKey: ["budgets"] })
            toast.success(`${_data?.data?.type} added successfully.`)
            variables.setOpen(false)
            variables.reset()
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        },
    })
}


export const useGetBudgets = () => {
    return useQuery({
        queryKey: ["budgets"],
        queryFn: () => getBudgets(),
        staleTime: 1000 * 60 * 5
    })
}

export const useGetBudgetsByType = (query: "Income" | "Expense") => {
    return useQuery({
        queryKey: ["budgets", query],
        queryFn: () => getBudgetsByType(query),
        staleTime: 1000 * 60 * 5
    })
}


export const useGetBudgetSummary = (query: boolean) => {
    return useQuery({
        queryKey: ["budgets", query],
        queryFn: () => getBudgetSummary(query),
        staleTime: 1000 * 60 * 5
    })
}