'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { toast } from 'sonner';

export const Social = () => {
	// const onClick = (provider: 'google' | 'github') => {
	// 	signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
	// };

	const onClick = () => {
		toast.warning('Coming soon...');
	};

	return (
		<div className='flex items-center w-full gap-x-2'>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={() => onClick()}>
				<FcGoogle className='h-5 w-5' />
			</Button>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={() => onClick()}>
				<FaGithub className='h-5 w-5' />
			</Button>
		</div>
	);
};
