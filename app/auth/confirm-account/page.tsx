import ConfirmAccountForm from "@/components/ui/ConfirmAccountForm";

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-600">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">Ingresa el código que recibiste <span className="text-amber-500">por Correo</span></p>

      <ConfirmAccountForm />
    </>
  )
}
