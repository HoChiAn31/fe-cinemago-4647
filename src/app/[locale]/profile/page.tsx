'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col, Button } from 'antd';
import './style.css';

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
	const [imageLoad, setImageLoad] = useState<string>();
	const [image, setImage] = useState<string | undefined>();
	const [imageFile, setImageFile] = useState<File | undefined>();

	const [editEmail, setEditEmail] = useState(false);
	const [editPhone, setEditPhone] = useState(false);

	// Error states for validation
	const [firstnameError, setFirstnameError] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [phoneError, setPhoneError] = useState('');

	// Track if data has changed
	const [isChanged, setIsChanged] = useState(false);

	// Validation functions
	const validateFirstname = () => {
		if (!firstname) setFirstnameError('Vui lòng nhập Họ');
		else setFirstnameError('');
	};

	const validateLastname = () => {
		if (!lastname) setLastnameError('Vui lòng nhập Tên');
		else setLastnameError('');
	};

	const validateEmail = () => {
		if (!email) setEmailError('Vui lòng nhập Email');
		else setEmailError('');
	};

	const validatePhone = () => {
		if (!phone) setPhoneError('Vui lòng nhập Số điện thoại');
		else setPhoneError('');
	};

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
		// Add save logic here
		alert('Thông tin đã được lưu!');
	};

	// Check if any data has changed
	useEffect(() => {
		const hasChanges =
			firstname !== userData.firstName ||
			lastname !== userData.lastName ||
			email !== userData.email ||
			phone !== userData.phone ||
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
		<div>
			<Card className='w-[90%] p-3 pb-10'>
				<div className='mx-4 border-b-1 border-gray2 pb-4 text-sm'>
					<span className='text-xl font-bold'>Hồ Sơ Của Tôi</span> <br />
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</div>
				<Row className='mt-4 flex h-fit flex-nowrap items-center justify-center gap-4'>
					<Col span={16} className='ml-3 flex h-fit flex-col gap-9'>
						{/* Name Fields */}
						<div className='grid h-fit grid-cols-2'>
							<Col className='grid h-fit grid-cols-2 items-center justify-center gap-2'>
								<span className='col-span-1 flex h-full items-center justify-end text-nowrap pr-2'>
									Họ
								</span>
								<div className='col-span-1 h-10'>
									<Input
										className={`h-10 rounded-sm px-3 ${firstnameError ? 'border-2 border-primary bg-red-50' : ''}`}
										value={firstname}
										onChange={(e) => setFirstname(e.target.value)}
										onBlur={validateFirstname}
										placeholder='Họ'
									/>
									{firstnameError && <div className='text-primary'>{firstnameError}</div>}
								</div>
							</Col>
							<Col className='grid h-fit grid-cols-4 items-center justify-center gap-4'>
								<span className='col-span-1 flex h-10 items-center justify-end text-nowrap'>
									Tên
								</span>
								<div className='col-span-3 h-10'>
									<Input
										className={`h-10 rounded-sm px-3 ${lastnameError ? 'border-2 border-primary bg-red-50' : ''}`}
										value={lastname}
										onChange={(e) => setLastname(e.target.value)}
										onBlur={validateLastname}
										placeholder='Tên'
									/>
									{lastnameError && <div className='text-primary'>{lastnameError}</div>}
								</div>
							</Col>
						</div>

						{/* Email Field */}
						<div className='h-fit'>
							<Col className='grid h-fit grid-cols-4 items-center justify-center gap-4'>
								<span className='col-span-1 flex h-10 items-center justify-end text-nowrap'>
									Email
								</span>
								<div className='col-span-3 h-10'>
									{editEmail ? (
										<Input
											className={`h-10 rounded-sm px-3 ${emailError ? 'border-2 border-primary bg-red-50' : ''}`}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											onBlur={validateEmail}
											placeholder='Email'
										/>
									) : (
										<span className='h-10 rounded-sm'>
											{maskEmail(email)}{' '}
											<Button className='ml-5 h-10' type='link' onClick={() => setEditEmail(true)}>
												Thay đổi
											</Button>
										</span>
									)}
									{emailError && <div className='text-primary'>{emailError}</div>}
								</div>
							</Col>
						</div>

						{/* Phone Field */}
						<div className='h-fit'>
							<Col className='grid h-fit grid-cols-4 items-center justify-center gap-4'>
								<span className='col-span-1 flex h-10 items-center justify-end text-nowrap'>
									Số điện thoại
								</span>
								<div className='col-span-3 h-10'>
									{editPhone ? (
										<Input
											className={`h-10 rounded-sm px-3 ${phoneError ? 'border-2 border-primary bg-red-50' : ''}`}
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											onBlur={validatePhone}
											placeholder='Số điện thoại'
										/>
									) : (
										<span className='h-10 rounded-sm'>
											{maskPhone(phone)}{' '}
											<Button className='ml-5 h-10' type='link' onClick={() => setEditPhone(true)}>
												Thay đổi
											</Button>
										</span>
									)}
									{phoneError && <div className='text-primary'>{phoneError}</div>}
								</div>
							</Col>
						</div>
					</Col>
					<Col span={8} className='flex items-center justify-center border-l-1 border-gray2'>
						<div className='flex flex-col items-center justify-center gap-8 py-10'>
							<div className='flex flex-col items-center'>
								<img
									src={imageLoad ? imageLoad : image ? image : 'https://via.placeholder.com/150'}
									alt='Profile'
									className='h-32 w-32 cursor-pointer rounded-full object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
									onClick={() => document.getElementById('fileInput')?.click()}
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
							disabled={!isChanged}
						>
							Lưu
						</Button>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default App;
