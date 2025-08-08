import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'CashTrakr - Crear Cuenta',
    description: 'CashTrakr - Crear Cuenta',
    keywords: 'Nextjs, Tailwindcss'
}

export default function RegisterPage() {

    return (
        <>
            <h1 className="font-black text-6xl text-purple-600">Crea un Cuenta</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
            <RegisterForm />

            <nav className="mt-10 flex flex-col space-y-10">
                <Link
                    href='/auth/login'
                    className="text-center text-gray-500"
                >
                    ¿Ya tienes una cuenta? Iniciar Sesión
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
