import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/next-theme-provider';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'AuthShield',
		template: `%s | AuthShield`,
	},
	description: 'AuthShield - A simple authentication example',
	icons: [
		{
			url: '/logo.png',
			href: '/logo.png',
		},
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem>
						<Toaster richColors position='bottom-right' />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
