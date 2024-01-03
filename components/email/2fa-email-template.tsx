import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface TwoFAEmailTemplateProps {
	code: string;
}

export const TwoFAEmailTemplate: React.FC<
	Readonly<TwoFAEmailTemplateProps>
> = ({ code }) => (
	<Html>
		<Tailwind>
			<Head />
			<Preview>Your 2FA code in AuthShield</Preview>
			<Body style={body}>
				<Container>
					<Section className='mx-auto max-w-md overflow-hidden bg-white'>
						<Text className='text-3xl font-bold mb-10'>
							AuthShield
						</Text>

						<div className='mt-2'>
							<Text className='text-3xl font-bold'>
								Your 2FA code
							</Text>
							<Text className='mt-4 text-gray-600 dark:text-gray-400 text-base'>
								To login to your AuthShield account, please use the
								2FA code below:
							</Text>
						</div>

						<div className='my-5'>
							<div className='rounded bg-green-100 px-4 py-4 text-center text-[20px] font-semibold text-green-800'>
								{code}
							</div>
						</div>
						<div className='mt-5'>
							<Text className='text-xs text-gray-500 dark:text-gray-400'>
								This code will expire in{' '}
								<span className='font-bold'>5 minutes</span> . If you
								did not make this request, please disregard this
								email.
							</Text>
						</div>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default TwoFAEmailTemplate;

const body = {
	background: '#ffffff',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};
