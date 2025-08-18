"use server";

import getToken from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema, PorfileFormSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateTypes = {
    errors: string[];
    success: string;
}

export async function updateUser(prevState: ActionStateTypes, formData: FormData) {
    const updateUser = PorfileFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    if (!updateUser.success) {
        return {
            errors: updateUser.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = getToken();
    const url = `${process.env.API_URL}/auth/user`;
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: updateUser.data.name,
            email: updateUser.data.email,
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
    revalidatePath('/admin/profile/settings');

    return {
        errors: [],
        success
    }
}