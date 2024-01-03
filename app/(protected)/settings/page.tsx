'use client';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
	const user = useCurrentUser();

	return (
		<div className='flex flex-col bg-white rounded-2xl justify-center items-center p-4'>
			{JSON.stringify(user)}
		</div>
	);
};

export default SettingsPage;
