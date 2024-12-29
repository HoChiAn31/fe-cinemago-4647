'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col, Button } from 'antd';
import './style.css';
import { useLocale, useTranslations } from 'next-intl';
import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from '@/app/utils/axios';
import { User } from '@/app/types';
import { useTheme } from '@/app/context/ThemeContext';

const userData = {
	id: '1',
	firstName: 'Nguyễn',
	lastName: 'Văn A',
	email: 'nguyenvana@example.com',
	password: 'hashed_password',
	phone: '123456789',
	refreshToken: null,
	role: 'user',
	avatar: null,
	status: 1,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

const App: React.FC = () => {
	const [firstname, setFirstname] = useState(userData.firstName);
	const [lastname, setLastname] = useState(userData.lastName);
	const [email, setEmail] = useState(userData.email);
	const [phone, setPhone] = useState(userData.phone);
	const [avatar, setAvatar] = useState(userData.avatar);
	const [dataUser, setDataUser] = useState<User>();
	const [imageLoad, setImageLoad] = useState<string>();
	const [image, setImage] = useState<string | undefined>();
	const [imageFile, setImageFile] = useState<File | undefined>();
	const [editEmail, setEditEmail] = useState(false);
	const [editPhone, setEditPhone] = useState(false);
	const t = useTranslations('UserProfile.profile');
	const router = useRouter();
	const locale = useLocale();
	const { user } = useUser();
	const { isDarkMode } = useTheme();
	useEffect(() => {
		if (user?.id === '') {
			router.push(`/${locale}/`);
		} else {
			axios
				.get(`${process.env.NEXT_PUBLIC_API}/users/${user?.id}`)
				.then((response) => {
					// console.log(response.data);
					setDataUser(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [user]);

	// Error states for validation
	const [firstnameError, setFirstnameError] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [phoneError, setPhoneError] = useState('');

	// Track if data has changed
	const [isChanged, setIsChanged] = useState(false);

	// Validation functions
	const validateFirstname = () => {
		if (!firstname) setFirstnameError(`${t('validate.firstName')}`);
		else setFirstnameError('');
	};

	const validateLastname = () => {
		if (!lastname) setLastnameError(`${t('validate.lastName')}`);
		else setLastnameError('');
	};

	const validateEmail = () => {
		if (!email) setEmailError(`${t('validate.email')}`);
		else setEmailError('');
	};

	// const validatePhone = () => {
	// 	if (!phone) setPhoneError(`${t('validate.phone')}`);
	// 	else setPhoneError('');
	// };

	// Function to mask email
	const maskEmail = (email: string) => {
		const [localPart, domainPart] = email.split('@');
		const maskedLocal = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
		return `${maskedLocal}@${domainPart}`;
	};

	// Function to mask phone
	const maskPhone = (phone: string) => {
		return `*****${phone.slice(-2)}`;
	};

	// Save handler
	const handleSave = () => {
		// Tạo instance FormData
		const formData = new FormData();

		// Thêm dữ liệu từ dataUser vào FormData
		if (dataUser) {
			Object.keys(dataUser).forEach((key) => {
				const value = dataUser[key as keyof typeof dataUser];
				if (value !== undefined && value !== null) {
					formData.append(key, value.toString());
				}
			});
		}

		// Thêm file ảnh (nếu có)
		if (imageFile) {
			formData.append('avatar', imageFile); // "avatar" là tên field cho ảnh
		}

		// Kiểm tra dữ liệu trong FormData (Debugging)
		for (const pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		// Gửi FormData tới API
		axios
			.put(`${process.env.NEXT_PUBLIC_API}/users/${dataUser?.id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => {
				// Xử lý phản hồi thành công
				if (response.status === 200) {
					console.log('Cập nhật thành công:', response.data);
					alert('Cập nhật thành công!');
				} else {
					console.error('Cập nhật thất bại:', response.status);
					alert('Cập nhật thất bại!');
				}
			})
			.catch((error) => {
				// Xử lý lỗi
				console.error('Lỗi trong quá trình cập nhật:', error);
				alert('Đã xảy ra lỗi!');
			});
	};

	// Check if any data has changed
	useEffect(() => {
		const hasChanges =
			firstname !== userData.firstName ||
			lastname !== userData.lastName ||
			email !== userData.email ||
			// phone !== userData.phone ||
			avatar !== userData.avatar;

		const isAllFieldsFilled = !!(firstname && lastname && email && phone);

		setIsChanged(hasChanges && isAllFieldsFilled);
	}, [firstname, lastname, email, phone, avatar]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result;
				if (typeof result === 'string') {
					setImage(result);
				}
			};
			reader.readAsDataURL(file);

			setImageFile(file);
		}
	};

	return (
		<div className='flex justify-center'>
			<Card
				className={`mb-2 w-full rounded-t-none border-none p-3 pb-10 md:w-[90%] ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
			>
				<div className='mx-4 border-b-1 border-gray1 pb-4 text-sm'>
					<span className='text-xl font-bold'>{t('title')}</span> <br />
					{t('subTitle')}
				</div>
				<div className='mx-4 lg:mx-0'>
					<Row className='mt-4 flex h-fit flex-col flex-nowrap items-center justify-center gap-4 lg:flex-row'>
						<Col span={16} className='order-2 ml-3 flex h-fit flex-col gap-9 lg:order-1'>
							{/* Name Fields */}
							<div className='flex h-fit w-full flex-col gap-4 pl-4 md:pl-0 lg:flex-row'>
								{/* First Name and Last Name */}
								<Col className='flex w-full flex-1 items-center justify-between gap-4 lg:gap-4'>
									<span className='flex h-full w-32 items-center justify-start text-nowrap lg:min-w-6 lg:justify-end'>
										{t('firstName')}
									</span>
									<div className='h-10 w-full'>
										<Input
											className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 rounded-sm px-3 ${firstnameError ? 'border-2 border-primary' : ''}`}
											value={dataUser?.firstName}
											onChange={(e) => setFirstname(e.target.value)}
											onBlur={validateFirstname}
											placeholder={t('firstName')}
										/>
										{firstnameError && <div className='text-primary'>{firstnameError}</div>}
									</div>
								</Col>
								<Col className='flex w-full flex-1 items-center justify-between gap-4 lg:gap-2'>
									<span className='flex h-10 w-32 items-center justify-start text-nowrap lg:min-w-6 lg:justify-end'>
										{t('lastName')}
									</span>
									<div className='h-10 w-full'>
										<Input
											className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 rounded-sm px-3 ${lastnameError ? 'border-2 border-primary' : ''}`}
											value={dataUser?.lastName}
											onChange={(e) => setLastname(e.target.value)}
											onBlur={validateLastname}
											placeholder={t('lastName')}
										/>
										{lastnameError && <div className='text-primary'>{lastnameError}</div>}
									</div>
								</Col>
							</div>

							{/* Email Field */}
							<div className='h-fit w-full'>
								<Col className='flex h-fit w-full items-center justify-center gap-4'>
									<span className='flex h-10 w-32 items-center justify-end text-nowrap'>
										{t('email')}
									</span>
									<div className='flex h-10 w-full flex-nowrap'>
										{editEmail ? (
											<Input
												className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 rounded-sm px-3 ${emailError ? 'border-2 border-primary' : ''}`}
												value={dataUser?.email}
												onChange={(e) => setEmail(e.target.value)}
												onBlur={validateEmail}
												placeholder={t('email')}
											/>
										) : (
											<span className='flex h-10 flex-nowrap items-center rounded-sm'>
												{maskEmail(email)}{' '}
												<Button
													className='ml-5 h-10'
													type='link'
													onClick={() => setEditEmail(true)}
												>
													{t('change')}
												</Button>
											</span>
										)}
										{emailError && <div className='text-primary'>{emailError}</div>}
									</div>
								</Col>
							</div>

							{/* Phone Field */}
							{/* <div className='h-fit w-full'>
								<Col className='flex h-fit w-full items-center justify-center gap-4'>
									<span className='flex h-10 w-32 items-center justify-end text-nowrap'>
										{t('phone')}
									</span>
									<div className='flex h-10 w-full flex-nowrap'>
										{editPhone ? (
											<Input
												className={`flex h-10 rounded-sm px-3 ${phoneError ? 'border-2 border-primary bg-red-50' : ''}`}
												value={dataUser?.lastName}
												onChange={(e) => setPhone(e.target.value)}
												onBlur={validatePhone}
												placeholder={t('phone')}
											/>
										) : (
											<span className='flex h-10 flex-nowrap items-center rounded-sm'>
												{maskPhone(phone)}{' '}
												<Button
													className='ml-5 h-10'
													type='link'
													onClick={() => setEditPhone(true)}
												>
													{t('change')}
												</Button>
											</span>
										)}
										{phoneError && <div className='text-primary'>{phoneError}</div>}
									</div>
								</Col>
							</div> */}
						</Col>

						<Col className='order-1 flex w-full items-center justify-center border-b-1 border-gray1 lg:order-2 lg:mx-0 lg:border-b-0 lg:border-l-1'>
							<div className='flex w-full max-w-sm flex-col items-center justify-center gap-8 overflow-hidden py-10'>
								{' '}
								<div className='flex flex-col items-center'>
									<img
										src={
											dataUser?.avatar
												? dataUser?.avatar
												: image
													? image
													: 'https://via.placeholder.com/150'
										}
										alt='Profile'
										className='h-32 w-32 cursor-pointer rounded-full object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
										onClick={() => document.getElementById('fileInput')?.click()}
										style={{ flexShrink: 0 }}
									/>
									<div className='mt-4 flex items-center justify-center'>
										<input
											type='file'
											id='fileInput'
											accept='image/*'
											onChange={handleImageChange}
											className='hidden'
										/>
									</div>
								</div>
							</div>
						</Col>
					</Row>

					{/* Save Button */}
					<Row className='ml-[170px] mt-10 w-fit'>
						<Col>
							<Button
								type='primary'
								onClick={handleSave}
								className={`rounded-sm border-none px-5 py-5 text-base text-white ${isChanged ? 'pointer bg-[#ee4d2d]' : 'not-allowed bg-[#facac0]'}`}
								// disabled={!isChanged}
							>
								{t('save.button')}
							</Button>
						</Col>
					</Row>
				</div>
			</Card>
		</div>
	);
};

export default App;
