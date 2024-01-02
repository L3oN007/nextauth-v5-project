import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-y-4 items-center justify-center'>
			<div className='flex'>
				<Image
					src='/logo.png'
					alt='Logo'
					width={40}
					height={40}
					className='w-7 h-7 mr-2 mt-[4px]'
				/>
				<h1 className={cn('text-3xl font-semibold', font.className)}>
					AuthShield
				</h1>
			</div>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	);
};
