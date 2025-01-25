'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Divider } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import customAxios from '@/app/utils/axios';
import { useUser } from '@/app/context/UserContext';
import { useTheme } from '@/app/context/ThemeContext';
import { BeverageProps } from '@/app/types/Beverage.type';
import Loading from '@/app/components/Loading';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import { User } from '@/app/types/User.type';

const stripePromise = loadStripe(
	'pk_test_51QLqlw00phqwBHh4kTvBMZhiLnDHO0iqAH4lGsrfMRsxuN7f5kuGiSUtcxBLQVl2EE7z4b4kHZtsX0bG2MqxgFSr003ukeQSSi',
);
const errorMessages: { [key: string]: string } = {
	invalid_number: 'Số thẻ không hợp lệ.',
	invalid_expiry_month: 'Tháng hết hạn không hợp lệ.',
	invalid_expiry_year: 'Năm hết hạn không hợp lệ.',
	invalid_cvc: 'Mã CVC không hợp lệ.',
	expired_card: 'Thẻ đã hết hạn.',
	incorrect_cvc: 'Mã CVC không chính xác.',
	incomplete_number: 'Số thẻ chưa đầy đủ.',
	incomplete_expiry: 'Ngày hết hạn chưa đầy đủ.',
	incomplete_cvc: 'Mã CVC chưa đầy đủ.',
	card_declined: 'Thẻ bị từ chối.',
	processing_error: 'Đã xảy ra lỗi xử lý thanh toán.',
	rate_limit: 'Có quá nhiều yêu cầu. Vui lòng thử lại sau.',
};

const translateError = (errorCode: string): string => {
	return errorMessages[errorCode] || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
};
const PaymentPage: React.FC = () => {
	const cardElementContainer = useRef(null);
	const [stripe, setStripe] = useState<Stripe | null>(null);
	const [elements, setElements] = useState<any>(null);
	const [clientSecret, setClientSecret] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [beverage, setBeverage] = useState<BeverageProps[]>([]);
	const [dataUser, setDataUser] = useState<User>();
	// const [isLoading, setIsLoaing] = useState<boolean>(false);
	const { user } = useUser();
	const locale = useLocale();
	const t = useTranslations('Payment');
	const { isDarkMode } = useTheme();
	const router = useRouter();

	// Lấy data từ page đặt vé
	const detail = localStorage.getItem('orderDetails')
		? JSON.parse(localStorage.getItem('orderDetails') as string)
		: null;
	useEffect(() => {
		if (user?.id?.trim()) {
			console.log(1);
			axios
				.get(`${process.env.NEXT_PUBLIC_API}/users/${user?.id}`)
				.then((response) => {
					setDataUser(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [user?.id]);
	// Fetch clientSecret từ backend
	useEffect(() => {
		const initializeStripe = async () => {
			const stripeInstance = await stripePromise;
			setStripe(stripeInstance);
			const response = await fetch('http://localhost:5000/stripe/create-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: 5000, currency: 'usd' }),
			});
			const data = await response.json();
			console.log(data);
			setClientSecret(data.clientSecret);
		};

		initializeStripe();
		setIsLoading(true);
	}, []);

	useEffect(() => {
		if (stripe && clientSecret) {
			const elementsInstance = stripe.elements();
			const cardElement = elementsInstance.create('card');
			cardElement.mount('#card-element');
			setElements(elementsInstance);
		}
	}, [stripe, clientSecret]);

	// Lấy API đồ ăn, nước uống
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/food-drinks/`, {
				params: {
					languageCode: locale,
				},
			})
			.then((res) => {
				const food = res.data.data;
				setBeverage(food);
				setIsLoading(true);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
			});
	}, [locale]);
	// console.log('user', user?.id);

	// console.log('detail', detail);

	const totalQuantity = detail.ticket.reduce(
		(sum: number, ticketItem: any) => sum + ticketItem.quantity,
		0,
	);

	// console.log('data', data);
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// Kiểm tra xem Stripe.js đã được tải đúng chưa
		if (!stripe || !elements || !clientSecret) {
			console.error('Stripe.js not loaded properly');
			alert('Stripe không được tải đúng cách.');
			return;
		}

		// Lấy phần tử thẻ tín dụng
		const cardElement = elements.getElement('card');

		// Xác nhận thanh toán
		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
			},
		});

		if (error) {
			// Xử lý lỗi nếu có
			const translatedError = translateError(error.code || '');
			console.error('Payment failed:', error.message);
			alert(`Thanh toán thất bại: ${translatedError}`);
		} else if (paymentIntent && paymentIntent.status === 'succeeded') {
			// Thanh toán thành công
			console.log('Payment successful:', paymentIntent);
			if (user?.id !== null) {
				const data = {
					foodDrinks: detail.foods,
					payment: {
						paymentMethod: 'Online',
						paymentAmount: detail.totalAmount,
						paymentStatus: 'Confirmed',
					},
					bookingDetails: {
						seatNumber: detail.seats,
						price: detail.totalAmount,
						quantity: totalQuantity,
						booking: '',
						tickets: [],
						foodDrinks: [],
					},
					booking: {
						user: user?.id,
						totalTickets: totalQuantity,
						totalAmount: detail.totalAmount,
						payment: '',
						showTimes: detail.showTime.id,
						movie: detail.movie.id,
					},
					tickets: detail.ticket,
				};
				// Gửi yêu cầu tạo booking
				console.log(data);
				try {
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_API}/bookings/create-booking`,
						data,
					);
					console.log('response.data', response.data);
					router.push(`/${locale}/payment-status`);

					// Xóa dữ liệu orderDetails sau khi tạo booking
					localStorage.removeItem('orderDetails');
				} catch (error) {
					// Xử lý lỗi khi gọi API tạz`o booking
					console.error('Error creating booking:', error);
				}
			}
		} else {
			// Nếu paymentIntent không thành công
			console.error('Payment failed, unexpected status:', paymentIntent?.status);
			alert('Thanh toán không thành công. Vui lòng thử lại.');
		}
	};

	// Format tiền
	const formatCurrencyVND = (amount: number): string => {
		return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
	};

	// Chưa lấy được data
	if (!isLoading)
		return (
			<div className='my-10'>
				<Loading />
			</div>
		);

	return (
		<div className='container mx-auto my-10 flex gap-10'>
			{/* Điền thông tin */}
			<div className='flex w-3/4 flex-col items-center gap-3 text-white'>
				{/* Thông tin liên lạc */}
				<div
					className={`flex w-full flex-col gap-4 rounded border-black p-5 ${isDarkMode ? 'border-2 bg-dark' : 'border-1 text-dark'}`}
				>
					<h1 className='text-xl font-semibold'>{t('enterContactInfo')}</h1>

					<Divider
						dashed
						className={`my-0 ${isDarkMode ? 'border-white' : 'border-black shadow-sm shadow-orange-300'}`}
					/>

					<form className='flex flex-col gap-3'>
						<input
							type='text'
							id='fullName'
							name='fullName'
							placeholder={t('fullNamePlaceholder')}
							className='border-gray-300 w-full border-b-1 bg-transparent py-2 focus:outline-none'
							required
							value={dataUser?.firstName ? dataUser?.firstName + dataUser?.lastName : ''}
						/>

						<input
							type='email'
							id='email'
							name='email'
							placeholder={t('emailPlaceholder')}
							className='border-gray-300 w-full border-b-1 bg-transparent py-2 focus:outline-none'
							required
							value={dataUser?.email ? dataUser?.email : ''}
						/>
					</form>
				</div>

				{/* Thanh toán trực tuyến */}
				<div
					className={`flex w-full flex-col items-center rounded border-2 border-black bg-white p-5 ${isDarkMode ? '' : ''}`}
				>
					<h2>{t('onlinePayment')}</h2>

					<form onSubmit={handleSubmit} className='flex w-full flex-col gap-3'>
						<div
							id='card-element'
							ref={cardElementContainer}
							style={{ border: '1px solid #ccc' }}
							className='rounded-md border-1 border-solid border-gray1 p-5 !text-white'
						></div>
						<div className='flex w-full items-center justify-center'>
							<Button
								type='submit'
								onClick={handleSubmit}
								className={`cursor-pointer text-nowrap rounded-md border-[0.1rem] border-second bg-primary px-9 py-3 transition duration-200 hover:bg-white hover:text-second`}
							>
								{t('submitPayment')}
							</Button>
						</div>
					</form>
				</div>
			</div>

			{/* Chi tiết vé */}
			<div
				className={`flex w-1/4 flex-col gap-3 text-dark ${isDarkMode ? 'bg-white' : 'border-1 border-black shadow-sm shadow-orange-300'} rounded-sm p-3 px-6`}
			>
				{/* Header */}
				<div className='flex w-full items-center justify-center'>
					<h1 className='text-2xl font-bold uppercase'>{t('ticketDetails')}</h1>
				</div>

				<Divider dashed className='my-0 border-dark' />

				{/* Thông tin phim */}
				<div className='flex flex-col gap-2'>
					<h2 className='text-nowrap text-2xl font-semibold'>{detail?.movie.name}</h2>

					<div className='flex'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('time')}</h2>
							<p className='text-lg font-semibold'>
								{new Date(detail.showTime.time).toLocaleTimeString('vi-VN', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								})}
							</p>
						</div>

						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('date')}</h2>
							<p className='text-lg font-semibold'>
								{new Date(detail.showTime.time).toLocaleDateString('en-GB', {
									day: '2-digit',
									month: '2-digit',
								})}
							</p>
						</div>
					</div>

					<div className='w-full'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('cinema')}</h2>
							<p className='text-nowrap text-lg font-semibold'>{detail.branch}</p>
						</div>
					</div>

					<div className='flex w-full'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('room')}</h2>
							<p className='text-lg font-semibold'>{detail.room.name}</p>
						</div>

						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('quantity')}</h2>
							<p className='text-lg font-semibold'>{detail.quantity}</p>
						</div>
					</div>
				</div>

				<Divider dashed className='my-0 border-dark' />

				{/* Loại vé */}
				<div className='flex flex-col gap-3'>
					<div className='flex items-end justify-between'>
						<div className='flex flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('seat')}</h2>
							<p className='text-lg font-semibold'>
								{detail?.seats?.length ? detail.seats.join(', ') : ''}
							</p>
						</div>
					</div>

					<div className='w-full'>
						<div className='flex flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('ticketType')}</h2>
							{detail?.ticket
								.filter((ticket: any) => ticket.quantity > 0)
								.map((ticket: any, index: number) => {
									const totalPrice = ticket.quantity * ticket.ticketPrice;
									return (
										<div
											key={index}
											className='flex w-full items-end justify-between text-lg font-semibold'
										>
											<div className='flex gap-2'>
												<p className='w-4'>{ticket.quantity}</p>
												<p>x</p>
												<p>{t(ticket.ticketType)}</p>
											</div>
											<div>
												<p>{formatCurrencyVND(totalPrice)}</p>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>

				<Divider dashed className='my-0 border-dark' />

				{detail?.foods?.length > 0 && (
					<div className='flex w-full flex-col gap-3'>
						<h2 className='text-md uppercase tracking-tighter'>{t('snackDrink')}</h2>
						<div>
							{detail.foods.map((f: any, index: number) => (
								<div
									key={index}
									className='flex w-full items-end justify-between text-lg font-semibold'
								>
									<div className='flex gap-2'>
										<p className='w-4'>{f.quantity}</p>
										<p>x</p>
										<p>
											{beverage
												.find((b) => b.id === f.foodDrinksId)
												?.translations.find((t) => t.categoryLanguage.languageCode === locale)
												?.name || t('noItem')}
										</p>
									</div>
									<div>
										<p>{formatCurrencyVND(f.price * f.quantity)}</p>
									</div>
								</div>
							))}
						</div>

						<Divider dashed className='my-0 border-dark' />
					</div>
				)}

				<div className='flex items-end justify-between'>
					<h2 className='text-md uppercase tracking-tighter'>{t('totalAmount')}</h2>
					<p className='text-lg font-semibold'>{formatCurrencyVND(detail.totalAmount)}</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
