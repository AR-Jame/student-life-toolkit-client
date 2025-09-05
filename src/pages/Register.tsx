import Logo from "@/components/logo"
import { RegisterForm } from "@/components/modules/auth/RegisterForm"
import { Link } from "react-router"
import registerImage from "@/assets/images/signup.jpg"

export default function Register() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to={"/"} className="flex items-center gap-2 font-medium">
                        <Logo />Student life toolkit
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <img
                    src={registerImage}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}
