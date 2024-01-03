'use client';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FaUser } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogoutButton } from './logout-button';

export const UserButton = () => {
	const user = useCurrentUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='border border-gray-300'>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback className='bg-gray-100'>
						<FaUser />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-52'>
				<div className='px-2 py-1'>
					<p className='text-sm'>{user?.name}</p>
					<p className='text-muted-foreground text-xs '>
						{user?.role}
					</p>
				</div>
				<DropdownMenuItem>
					<FiUser className='mr-2' />
					Profile
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<LogoutButton>
					<DropdownMenuItem>
						<LuLogOut className='mr-2' /> Sign out
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
