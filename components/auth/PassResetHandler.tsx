"use client";

import { useState } from "react"
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPassForm";

export default function PassResetHandler() {
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState('');


    return (
        <>{!isValidToken
            ? <ValidateTokenForm
                setIsValidToken={setIsValidToken}
                token={token}
                setToken={setToken}
            />
            : <ResetPasswordForm
                token={token}
            />
        }</>
    )
}
