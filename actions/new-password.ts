'use server';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { getPasswordResetTokenByToken } from '@/lib/password-reset-token';
import { NewPassSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const newPassword = async (
	values: z.infer<typeof NewPassSchema>,
	token?: string | null
) => {
	if (!token) return { error: 'Missing token' };

	const validatedFields = NewPassSchema.safeParse(values);

	if (!validatedFields.success) return { error: 'Invalid field!' };

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) return { error: 'Invalid token!' };

	const hasExpired = new Date() > new Date(existingToken.expires);

	if (hasExpired) return { error: 'Token has expired!' };

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) return { error: 'Email does not exist!' };

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	});

	await db.passwordResetToken.delete({
		where: {
			id: existingToken.id,
		},
	});

	return { success: 'Password changed!' };
};
