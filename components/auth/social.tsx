'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const Social = () => {
	const onClick = () => {
		toast.success('Login with Google');
	};
	return (
		<div className='flex items-center w-full gap-x-2'>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={onClick}>
				<FcGoogle className='h-5 w-5' />
			</Button>
			<Button
				size='lg'
				className='w-full'
				variant='outline'
				onClick={() => {}}>
				<FaGithub className='h-5 w-5' />
			</Button>
		</div>
	);
};
