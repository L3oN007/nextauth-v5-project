import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z
	.object({
		name: z.string().min(1, { message: 'Name is required' }),
		email: z.string().email({ message: 'Invalid email' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});
