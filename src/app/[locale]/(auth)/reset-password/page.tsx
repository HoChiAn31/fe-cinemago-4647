'use client';
import { FC, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useSearchParams } from 'next/navigation';

const resetPasswordValidationSchema = Yup.object({
	newPassword: Yup.string()
		.required('Mật khẩu mới là bắt buộc')
		.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
		.matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường')
		.matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa')
		.matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
		.required('Xác nhận mật khẩu là bắt buộc'),
});

const initialResetPasswordValues = {
	newPassword: '',
	confirmPassword: '',
};

const ResetPasswordPage: FC = () => {
	const t = useTranslations('PageResetPassword');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();
	const locale = useLocale();
	const searchParams = useSearchParams();
	const token = searchParams.get('token'); // Lấy token từ query params

	const handleResetPassword = async (values: typeof initialResetPasswordValues) => {
		// if (!token) {
		// 	toast.error('Token xác thực không hợp lệ.');
		// 	return;
		// }
		// try {
		// 	setErrorMessage('');
		// 	await axios.post('http://localhost:5000/auth/reset-password', {
		// 		token,
		// 		newPassword: values.newPassword,
		// 	});
		// 	toast.success('Mật khẩu đã được thiết lập lại thành công!');
		// 	// Chuyển hướng đến trang đăng nhập hoặc trang khác
		// 	router.push('/login');
		// } catch (error) {
		// 	if (axios.isAxiosError(error)) {
		// 		if (error.response) {
		// 			const { status, data } = error.response;
		// 			if (status === 400 && Array.isArray(data.message)) {
		// 				toast.error(data.message[0]);
		// 			} else {
		// 				toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
		// 			}
		// 		} else {
		// 			toast.error('Lỗi kết nối. Vui lòng thử lại sau.');
		// 		}
		// 	} else {
		// 		toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
		// 	}
		// }
		router.push(`/${locale}/`);
	};

	return (
		<div className='bg-gray-50 flex min-h-screen items-center justify-center'>
			<div className='w-full max-w-md space-y-8 bg-white p-8'>
				<div>
					<h2 className='text-gray-900 mt-6 text-center text-3xl font-extrabold'>{t('title')}</h2>
					<p className='text-gray-600 mt-2 text-center text-sm'>{t('description')}</p>
				</div>
				<Formik
					initialValues={initialResetPasswordValues}
					validationSchema={resetPasswordValidationSchema}
					onSubmit={handleResetPassword}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						isSubmitting,
						isValid,
						dirty,
					}) => (
						<Form className='space-y-6'>
							{/* New Password Input */}
							<div>
								<label htmlFor='newPassword' className='sr-only'>
									{t('newPasswordLabel')}
								</label>
								<Input
									id='newPassword'
									name='newPassword'
									type='password'
									fullWidth
									placeholder={t('newPasswordPlaceholder')}
									value={values.newPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='bordered'
									radius='sm'
								/>
								<ErrorMessage error={errors.newPassword} touched={touched.newPassword} />
							</div>

							{/* Confirm Password Input */}
							<div>
								<label htmlFor='confirmPassword' className='sr-only'>
									{t('confirmPasswordLabel')}
								</label>
								<Input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									fullWidth
									placeholder={t('confirmPasswordPlaceholder')}
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									variant='bordered'
									radius='sm'
								/>
								<ErrorMessage error={errors.confirmPassword} touched={touched.confirmPassword} />
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

export default ResetPasswordPage;
