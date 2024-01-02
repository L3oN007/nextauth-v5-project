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

interface ResetPasswordEmailTemplateProps {
	resetLink: string;
}

export const ResetPasswordEmailTemplate: React.FC<
	Readonly<ResetPasswordEmailTemplateProps>
> = ({ resetLink }) => (
	<Html>
		<Tailwind>
			<Head />
			<Preview>Reset your password in AuthShield</Preview>
			<Body style={body}>
				<Container>
					<Section className='mx-auto max-w-md overflow-hidden bg-white'>
						<Text className='text-3xl font-bold mb-10'>
							AuthShield
						</Text>

						<div className='mt-2'>
							<Text className='text-3xl font-bold'>
								Reset your email password
							</Text>
							<Text className='mt-4 text-gray-600 dark:text-gray-400 text-base'>
								We heard that you lost your AuthShield password. Sorry
								about that!But don’t worry! You can use the following
								button to reset your password:
							</Text>
						</div>

						<div className='my-5'>
							<Button
								href={resetLink}
								className='bg-green-600 rounded text-white text-[15px] cursor-pointer font-semibold no-underline text-center py-2 px-3'>
								Reset your password
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

export default ResetPasswordEmailTemplate;

const body = {
	background: '#ffffff',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};
