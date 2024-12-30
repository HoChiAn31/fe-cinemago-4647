'use client';

import React, { FC, useState } from 'react';
import { Divider } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import QRCode from 'react-qr-code';
import Image from '@/app/components/Image';
import { formatDate } from '@/app/utils/format.utils';
import { useTheme } from '@/app/context/ThemeContext';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface Item {
	id: string;
	movie: {
		title: string;
		date: string;
		showtime: string;
	};
	branch: string;
	room: string;
	quantity: number;
	ticket: {
		seat: string[];
		price: number;
	};
	totalPrice: number;
	paymentStatus: string;
	image: string;
	food: {
		name: string;
		quantity: number;
		price: number;
	}[];
}

const formatCurrencyVND = (amount: number): string => {
	return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const DetailCart: FC = () => {
	const t = useTranslations('Cart');
	const { id } = useParams();
	const { isDarkMode } = useTheme();

	const items: Item[] = [
		{
			id: '1',
			movie: {
				title: 'Avengers: Endgame',
				date: '2024-12-25',
				showtime: '19:00',
			},
			branch: 'Cinemago - Hà Nội',
			room: 'Phòng VIP 1',
			quantity: 2,
			ticket: {
				seat: ['A5', 'A6'],
				price: 250000,
			},
			totalPrice: 500000,
			paymentStatus: 'completed',
			image: 'https://via.placeholder.com/100',
			food: [
				{ name: 'Bắp rang bơ', quantity: 10, price: 50000 },
				{ name: 'Nước ngọt', quantity: 2, price: 30000 },
			],
		},
		{
			id: '2',
			movie: {
				title: 'Spider-Man: No Way Home',
				date: '2024-12-26',
				showtime: '21:00',
			},
			branch: 'Cinemago - Đà Nẵng',
			room: 'Phòng Thường 2',
			quantity: 1,
			ticket: {
				seat: ['B3'],
				price: 300000,
			},
			totalPrice: 300000,
			paymentStatus: 'cancelled',
			image: 'https://via.placeholder.com/100',
			food: [
				{ name: 'Bắp caramel', quantity: 1, price: 60000 },
				{ name: 'Trà sữa', quantity: 1, price: 50000 },
			],
		},
		{
			id: '3',
			movie: {
				title: 'The Dark Knight',
				date: '2024-12-27',
				showtime: '18:00',
			},
			branch: 'Cinemago - TP.HCM',
			room: 'Phòng VIP 3',
			quantity: 4,
			ticket: {
				seat: ['C10', 'C11', 'C12', 'C13'],
				price: 300000,
			},
			totalPrice: 1200000,
			paymentStatus: 'return',
			image: 'https://via.placeholder.com/100',
			food: [
				{ name: 'Khoai tây chiên', quantity: 3, price: 90000 },
				{ name: 'Nước cam', quantity: 4, price: 40000 },
			],
		},
		{
			id: '4',
			movie: {
				title: 'Inception',
				date: '2024-12-28',
				showtime: '20:00',
			},
			branch: 'Cinemago - Cần Thơ',
			room: 'Phòng Thường 1',
			quantity: 3,
			ticket: {
				seat: ['D2', 'D3', 'D4'],
				price: 300000,
			},
			totalPrice: 900000,
			paymentStatus: 'completed',
			image: 'https://via.placeholder.com/100',
			food: [
				{ name: 'Hotdog', quantity: 2, price: 80000 },
				{ name: 'Coca-Cola', quantity: 3, price: 35000 },
			],
		},
	];
	const router = useRouter();
	// Tìm item theo id
	const item = items.find((item) => item.id === String(id));

	if (!item) {
		return <div>{t('noProduct')}</div>;
	}
	const handleBack = () => {
		router.back();
	};

	return (
		<div
			className={`mx-auto flex items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${isDarkMode ? 'bg-dark text-white' : 'bg-white'} `}
		>
			<div className='flex w-1/2 flex-col gap-10 p-5'>
				{/* <Button
					className='border text-base'
					variant='bordered'
					startContent={<ChevronLeft height={20} width={20} />}
					color='primary'
					onClick={handleBack}
					radius='sm'
				>
					{t('back')}
				</Button> */}
				<div className='-mt-8 flex items-center justify-start'>
					<div
						onClick={handleBack}
						className='flex cursor-pointer items-center justify-center rounded-md border border-primary px-2 py-1 text-primary hover:opacity-65'
					>
						<ChevronLeft height={20} width={20} /> <p>Quay lại</p>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex w-full flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<h1 className='text-xl font-bold'>{item.movie.title}</h1>
							<div className='flex w-32 justify-end'>
								<p
									className={`h-fit w-fit rounded px-2 py-1 ${
										item.paymentStatus === 'completed'
											? 'bg-green-200 text-green-800'
											: item.paymentStatus === 'cancelled'
												? 'bg-red-200 text-red-800'
												: 'bg-yellow-200 text-yellow-800'
									}`}
								>
									{item.paymentStatus === 'completed'
										? t('status.completed')
										: item.paymentStatus === 'cancelled'
											? t('status.cancelled')
											: t('status.return')}
								</p>
							</div>
						</div>

						<Divider className='my-0' />

						<div className='flex flex-col gap-3'>
							<div className='flex'>
								<div className='flex w-1/2 flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('time')}</h2>
									<p className='text-lg font-semibold'>{item.movie.showtime}</p>
								</div>

								<div className='flex w-1/2 flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('date')}</h2>
									<p className='text-lg font-semibold'>{formatDate(item.movie.date)}</p>
								</div>
							</div>

							<div>
								<h2 className='text-md uppercase tracking-tighter'>{t('branch')}</h2>
								<p className='text-lg font-semibold'>{item.branch}</p>
							</div>

							<div className='flex'>
								<div className='flex w-1/2 flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('room')}</h2>
									<p className='text-lg font-semibold'>{item.room}</p>
								</div>

								<div className='flex w-1/2 flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('quantity')}</h2>
									<p className='text-lg font-semibold'>{item.quantity}</p>
								</div>
							</div>
						</div>

						<Divider className='my-0' />

						<div className='flex flex-col gap-3'>
							<div className='flex items-end justify-between'>
								<div className='flex flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('seat')}</h2>
									<p className='text-lg font-semibold'>{item.ticket.seat.join(', ')}</p>
								</div>

								<p className='text-lg font-semibold'>{formatCurrencyVND(item.ticket.price)}</p>
							</div>

							<div className='flex w-full items-end'>
								<div className='flex w-full flex-col items-start'>
									<h2 className='text-md uppercase tracking-tighter'>{t('food')}</h2>
									{item.food.map((f, index) => (
										<div
											key={index}
											className='flex w-full items-end justify-between text-lg font-semibold'
										>
											<div className='flex gap-2'>
												<p className='w-4'>{f.quantity}</p>

												<p>x</p>

												<p>{f.name}</p>
											</div>

											<div>
												<p>{formatCurrencyVND(f.price)}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<Divider className='my-0' />

						<div className='flex items-end justify-between text-lg font-semibold'>
							<h2>{t('total')}</h2>
							<p>{formatCurrencyVND(item.totalPrice)}</p>
						</div>
					</div>
				</div>
			</div>

			<div className='relative flex h-full w-1/2 justify-center'>
				<Image src={item.image} className='h-full w-full' />
				<div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2'>
					<QRCode value={String(item.id)} className='w-1/2' />
					<p className='line-clamp-2 px-5 text-center text-sm text-white'>{t('qr')}</p>
				</div>
			</div>
		</div>
	);
};

export default DetailCart;
