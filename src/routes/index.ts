import App from "@/App";
import Budget from "@/pages/Budget";
import Exam from "@/pages/Exam";
import ExamPage from "@/pages/ExamPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Schedules from "@/pages/Schedules";
import { withAuthRoute } from "@/utils/withAuthRoute";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "schedules",
                Component: withAuthRoute(Schedules)
            },
            {
                path: "budget",
                Component: withAuthRoute(Budget)
            },
            {
                path: "exam",
                Component: withAuthRoute(Exam)
            },
            {
                path: "exam/:id",
                Component: withAuthRoute(ExamPage)
            },
        ]
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/login",
        Component: Login
    },
])