'use client';
import MaxWidth from '@/app/components/MaxWidth';
import { Button, Input } from '@nextui-org/react';
import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@/app/context/ThemeContext';
import ErrorMessage from '@/app/components/ErrorMessage';
import Links from '@/app/components/Links';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/app/services/icon';
import { useLocale } from 'next-intl';

interface RegisterValues {
	firstName: string;
	lastName: string;
	email: string;
	// phone: string;
	password: string;
	confirmPassword: string;
}

// Validation schema
const validationSchema = Yup.object({
	firstName: Yup.string().required('Họ là bắt buộc'),
	lastName: Yup.string().required('Tên là bắt buộc'),
	email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	// phone: Yup.string().required('Số điện thoại là bắt buộc'),
	password: Yup.string()
		.min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
		.required('Mật khẩu là bắt buộc'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), undefined], 'Mật khẩu xác nhận không khớp')
		.required('Xác nhận mật khẩu là bắt buộc'),
});

// Initial values
const initialValues: RegisterValues = {
	firstName: '',
	lastName: '',
	email: '',
	// phone: '',
	password: '',
	confirmPassword: '',
};

const RegisterPage: FC = () => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async (
		values: RegisterValues,
		{ setSubmitting, resetForm, setTouched }: any,
	) => {
		try {
			// Gửi dữ liệu tới API đăng ký
			const response = await axios.post('http://localhost:5000/auth/register', values);

			// Xử lý phản hồi thành công
			toast.success('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
			resetForm();
			router.push(`/${locale}/login`);
		} catch (error: any) {
			// Xử lý lỗi từ API
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const { status, data } = error.response;
					if (status === 400 && Array.isArray(data.message)) {
						data.message.forEach((msg: string) => toast.error(msg));
					} else {
						toast.error('Đã xảy ra lỗi! Vui lòng thử lại.');
					}
				} else {
					toast.error('Lỗi kết nối. Vui lòng thử lại sau.');
				}
			} else {
				toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
			}
		} finally {
			setSubmitting(false);
		}
		// try {
		// 	await axios.post('http://localhost:5000/auth/register', values);
		// 	router.push(`/${locale}/login`);
		// } catch (err: any) {
		// 	toast.error(err.response?.data?.message || 'Đăng ký không thành công');
		// }
	};

	return (
		<MaxWidth className=''>
			<div>
				<h3
					className={`my-3 text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
				>
					ĐĂNG KÝ
				</h3>
				<div className='mx-auto max-w-lg rounded-lg px-8 py-1 md:px-0 md:py-0'>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							isValid,
							dirty,
							isSubmitting,
							handleSubmit,
							setTouched,
						}) => (
							<Form
								className='mx-auto my-4 max-w-lg space-y-5'
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}
							>
								{/* Họ và Tên */}
								<div className='flex w-full items-center justify-between'>
									<div>
										<label
											htmlFor='firstName'
											className={`${isDarkMode ? 'text-white' : 'text-black'}`}
										>
											Họ:
										</label>
										<Input
											id='firstName'
											name='firstName'
											type='text'
											fullWidth
											placeholder='Nhập họ và tên'
											className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
											radius='sm'
											variant='bordered'
											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<ErrorMessage error={errors.firstName} touched={touched.firstName} />
									</div>
									<div>
										<label
											htmlFor='lastName'
											className={`${isDarkMode ? 'text-white' : 'text-black'}`}
										>
											Tên:
										</label>
										<Input
											id='lastName'
											name='lastName'
											type='text'
											fullWidth
											placeholder='Nhập họ và tên'
											className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
											radius='sm'
											variant='bordered'
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<ErrorMessage error={errors.lastName} touched={touched.lastName} />
									</div>
								</div>

								{/* Email */}
								<div>
									<label htmlFor='email' className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
										Email:
									</label>
									<Input
										id='email'
										name='email'
										type='email'
										fullWidth
										placeholder='Nhập email của bạn'
										className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
										radius='sm'
										variant='bordered'
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage error={errors.email} touched={touched.email} />
								</div>

								{/* Số điện thoại */}
								{/* <div>
									<label htmlFor='phone' className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
										Số điện thoại:
									</label>
									<Input
										id='phone'
										name='phone'
										type='text'
										fullWidth
										placeholder='Nhập số điện thoại của bạn'
										className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
										radius='sm'
										variant='bordered'
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage error={errors.phone} touched={touched.phone} />
								</div> */}

								{/* Mật khẩu */}
								<div>
									<label
										htmlFor='password'
										className={`${isDarkMode ? 'text-white' : 'text-black'}`}
									>
										Mật khẩu:
									</label>
									<Input
										id='password'
										name='password'
										type={isVisible ? 'text' : 'password'}
										fullWidth
										placeholder='Nhập mật khẩu'
										className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
										radius='sm'
										variant='bordered'
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										endContent={
											<button
												className='focus:outline-none'
												type='button'
												onClick={toggleVisibility}
												aria-label='toggle password visibility'
											>
												{isVisible ? (
													<EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
												) : (
													<EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
												)}
											</button>
										}
									/>
									<ErrorMessage error={errors.password} touched={touched.password} />
								</div>

								{/* Xác nhận mật khẩu */}
								<div>
									<label
										htmlFor='confirmPassword'
										className={`${isDarkMode ? 'text-white' : 'text-black'}`}
									>
										Xác nhận mật khẩu:
									</label>
									<Input
										id='confirmPassword'
										name='confirmPassword'
										type={isVisible ? 'text' : 'password'}
										fullWidth
										placeholder='Nhập lại mật khẩu'
										className={`mt-1 rounded-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
										radius='sm'
										variant='bordered'
										value={values.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										endContent={
											<button
												className='focus:outline-none'
												type='button'
												onClick={toggleVisibility}
												aria-label='toggle password visibility'
											>
												{isVisible ? (
													<EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
												) : (
													<EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
												)}
											</button>
										}
									/>
									<ErrorMessage error={errors.confirmPassword} touched={touched.confirmPassword} />
								</div>

								{/* Nút Submit */}
								<div>
									<Button
										type='submit'
										className='w-full cursor-pointer bg-primary py-3 text-lg text-white'
										disabled={isSubmitting}
										radius='sm'
									>
										{isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>

				{/* Liên kết đến trang đăng nhập */}
				<div className='mt-4 flex items-center justify-center'>
					<div className='flex items-center text-sm'>
						<p className={`${isDarkMode ? 'text-white' : 'text-black'} `}>Đã có tài khoản?</p>
						<Links href={`/login`} className='text-second hover:underline'>
							Đăng nhập
						</Links>
					</div>
				</div>
			</div>
			<Toaster />
		</MaxWidth>
	);
};

export default RegisterPage;
