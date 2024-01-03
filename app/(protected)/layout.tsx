import { Navbar } from './_components/navbar';

const ProtectedLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500'>
			<Navbar />
			{children}
		</div>
	);
};

export default ProtectedLayout;
