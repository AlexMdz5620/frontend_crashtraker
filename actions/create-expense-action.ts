"use server";

import getToken from "@/src/auth/token";
import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
}

export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {
    const expenseDate = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const expense = DraftExpenseSchema.safeParse(expenseDate);

    if (!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Generar gasto
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
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
