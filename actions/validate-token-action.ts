"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

export async function validateToken(token: string) {
    const resetPassToken = TokenSchema.safeParse(token);
    if (!resetPassToken.success) {
        return {
            errors: resetPassToken.error.issues.map(issue => issue.message),
            success: '',
        }
    }

    const url = `${process.env.API_URL}/auth/validate-token`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: resetPassToken.data
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
        success: success
    }
}