'use client';
import { FC, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useRouter } from 'next/navigation';

const forgotPasswordValidationSchema = Yup.object({
	email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

const initialForgotPasswordValues = {
	email: '',
};

const ForgotPasswordPage: FC = () => {
	const t = useTranslations('PageForgotPassword');
	const router = useRouter();
	const locale = useLocale();
	const handleSubmit = async (
		values: typeof initialForgotPasswordValues,
		{ setSubmitting, resetForm, setTouched }: any,
	) => {
		try {
			// setErrorMessage('');
			const res = await axios.post('http://localhost:5000/auth/send-otp', values);
			if (res.data === 'OTP has been sent to your email') {
				toast.success(t('otpSentSuccess'));
				router.push(`/${locale}/otp?email=${values.email}`);
				localStorage.setItem('emailReset', values.email);
			} else {
				toast.error(t('otpSentError'));
			}
			// toast.success('Yêu cầu đặt lại mật khẩu đã được gửi!');
			resetForm();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const { status, data } = error.response;
					if (status === 400 && Array.isArray(data.message)) {
						toast.error(data.message[0]);
					} else {
						toast.error(t('genericError'));
					}
				} else {
					toast.error(t('connectionError'));
				}
			} else {
				toast.error(t('genericError'));
			}
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='flex items-center justify-center'>
			<div className='w-full max-w-md space-y-8 p-8'>
				<div>
					<h2 className='text-gray-900 mt-6 text-center text-3xl font-extrabold'>{t('title')}</h2>
					<p className='text-gray-600 mt-2 text-center text-sm'>{t('description')}</p>
				</div>
				<Formik
					initialValues={initialForgotPasswordValues}
					validationSchema={forgotPasswordValidationSchema}
					onSubmit={handleSubmit}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						isValid,
						dirty,
					}) => (
						<Form
							className='space-y-10'
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
						>
							{/* Email Input */}
							<div className=''>
								<label htmlFor='email' className='sr-only'>
									{t('emailLabel')}
								</label>
								<Input
									id='email'
									name='email'
									type='email'
									fullWidth
									placeholder={t('emailPlaceholder')}
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='bordered'
									radius='sm'
								/>
								<ErrorMessage error={errors.email} touched={touched.email} />
							</div>

							{/* Submit Button */}
							<Button
								type='submit'
								className='w-full cursor-pointer bg-primary text-white hover:opacity-80'
								disabled={isSubmitting}
							>
								{t('resetPasswordButton')}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
			<Toaster />
		</div>
	);
};

export default ForgotPasswordPage;
