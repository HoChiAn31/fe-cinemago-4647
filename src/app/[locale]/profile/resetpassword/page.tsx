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
import { useTranslations } from 'next-intl';
import Axios from '@/app/utils/axios';
import { useUser } from '@/app/context/UserContext';
import useDebounce from '@/app/hook/useDebounce';
import axios from 'axios';
import { useTheme } from '@/app/context/ThemeContext';

// const userData = {
// 	id: '1',
// 	firstName: 'Nguyễn',
// 	lastName: 'Văn A',
// 	email: 'hotrilake@gmail.com',
// 	password: '1',
// 	phone: '123456789',
// 	refreshToken: null,
// 	role: 'user',
// 	avatar: null,
// 	status: 1,
// 	createdAt: new Date().toISOString(),
// 	updatedAt: new Date().toISOString(),
// };

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
	// const [isModalVisible, setIsModalVisible] = useState(false);
	const debouncedSearchQuery = useDebounce(oldPassword, 300);
	// const [isValid, setIsValid]=useState<boolean>(false)
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const t = useTranslations('UserProfile.reset');
	const { user } = useUser();
	const { isDarkMode } = useTheme();

	const validateOldPassword = () => {
		if (!isOldPasswordValid) {
			setPasswordError(`${t('validate.oldPass')}`);
		} else {
			setPasswordError('');
		}
	};

	const validateNewPassword = () => {
		if (!newPassword) {
			setNewPasswordError(`${t('validate.newPass.none')}`);
		} else if (newPassword === oldPassword) {
			setNewPasswordError(`${t('validate.newPass.same')}`);
		} else {
			setNewPasswordError('');
		}
	};

	const validateConfirmPassword = () => {
		if (newPassword !== confirmPassword) {
			setConfirmPasswordError(`${t('validate.confirm')}`);
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

	useEffect(() => {
		if (oldPassword) {
			Axios.post(`${process.env.NEXT_PUBLIC_API}/users/${user?.id}/check-password`, {
				password: oldPassword,
			})
				.then((response) => {
					setIsOldPasswordValid(response.data.isValid);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [debouncedSearchQuery]);
	console.log(user);

	const handlePasswordChange = () => {
		console.log(newPassword);
		console.log(user?.email);
		if (isChanged) {
			toast.success(`${t('modal.sendOtp')}`);
			axios.post(`${process.env.NEXT_PUBLIC_API}/auth/send-otp`, {
				email: user?.email,
			});
			setTimeout(() => {
				// setIsModalVisible(true);
				onOpen();
			}, 1000);
		} else {
			toast.error(`${t('modal.sendError')}`);
		}
	};

	const handleOtpSubmit = async () => {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/verify-otp`, {
			otp: otp,
			email: user?.email,
		});
		if (res.data === 'OTP201') {
			await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/reset-password`, {
				email: user?.email,
				otp,
				newPassword: newPassword,
			});
			toast.success(`${t('modal.success')}`);
			setTimeout(() => {
				// setIsModalVisible(false);
				onOpenChange();
				setOldPassword('');
				setNewPassword('');
				setConfirmPassword('');
			}, 1500);
		} else {
			setOtpError(`${t('modal.error')}`);
		}
	};

	return (
		<div className='flex justify-center'>
			<Card
				className={`w-full rounded-t-none border-none pb-10 lg:w-[90%] ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
			>
				<div className='p-3'>
					<div className='mx-4 border-b-1 border-gray1 pb-4 text-sm'>
						<span className='text-xl font-bold'>{t('title')}</span> <br />
						{t('subTitle')}
					</div>
				</div>
				<div className=''>
					<Row className='mr-auto mt-4 flex items-center px-4 md:mr-10 lg:items-center lg:justify-center'>
						<div className='mx-3 flex h-fit w-full flex-col gap-9 lg:items-start lg:justify-center'>
							{/* Mật khẩu cũ */}
							<Col className='flex h-fit flex-col items-center justify-center gap-2 md:w-full md:flex-row md:gap-4'>
								<span className='flex h-10 w-full items-center justify-start text-nowrap font-bold md:min-w-40'>
									{t('oldPass')}
								</span>
								<div className='relative h-10 w-full'>
									<div className='relative flex items-center justify-center'>
										<Input.Password
											className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 rounded-md px-3 ${passwordError ? 'border-2 border-primary' : isOldPasswordValid ? 'border-2 border-green-500' : ''} focus:outline-none`}
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
									{passwordError && <div className='text-xs text-primary'>{passwordError}</div>}
								</div>
							</Col>

							{/* Mật khẩu mới */}
							<Col className='flex h-fit flex-col items-center justify-center gap-2 md:w-full md:flex-row md:gap-4'>
								<span className='flex h-10 w-full items-center justify-start text-nowrap font-bold md:min-w-40'>
									{t('newPass')}
								</span>
								<div className='relative h-10 w-full'>
									<Input.Password
										className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 w-full rounded-md px-3 ${newPasswordError ? 'border-2 border-primary' : ''}`}
										value={newPassword}
										onChange={(e) => {
											setNewPassword(e.target.value);
											setConfirmPassword('');
											setIsConfirmPasswordValid(false);
										}}
										onBlur={validateNewPassword}
										disabled={!isOldPasswordValid}
									/>
									{newPasswordError && (
										<div className='text-xs text-primary'>{newPasswordError}</div>
									)}
								</div>
							</Col>

							{/* Xác nhận mật khẩu mới */}
							<Col className='flex h-fit flex-col items-center justify-center gap-2 md:w-full md:flex-row md:gap-4'>
								<span className='flex h-10 w-full items-center justify-start text-nowrap font-bold md:min-w-40'>
									{t('confirm')}
								</span>
								<div className='relative h-10 w-full'>
									<div className='relative flex w-full items-center justify-center'>
										<Input.Password
											className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} h-10 w-full rounded-md px-3 ${confirmPasswordError ? 'border-2 border-primary' : isConfirmPasswordValid ? 'border-2 border-green-500' : ''}`}
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
									{confirmPasswordError && (
										<div className='text-xs text-primary'>{confirmPasswordError}</div>
									)}
								</div>
							</Col>

							{/* Nút xác nhận */}
							<div className='flex w-full items-center justify-center'>
								<Col className='flex h-10 items-center justify-center'>
									<Button
										onClick={handlePasswordChange}
										className={`rounded-sm border-none px-5 py-5 text-base text-white ${isChanged ? 'pointer bg-[#ee4d2d]' : 'not-allowed bg-[#facac0]'}`}
									>
										{t('button')}
									</Button>
								</Col>
							</div>
						</div>
					</Row>
				</div>
			</Card>

			{/* Modal nhập OTP */}
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} className='pt-0 md:mt-10'>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{t('modal.otp')}</ModalHeader>
							<ModalBody>
								<Input
									className={`mb-4 flex h-10 w-full flex-col items-center justify-center rounded-md border-transparent px-3 ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
									// placeholder={t('modal.otp')}
									value={otp}
									onChange={(e) => {
										setOtp(e.target.value);
										setOtpError('');
									}}
								/>
								{otpError && <div className='text-primary'>{otpError}</div>}
							</ModalBody>
							<ModalFooter className='flex items-center justify-center'>
								<Button color='primary' onPress={handleOtpSubmit} className='rounded-md'>
									{t('button')}
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
