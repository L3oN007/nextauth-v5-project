'use server';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from '@/lib/token';
import { sendTwoFactorEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);
	if (!validatedFields.success)
		return { error: 'Invalid email or password' };

	const { email, password, code } = validatedFields.data;

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

	if (existingUser.isTwoFactorEnable && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			);

			if (!twoFactorToken) {
				return { error: 'Invalid code' };
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Invalid code' };
			}

			const hasExpired =
				new Date() > new Date(twoFactorToken.expires);

			if (hasExpired) {
				return { error: 'Code has expired!' };
			}

			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id,
				},
			});

			const existingConfirmation =
				await getTwoFactorConfirmationByUserId(existingUser.id);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id,
					},
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(
				existingUser.email
			);
			await sendTwoFactorEmail(
				twoFactorToken.email,
				twoFactorToken.token
			);

			return { twoFactor: true };
		}
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
