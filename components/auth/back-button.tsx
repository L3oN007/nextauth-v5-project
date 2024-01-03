'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

interface BackButtonProps {
	label: string;
	href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
	return (
		<Button
			variant='link2'
			className='w-full font-normal'
			size='sm'
			asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
};
