'use client';
import MaxWidth from '@/app/components/MaxWidth';
import { Button, Input } from '@nextui-org/react';
import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@/app/context/ThemeContext';
import ErrorMessage from '@/app/components/ErrorMessage';

// Validation schema
const validationSchema = Yup.object({
	fullName: Yup.string().required('Họ và tên là bắt buộc'),
	email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),

	phone: Yup.string().required('Số điện thoại là bắt buộc'),
	password: Yup.string()
		.min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
		.required('Mật khẩu là bắt buộc'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), undefined], 'Mật khẩu xác nhận không khớp')
		.required('Xác nhận mật khẩu là bắt buộc'),
});

// Initial values
const initialValues = {
	fullName: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: '',
};

const RegisterPage: FC = () => {
	const handleSubmit = (values: typeof initialValues) => {
		// Handle form submission
		console.log(values);
	};
	const {  } = useTheme();
	const MyInput: React.FC<{ field: any; form: any; [key: string]: any }> = ({
		field,
		form,
		...props
	}) => {
		return (
			<Input
				className='focus:outline-none' // Updated outline styles
				variant='bordered'
				{...field}
				{...props}
			/>
		);
	};

	return (
		<MaxWidth className='py-10'>
			<div>
				<h3
					className={`my-3 text-center text-3xl font-bold ${ ? 'text-white' : 'text-black'}`}
				>
					ĐĂNG KÝ
				</h3>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched }) => (
						<Form className='mx-auto max-w-xl'>
							<div className='my-5'>
								<label htmlFor='fullName' className={`${ ? 'text-white' : 'text-black'}`}>
									Họ và Tên:
								</label>
								<Field
									id='fullName'
									name='fullName'
									// as={Input}
									component={MyInput}
									fullWidth
									placeholder='Nhập họ và tên'
									className={`rounded-xl ${ ? 'text-white' : ''} focus:outline-none`}
								/>
								<ErrorMessage error={errors.fullName} touched={touched.fullName} />
							</div>
							<div className='my-5'>
								<label htmlFor='email' className={`${ ? 'text-white' : 'text-black'}`}>
									Email:
								</label>
								<Field
									id='email'
									name='email'
									as={MyInput}
									fullWidth
									placeholder='Nhập email của bạn'
									className={`rounded-xl ${ ? '' : ''} `}
								/>
								<ErrorMessage error={errors.email} touched={touched.email} />
							</div>
							<div className='my-5'>
								<label htmlFor='phone' className={`${ ? 'text-white' : 'text-black'}`}>
									Số điện thoại:
								</label>
								<Field
									id='phone'
									name='phone'
									as={MyInput}
									fullWidth
									placeholder='Nhập số điện thoại của bạn'
									className={`rounded-xl ${ ? '' : ''} `}
								/>
								<ErrorMessage error={errors.phone} touched={touched.phone} />
							</div>
							<div className='my-5'>
								<label htmlFor='password' className={`${ ? 'text-white' : 'text-black'}`}>
									Mật khẩu:
								</label>
								<Field
									id='password'
									name='password'
									as={MyInput}
									type='password'
									fullWidth
									placeholder='Nhập mật khẩu'
									className={`rounded-xl ${ ? '' : ''} `}
								/>
								<ErrorMessage error={errors.password} touched={touched.password} />
							</div>
							<div className='my-5'>
								<label
									htmlFor='confirmPassword'
									className={`${ ? 'text-white' : 'text-black'}`}
								>
									Xác nhận mật khẩu:
								</label>
								<Field
									id='confirmPassword'
									name='confirmPassword'
									as={MyInput}
									type='password'
									fullWidth
									placeholder='Nhập mật khẩu'
									className={`rounded-xl ${ ? '' : ''} `}
								/>
								<ErrorMessage error={errors.confirmPassword} touched={touched.confirmPassword} />
							</div>
							<Button type='submit' className='mt-2 w-full bg-green1 py-7 text-lg text-white'>
								Đăng ký
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</MaxWidth>
	);
};

export default RegisterPage;
