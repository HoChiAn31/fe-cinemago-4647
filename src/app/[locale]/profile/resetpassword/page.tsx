'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const userData = {
	id: '1',
	firstName: 'Nguyễn',
	lastName: 'Văn A',
	email: 'hotrilake@gmail.com',
	password: '1',
	phone: '123456789',
	refreshToken: null,
	role: 'user',
	avatar: null,
	status: 1,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

const App: React.FC = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [newPasswordError, setNewPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
	const [isChanged, setIsChanged] = useState(false);
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const validateOldPassword = () => {
		if (oldPassword !== userData.password) {
			setPasswordError('Mật khẩu cũ không chính xác');
			setIsOldPasswordValid(false);
		} else {
			setPasswordError('');
			setIsOldPasswordValid(true);
		}
	};

	const validateNewPassword = () => {
		if (!newPassword) {
			setNewPasswordError('Vui lòng nhập mật khẩu mới');
		} else if (newPassword === oldPassword) {
			setNewPasswordError('Mật khẩu mới không được trùng với mật khẩu cũ');
		} else {
			setNewPasswordError('');
		}
	};

	const validateConfirmPassword = () => {
		if (newPassword !== confirmPassword) {
			setConfirmPasswordError('Mật khẩu xác nhận không khớp');
			setIsConfirmPasswordValid(false);
		} else {
			setConfirmPasswordError('');
			setIsConfirmPasswordValid(true);
		}
	};

	useEffect(() => {
		if (isOldPasswordValid && newPassword && newPassword === confirmPassword) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [isOldPasswordValid, newPassword, confirmPassword]);

	const handlePasswordChange = () => {
		if (isChanged) {
			toast.success(`Mã OTP đã được gửi đến email của bạn`);
			setTimeout(() => {
				setIsModalVisible(true);
				onOpen();
			}, 1000);
		} else {
			toast.error('Vui lòng kiểm tra lại thông tin!');
		}
	};

	const handleOtpSubmit = () => {
		if (otp === '') {
			// Giả định mã OTP đúng là '123456'
			toast.success('Mật khẩu đã được thay đổi thành công!');
			setTimeout(() => {
				setIsModalVisible(false);
				onOpenChange();
				setOldPassword('');
				setNewPassword('');
				setConfirmPassword('');
			}, 1500);
		} else {
			setOtpError('Mã OTP không chính xác. Vui lòng thử lại.');
		}
	};

	return (
		<div>
			<Card className='w-[90%] p-3 pb-10'>
				<div className='mx-4 border-b-1 border-gray2 pb-4 text-sm'>
					<span className='text-xl font-bold'>Hồ Sơ Của Tôi</span> <br />
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</div>
				<Row className='mr-44 mt-4 flex items-center justify-center'>
					<div className='flex h-fit flex-col gap-9'>
						{/* Mật khẩu cũ */}
						<Col className='flex h-fit items-center justify-center gap-4'>
							<span className='flex h-10 w-32 items-center justify-end text-nowrap'>
								Mật khẩu cũ
							</span>
							<div className='relative h-10 w-80'>
								<div className='relative flex items-center justify-center'>
									<Input.Password
										className={`h-10 rounded-sm px-3 ${passwordError ? 'border-2 border-primary bg-red-50' : isOldPasswordValid ? 'border-2 border-green-500 bg-green-50' : ''}`}
										value={oldPassword}
										onChange={(e) => {
											setOldPassword(e.target.value);
											setPasswordError('');
											setIsOldPasswordValid(false);
										}}
										onBlur={validateOldPassword}
									/>
									{isOldPasswordValid && (
										<CheckCircleOutlined className='absolute -right-5 text-green-500' />
									)}
								</div>
								{passwordError && <div className='text-primary'>{passwordError}</div>}
							</div>
						</Col>

						{/* Mật khẩu mới */}
						<Col className='flex h-fit items-center justify-center gap-4'>
							<span className='flex h-10 w-32 items-center justify-end text-nowrap'>
								Mật khẩu mới
							</span>
							<div className='relative h-10 w-80'>
								<Input.Password
									className={`h-10 w-full rounded-sm px-3 ${newPasswordError ? 'border-2 border-primary bg-red-50' : ''}`}
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
										setConfirmPassword('');
										setIsConfirmPasswordValid(false);
									}}
									onBlur={validateNewPassword}
									disabled={!isOldPasswordValid}
								/>
								{newPasswordError && <div className='text-primary'>{newPasswordError}</div>}
							</div>
						</Col>

						{/* Xác nhận mật khẩu mới */}
						<Col className='flex h-fit items-center justify-center gap-4'>
							<span className='flex h-10 w-32 items-center justify-end text-nowrap'>
								Xác nhận mật khẩu mới
							</span>
							<div className='relative h-10 w-80'>
								<div className='relative flex items-center justify-center'>
									<Input.Password
										className={`h-10 w-full rounded-sm px-3 ${confirmPasswordError ? 'border-2 border-primary bg-red-50' : isConfirmPasswordValid ? 'border-2 border-green-500 bg-green-50' : ''}`}
										value={confirmPassword}
										onChange={(e) => {
											setConfirmPassword(e.target.value);
											setConfirmPasswordError('');
											setIsConfirmPasswordValid(false);
										}}
										onBlur={validateConfirmPassword}
										disabled={!isOldPasswordValid}
									/>
									{isConfirmPasswordValid && (
										<CheckCircleOutlined className='absolute -right-5 text-green-500' />
									)}
								</div>
								{confirmPasswordError && <div className='text-primary'>{confirmPasswordError}</div>}
							</div>
						</Col>

						{/* Nút xác nhận */}
						<Col className='flex h-10 items-center justify-center'>
							<Button
								onClick={handlePasswordChange}
								className={`rounded-sm border-none px-5 py-5 text-base text-white ${isChanged ? 'pointer bg-[#ee4d2d]' : 'not-allowed bg-[#facac0]'}`}
							>
								Xác nhận
							</Button>
						</Col>
					</div>
				</Row>
			</Card>

			{/* Modal nhập OTP */}
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} className='mt-10'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Nhập mã OTP</ModalHeader>
							<ModalBody>
								<Input
									className='mb-4 flex h-10 w-full flex-col items-center justify-center rounded-sm px-3'
									placeholder='Nhập mã OTP'
									value={otp}
									onChange={(e) => {
										setOtp(e.target.value);
										setOtpError('');
									}}
								/>
								{otpError && <div className='text-primary'>{otpError}</div>}
							</ModalBody>
							<ModalFooter className='flex items-center justify-center'>
								<Button color='primary' onPress={handleOtpSubmit} className='rounded-sm'>
									Xác nhận
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Toaster />
		</div>
	);
};

export default App;
