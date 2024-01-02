import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/next-theme-provider';

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
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
	);
}
