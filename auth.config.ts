import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from './data/user';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validedFields = LoginSchema.safeParse(credentials);

				if (validedFields.success) {
					const { email, password } = validedFields.data;
					const user = await getUserByEmail(email);

					if (!user || !user.password) {
						return null;
					}

					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					);

					if (passwordMatch) {
						return user;
					}
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
