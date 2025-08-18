"use server";

import getToken from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas";

type ActionStateTypes = {
    errors: string[],
    success: string,
}

export async function updatePassword(prevState: ActionStateTypes, formData: FormData) {
    const userPass = UpdatePasswordSchema.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password')
    });

    if (!userPass.success) {
        return {
            errors: userPass.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = getToken();
    const url = `${process.env.API_URL}/auth/update-password`;
    const req = await fetch(url, {
        method: 'PUL',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            current_password: userPass.data.current_password,
            password: userPass.data.password,
        }),
    });
    const json = await req.json();

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json);

    return {
        errors: [],
        success
    }
}