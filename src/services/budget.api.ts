import type { IBudget } from "@/types/budget.type"
import { axiosInstance } from "@/utils/axios"

export const addBudget = async (payload: Partial<IBudget>) => {
    const { data } = await axiosInstance.post("/budget", payload)
    return data
}



export const getBudgets = async () => {
    const { data } = await axiosInstance.get(`/budget`)
    return data
}

export const getBudgetsByType = async (query: "Income" | "Expense") => {
    console.log(query);
    const { data } = await axiosInstance.get(`/budget/type/${query}`)
    return data
}

export const getBudgetSummary = async (query: boolean) => {
    console.log(query);
    const { data } = await axiosInstance.get(`/budget/summary?${query}`)
    return data
}