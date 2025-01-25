'use client';
import React, { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useRouter, useSearchParams } from 'next/navigation';

const otpValidationSchema = Yup.object({
	otp: Yup.string().required('Mã OTP là bắt buộc').length(6, 'Mã OTP phải gồm 6 ký tự'),
});

const initialOtpValues = {
	otp: '',
};

const OtpPage: FC = () => {
	const t = useTranslations('PageOtp');
	// const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();
	const locale = useLocale();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');
	const handleVerifyOtp = async (values: typeof initialOtpValues) => {
		try {
			// setErrorMessage('');
			const res = await axios.post('http://localhost:5000/auth/verify-otp', {
				otp: values.otp,
				email,
			});
			if (res.data === 'OTP201') {
				toast.success(t('otpVerifiedSuccess'));
				router.push(`/${locale}/reset-password/?otp=${values.otp}&email=${email}`);
			} else {
				toast.error(t('otpInvalidError'));
			}
			// toast.success('Mã OTP xác nhận thành công!');
			// Chuyển hướng hoặc thực hiện hành động tiếp theo sau khi xác thực thành công
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
					initialValues={initialOtpValues}
					validationSchema={otpValidationSchema}
					onSubmit={handleVerifyOtp}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						isSubmitting,
						handleBlur,
						// isValid,
						// dirty,
					}) => (
						<Form className='space-y-10'>
							{/* OTP Input */}
							<div className=''>
								<label htmlFor='otp' className='sr-only'>
									{t('otpLabel')}
								</label>
								<Input
									id='otp'
									name='otp'
									type='text'
									fullWidth
									placeholder={t('otpPlaceholder')}
									className=''
									value={values.otp}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='bordered'
									radius='sm'
								/>
								<ErrorMessage error={errors.otp} touched={touched.otp} />
							</div>

							{/* Submit Button */}
							<Button
								type='submit'
								className='w-full cursor-pointer bg-primary text-white hover:opacity-80'
								disabled={isSubmitting}
							>
								{t('verifyOtpButton')}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
			<Toaster />
		</div>
	);
};

export default OtpPage;
