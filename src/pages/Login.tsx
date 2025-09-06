import Logo from "@/assets/Icons/Logo"
import { Link } from "react-router"
import loginImage from "@/assets/images/login.jpg"
import { LoginForm } from "@/components/modules/auth/LoginForm"

export default function Login() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <img
                    src={loginImage}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to={"/"} className="flex items-center gap-2 font-medium">
                        <Logo />Student life toolkit
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
