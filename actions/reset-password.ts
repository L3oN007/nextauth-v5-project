'use server';

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generateResetPasswordToken } from '@/lib/token';
import { ResetSchema } from '@/schemas';
import * as z from 'zod';

export const resetPass = async (
	values: z.infer<typeof ResetSchema>
) => {
	const validatedFields = ResetSchema.safeParse(values);
	if (!validatedFields.success) return { error: 'Invalid email!' };

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) return { error: 'Email does not exist!' };

	const passwordResetToken = await generateResetPasswordToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return { success: 'Reset password email sent!' };
};
