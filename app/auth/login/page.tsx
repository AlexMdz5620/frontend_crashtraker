import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'CashTrakr - Iniciar Sesión',
    description: 'CashTrakr - Iniciar Sesión',
    keywords: 'Nextjs, Tailwindcss'
}

export default function LoginPage() {
    console.log('Register page');
    return (
        <>
            <h1 className="font-black text-6xl text-purple-600">Iniciar Sesión</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
            <LoginForm />

            <nav className="mt-10 flex flex-col space-y-10">
                <Link
                    href='/auth/register'
                    className="text-center text-gray-500"
                >
                    ¿No tienes una cuenta? Crea una
                </Link>
                <Link
                    href='/auth/forgot-password'
                    className="text-center text-gray-500"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}
