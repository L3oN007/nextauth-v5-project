import TwoFAEmailTemplate from '@/components/email/2fa-email-template';
import ResetPasswordEmailTemplate from '@/components/email/password-reset-template';
import { VerifyEmailTemplate } from '@/components/email/verify-email-template';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorEmail = async (
	email: string,
	token: string
) => {
	const code = token;
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Your AuthShield 2FA code',
		react: React.createElement(TwoFAEmailTemplate, { code }),
	});
};

export const sendVerificationEmail = async (
	email: string,
	token: string
) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirm your email',
		react: React.createElement(VerifyEmailTemplate, { confirmLink }),
	});
};

export const sendPasswordResetEmail = async (
	email: string,
	token: string
) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your password',
		react: React.createElement(ResetPasswordEmailTemplate, {
			resetLink,
		}),
	});
};
