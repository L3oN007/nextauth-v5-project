import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailTemplateProps {
	confirmLink: string;
}

export const VerifyEmailTemplate: React.FC<
	Readonly<VerifyEmailTemplateProps>
> = ({ confirmLink }) => (
	<Html>
		<Tailwind>
			<Head />
			<Preview>Verify your email in AuthShield</Preview>
			<Body style={body}>
				<Container>
					<Section className='mx-auto max-w-md overflow-hidden bg-white'>
						<Text className='text-3xl font-bold mb-10'>
							AuthShield
						</Text>

						<div className='mt-2'>
							<Text className='text-3xl font-bold'>
								Verify your email address
							</Text>
							<Text className='mt-4 text-gray-600 dark:text-gray-400 text-base'>
								To continue setting up your AuthShield account, please
								verify that this is your email address.
							</Text>
						</div>

						<div className='my-5'>
							<Button
								href={confirmLink}
								className='bg-green-600 rounded text-white text-[15px] cursor-pointer font-semibold no-underline text-center py-2 px-3'>
								Verify Email
							</Button>
						</div>
						<div className='mt-5'>
							<Text className='text-xs text-gray-500 dark:text-gray-400'>
								This link will expire in{' '}
								<span className='font-bold'>1 hour</span> . If you did
								not make this request, please disregard this email.
							</Text>
						</div>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default VerifyEmailTemplate;

const body = {
	background: '#ffffff',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};
