/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser, getMe, login } from "@/services/auth.api"
import type { IUser } from "@/types/auth.types";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner";

export const useCreateUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: IUser) => createUser(payload),
        onSuccess: () => {
            navigate("/login")
            toast.success("User created successfully. Please login.")
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        }
    })
}

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: Partial<IUser>) => login(payload),
        onSuccess: () => {
            navigate("/")
            toast.success("User logged in successfully.")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
        }
    })
}

export const useGetMe = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getMe(),
    });
}