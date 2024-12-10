'use client';
import { Button, Image, Input } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Links from '@/app/components/Links';
import MaxWidth from '@/app/components/MaxWidth';
import { useUser } from '@/app/context/UserContext';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useTheme } from '@/app/context/ThemeContext';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/app/services/icon';

interface CustomJwtPayload extends JwtPayload {
	role: string;
}

const loginValidationSchema = Yup.object({
	email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	password: Yup.string().required('Mật khẩu là bắt buộc'),
});

const initialLoginValues = {
	email: '',
	password: '',
};

const LoginPage: FC = () => {
	const { setIsLogin, setRole, login } = useUser();
	const [isLoginEmail, setIsLoginEmail] = useState(false);
	const [isAnimate, setIsAnimate] = useState(0);
	const router = useRouter();
	const locale = useLocale();
	const [errorMessage, setErrorMessage] = useState('');
	const { isDarkMode } = useTheme();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleLogin = async (values: typeof initialLoginValues) => {
		// values.preventDefault();
		try {
			await login(values.email, values.password);
			router.push(`/${locale}`);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const { status, data } = error.response;
					if (status === 401 && data.message === 'Password incorrect') {
						toast.error('Mật khẩu không chính xác');
					} else if (status === 400 && Array.isArray(data.message)) {
						toast.error(data.message[0]);
					} else {
						toast.error('Tài khoản không tồn tại! Vui lòng thử lại.');
					}
				} else {
					toast.error('Lỗi kết nối. Vui lòng thử lại sau.');
				}
			} else {
				toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
			}
		}
	};

	if (isLoginEmail) {
		return (
			<MaxWidth className=''>
				<div className='animate-fade-left'>
					<div className='relative'>
						<div
							className='cursor-pointer'
							onClick={() => {
								setIsLoginEmail(false);
								setIsAnimate(isAnimate + 1);
							}}
						>
							<ChevronLeft className='absolute left-80' />
						</div>
						<h3 className='my-5 text-center text-2xl font-bold'>ĐĂNG NHẬP BẲNG EMAIL</h3>
					</div>
					<div className='mx-auto max-w-xl rounded-lg bg-white p-8 shadow-lg'>
						<div className='my-10'>
							<Input
								fullWidth
								label='Email:'
								placeholder='Nhập email của bạn'
								className='bg-gray-50'
								labelPlacement='outside'
							/>
						</div>

						<Button className='w-full bg-second py-6 text-lg text-white'>Đăng nhập</Button>
					</div>
				</div>
			</MaxWidth>
		);
	}

	return (
		<MaxWidth className=''>
			<div className={`${isAnimate > 0 && 'animate-fade-right'} `}>
				<h3 className='my-5 text-center text-2xl font-bold'>ĐĂNG NHẬP</h3>
				<div className='mx-auto my-4 max-w-lg rounded-lg px-8 py-4'>
					<Formik
						initialValues={initialLoginValues}
						validationSchema={loginValidationSchema}
						onSubmit={handleLogin}
					>
						{({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
							<Form className='space-y-6'>
								{/* Email Input */}
								<div className=''>
									<label htmlFor='email' className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
										Email
									</label>
									<Input
										id='email'
										name='email'
										type='email'
										fullWidth
										placeholder='Nhập email của bạn'
										labelPlacement='outside'
										radius='sm'
										variant='bordered'
										className={`${isDarkMode ? 'text-white' : 'text-black'} `}
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage error={errors.email} touched={touched.email} />
								</div>

								{/* Password Input */}
								<div className={`${isDarkMode ? 'text-white' : 'text-black'} `}>
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
										labelPlacement='outside'
										radius='sm'
										variant='bordered'
										className={`${isDarkMode ? 'text-white' : 'bg-white text-black'}`}
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
								<div>
									<Links
										className='flex items-center justify-end hover:text-second hover:opacity-80'
										href='/forgot-password'
										size='sm'
									>
										Forgot Password?
									</Links>
								</div>
								<Button
									className='w-full cursor-pointer bg-primary py-6 text-lg text-white'
									type='submit'
									disabled={!(isValid && dirty)} // Disable button if form is invalid or untouched
									radius='sm'
								>
									Đăng nhập
								</Button>
							</Form>
						)}
					</Formik>
					<div className='mt-4 space-y-4'>
						<div className='flex items-center'>
							<div className='mx-4 flex-grow'>
								<hr className='border-gray-300 border-t' />
							</div>
							<p className='mx-4 text-center'>or login with</p>
							<div className='mx-4 flex-grow'>
								<hr className='border-gray-300 border-t' />
							</div>
						</div>
						<div className='flex items-center justify-center'>
							<div className='flex gap-8'>
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/800px-Facebook_Logo_%282019%29.png'
									alt='facebook'
									height={24}
									width={24}
									shadow='sm'
								/>
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png'
									alt='gmail'
									height={24}
									width={24}
									shadow='sm'
								/>
							</div>
						</div>

						<div className='flex items-center justify-center'>
							<div className='flex items-center text-sm'>
								<p>Tạo tài khoản?</p>
								<Links href={`/register`} className='text-second hover:underline'>
									Đăng ký
								</Links>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</MaxWidth>
	);
};

export default LoginPage;
