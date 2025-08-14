"use server";

import getToken from "@/src/auth/token";
import { Budget, ErrorResponseSchema, PassValidationSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[];
    success: string
}

export async function deleteBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {
    const currentPass = PassValidationSchema.safeParse(formData.get('password'));
    if (!currentPass.success) {
        return {
            errors: currentPass.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Comprobar pass
    const token = getToken();
    const checkPassUrl = `${process.env.API_URL}/auth/check-password`;
    const checkPassReq = await fetch(checkPassUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            password: currentPass.data
        }),
    });
    const checkPassJson = await checkPassReq.json();

    if (!checkPassReq.ok) {
        const { error } = ErrorResponseSchema.parse(checkPassJson);
        return {
            errors: [error],
            success: ''
        }
    }

    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`;
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    const deleteBudgetJson = await deleteBudgetReq.json();

    if (!deleteBudgetReq.ok) {
        const { error } = ErrorResponseSchema.parse(deleteBudgetJson);
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(deleteBudgetJson);

    revalidatePath('/admin');

    return {
        errors: [],
        success
    }
}