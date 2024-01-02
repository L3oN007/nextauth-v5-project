import { Card, CardFooter, CardHeader } from '../ui/card';
import { BackButton } from './back-button';
import { Header } from './header';

export const ErrorCard = () => {
	return (
		<Card className='w-[450px] shadow-md'>
			<CardHeader>
				<Header label='Oops, something went wrong!' />
			</CardHeader>
			<CardFooter>
				<BackButton href='/auth/login' label='Back to login' />
			</CardFooter>
		</Card>
	);
};
