'use server';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
export const register = async (
	values: z.infer<typeof RegisterSchema>
) => {
	const validatedFields = RegisterSchema.safeParse(values);
	if (!validatedFields.success)
		return { error: 'Invalid email or password' };

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) return { error: 'Email already in use!' };

	await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	});

	const verificationToken = await generateVerificationToken(email);

	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);

	return { success: 'Confirmation email sent!' };
};
