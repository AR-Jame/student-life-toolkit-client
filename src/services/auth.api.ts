import type { IUser } from "@/types/auth.types"
import { axiosInstance } from "@/utils/axios"

export const createUser = async (payload: Partial<IUser>) => {
    const { data } = await axiosInstance.post("/user/register", payload)
    return data
};

export const login = async (payload: Partial<IUser>) => {
    const { data } = await axiosInstance.post("/auth/login", payload)
    return data
};

export const getMe = async () => {
    const { data } = await axiosInstance.get("/user/me")
    return data
}