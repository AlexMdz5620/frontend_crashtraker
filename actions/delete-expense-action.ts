"use server";

import getToken from "@/src/auth/token";
import { Budget, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseType = {
    budgetId: Budget['id'];
    expenseId: Expense['id'];
}

export async function deleteExpense({ budgetId, expenseId }: BudgetAndExpenseType) {
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
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
    revalidatePath(`/admin/budget/${budgetId}`);

    return {
        errors: [],
        success
    }
}