'use client';
import Links from '@/app/components/Links';
import MaxWidth from '@/app/components/MaxWidth';
import { useUser } from '@/app/context/UserContext';
import { Button, Input } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useTheme } from '@/app/context/ThemeContext';
import { useEffect } from 'react'; // Optional, if you need to handle effects

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
	const { setIsLogin, setRole } = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoginEmail, setIsLoginEmail] = useState(false);
	const [isAnimate, setIsAnimate] = useState(0);
	const router = useRouter();
	const locale = useLocale();
	const [errorMessage, setErrorMessage] = useState('');
	const { isDarkMode } = useTheme();
	const handleLogin = async (values: typeof initialLoginValues) => {
		// e.preventDefault();
		try {
			setErrorMessage(''); // Clear previous error messages
			const response = await axios.post('http://localhost:5000/auth/login', values);
			const { access_token, refreshToken } = response.data;

			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('refreshToken', refreshToken);

			const decodedToken = jwtDecode<CustomJwtPayload>(refreshToken);
			console.log(decodedToken.role);
			setRole(decodedToken.role);
			setIsLogin(true);
			localStorage.setItem('isLogin', 'true');
			router.push(`/${locale}/`);
			toast.success('Đăng nhập thành công!');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const { status, data } = error.response;
					if (status === 401 && data.message === 'Password incorrect') {
						toast.error('Mật khẩu không chính xác');
					} else if (status === 400 && Array.isArray(data.message)) {
						toast.error(data.message[0]); // Display the first error message
					} else {
						toast.error('Tài khoản không tồn tại! Vui lòng thử lại.');
					}
				} else {
					toast.error('Lỗi kết nối. Vui lòng thử lại sau.');
				}
			} else {
				toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
			}
			// toast.error(errorMessage);
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

						<Button className='bg-second w-full py-6 text-lg text-white'>Đăng nhập</Button>
					</div>
				</div>
			</MaxWidth>
		);
	}
	return (
		<MaxWidth>
			<div className={`${isAnimate > 0 && 'animate-fade-right'} `}>
				<h3 className='my-5 text-center text-2xl font-bold'>ĐĂNG NHẬP</h3>
				<div className='mx-auto max-w-xl rounded-lg p-8 shadow-lg'>
					<Formik
						initialValues={initialLoginValues}
						validationSchema={loginValidationSchema}
						onSubmit={handleLogin}
					>
						{({ errors, touched }) => (
							<Form>
								{/* Email Input */}
								<div className='my-10'>
									<label htmlFor='email' className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
										Email
									</label>
									<Input
										id='email'
										fullWidth
										placeholder='Nhập email của bạn'
										labelPlacement='outside'
										name='email'
										radius='md'
										variant='bordered'
										className={`${isDarkMode ? 'text-white' : 'text-black'}`} // Set text color and background based on dark mode
									/>
									<ErrorMessage error={errors.email} touched={touched.email} />
								</div>

								{/* Password Input */}
								<div className={`${isDarkMode ? 'text-white' : 'text-black'} my-10`}>
									<label
										htmlFor='password'
										className={`${isDarkMode ? 'text-white' : 'text-black'}`}
									>
										Mật khẩu:
									</label>
									<Input
										id='password'
										type='password'
										fullWidth
										placeholder='Nhập mật khẩu'
										labelPlacement='outside'
										name='password'
										radius='md'
										variant='bordered'
										className={`${isDarkMode ? 'text-white' : 'bg-white text-black'}`} // Set text color and background based on dark mode
									/>
									<ErrorMessage error={errors.password} touched={touched.password} />
								</div>

								<Button
									className='w-full bg-primary py-7 text-lg text-white'
									type='submit'
									disabled={!email || !password} // Disable button if email or password is empty
								>
									Đăng nhập
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
			<Toaster />
		</MaxWidth>
	);
};

export default LoginPage;
