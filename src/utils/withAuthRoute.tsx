import { useGetMe } from "@/queries/auth.queries";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuthRoute = (Component: ComponentType) => {
    return function AuthWrapper() {
        const { data, isLoading } = useGetMe();

        if(isLoading){
            return <p>Loading</p>
        }
        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />;
        }
        return <Component />;
    };
};