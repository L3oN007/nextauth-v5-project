'use server';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success)
		return { error: 'Invalid email or password' };

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password)
		return { error: 'Invalid email or password' };

	if (!existingUser.emailVerified) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		return { success: 'Please verify your email' };
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid email or password' };
				default:
					return { error: 'Something went wrong' };
			}
		}

		throw error;
	}
};
