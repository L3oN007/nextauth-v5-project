const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500'>
			{children}
		</div>
	);
};

export default AuthLayout;
