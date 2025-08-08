
import ForgotPasswordForm from "@/components/auth/ForgotPassForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'CashTrakr - Olvidé mi Password',
    description: 'CashTrakr - Olvidé mi Password',
    keywords: 'Nextjs, Tailwindcss'
}

export default function ForgotPassPage() {
    console.log('Register page');
    return (
        <>
            <h1 className="font-black text-6xl text-purple-600">¿Olvidaste tu Contraseña?</h1>
            <p className="text-3xl font-bold">Aquí puedes <span className="text-amber-500">Reestablecerla</span></p>
            <ForgotPasswordForm />
            <nav className="mt-10 flex flex-col space-y-10">
                <Link
                    href='/auth/register'
                    className="text-center text-gray-500"
                >
                    ¿No tienes una cuenta? Crea una
                </Link>
                <Link
                    href='/auth/login'
                    className="text-center text-gray-500"
                >
                    ¿Ya tienes una cuenta? Iniciar Sesión
                </Link>
            </nav>
        </>
    )
}
