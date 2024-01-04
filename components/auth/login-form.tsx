'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: '';

	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError('Something went wrong'));
		});
	};

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'>
					<div className='space-y-4'>
						{!showTwoFactor ? (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='text'
													placeholder='abc@gmail.com'
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<div className='flex justify-between items-center '>
												<FormLabel>Password</FormLabel>
												<Button
													variant='link2'
													size='sm'
													className='px-0 font-normal text-[12px]'
													asChild>
													<Link href='/auth/reset-password'>
														Forgot password?
													</Link>
												</Button>
											</div>
											<FormControl>
												<Input
													{...field}
													type='password'
													placeholder='******'
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						) : (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>2FA Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												type='text'
												placeholder='123456'
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						type='submit'
						className='w-full'
						disabled={isPending}>
						{isPending ? (
							<>
								<svg
									className='inline-block mr-2 animate-spin'
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path d='M21 12a9 9 0 1 1-6.219-8.56' />
								</svg>
								{showTwoFactor ? 'Confirm 2FA' : 'Login'}
							</>
						) : (
							`${showTwoFactor ? 'Confirm 2FA' : 'Login'}`
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
