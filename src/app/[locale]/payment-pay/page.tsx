'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Divider } from 'antd';
import { useLocale, useTranslations } from 'next-intl';

import { useUser } from '@/app/context/UserContext';
import { useTheme } from '@/app/context/ThemeContext';
import { BeverageProps } from '@/app/types/Beverage.type';
import Loading from '@/app/components/Loading';
import Button from '@/app/components/Button';

const stripePromise = loadStripe(
	'pk_test_51QLqlw00phqwBHh4kTvBMZhiLnDHO0iqAH4lGsrfMRsxuN7f5kuGiSUtcxBLQVl2EE7z4b4kHZtsX0bG2MqxgFSr003ukeQSSi',
);

const PaymentPage: React.FC = () => {
	const [stripe, setStripe] = useState<Stripe | null>(null);
	const [elements, setElements] = useState<any>(null);
	const [clientSecret, setClientSecret] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [beverage, setBeverage] = useState<BeverageProps[]>([]);

	const { user } = useUser();
	const locale = useLocale();
	const t = useTranslations('Payment');
	const { isDarkMode } = useTheme();

	// console.log(user?.id);

	// Lấy data từ page đặt vé
	const detail = localStorage.getItem('orderDetails')
		? JSON.parse(localStorage.getItem('orderDetails') as string)
		: null;

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
			setClientSecret(data.clientSecret);
		};

		initializeStripe();
	}, []);

	useEffect(() => {
		if (stripe && clientSecret) {
			const elementsInstance = stripe.elements();
			const cardElement = elementsInstance.create('card');

			// Kiểm tra xem phần tử #card-element đã tồn tại trên DOM chưa
			const cardElementContainer = document.getElementById('card-element');
			if (cardElementContainer) {
				cardElement.mount('#card-element');
				setElements(elementsInstance);
			}
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements || !clientSecret) {
			console.error('Stripe.js not loaded properly');
			return;
		}

		const cardElement = elements.getElement('card');

		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
			},
		});

		if (error) {
			console.error('Payment failed:', error.message);
		} else {
			console.log('Payment successful:', paymentIntent);
			alert(t('paymentSuccess'));
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
						/>

						<input
							type='email'
							id='email'
							name='email'
							placeholder={t('emailPlaceholder')}
							className='border-gray-300 w-full border-b-1 bg-transparent py-2 focus:outline-none'
							required
						/>

						<input
							type='tel'
							id='phone'
							name='phone'
							placeholder={t('phonePlaceholder')}
							className='border-gray-300 w-full border-b-1 bg-transparent py-2 focus:outline-none'
							required
						/>
					</form>
				</div>

				{/* Thanh toán trực tuyến */}
				<div
					className={`flex w-full flex-col items-center rounded border-2 border-black bg-dark p-5 ${isDarkMode ? '' : ''}`}
				>
					<h2>{t('onlinePayment')}</h2>
					<form onSubmit={handleSubmit} className='flex w-full flex-col gap-3'>
						<div
							id='card-element'
							style={{ border: '1px solid #ccc' }}
							className='border-1 border-solid border-white p-5'
						></div>
						<div className='flex w-full items-center justify-center'>
							<Button
								type='submit'
								className={`text-nowrap rounded-md border-[0.1rem] border-second bg-primary px-9 py-3 transition duration-200 hover:bg-white hover:text-second`}
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
					<h2 className='text-2xl font-semibold'>{detail?.movie}</h2>

					<div className='flex'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('time')}</h2>
							<p className='text-lg font-semibold'>
								{new Date(detail.showTime).toLocaleTimeString('vi-VN', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								})}
							</p>
						</div>

						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('date')}</h2>
							<p className='text-lg font-semibold'>
								{new Date(detail.showTime).toLocaleDateString('en-GB', {
									day: '2-digit',
									month: '2-digit',
								})}
							</p>
						</div>
					</div>

					<div className='w-full'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('cinema')}</h2>
							<p className='text-lg font-semibold'>{detail.branch}</p>
						</div>
					</div>

					<div className='flex w-full'>
						<div className='flex w-1/2 flex-col items-start'>
							<h2 className='text-md uppercase tracking-tighter'>{t('room')}</h2>
							<p className='text-lg font-semibold'>{detail.room}</p>
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
									const totalPrice = ticket.quantity * ticket.price;
									return (
										<div
											key={index}
											className='flex w-full items-end justify-between text-lg font-semibold'
										>
											<div className='flex gap-2'>
												<p className='w-4'>{ticket.quantity}</p>
												<p>x</p>
												<p>{t(ticket.type)}</p>
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
												.find((b) => b.id === f.id)
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
