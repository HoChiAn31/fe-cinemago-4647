'use client';

import React, { FC, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MovieData } from '@/app/types/MovieDetail.type';
import { Showtime } from '@/app/types/Showtime.type';
import { useParams, usePathname } from 'next/navigation';
import Image from '@/app/components/Image';
import SeatSelection from '@/app/components/SeatSelection';
import PopCornSelection from '@/app/components/PopCornSelection';
import { beverage } from '@/app/modules/data';
import Links from '@/app/components/Links';
import axios from 'axios';
import Loading from '@/app/components/Loading';

const BookingPage: FC = () => {
	const [movie, setMovie] = useState<MovieData>({} as MovieData);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
	const [selectShowTime, setSelectShowTime] = useState<Showtime | null>(null);
	const [showTicketSelection, setShowTicketSelection] = useState(false);
	const [price, setPrice] = useState({
		adult: { price: 0, quantity: 0 },
		student: { price: 0, quantity: 0 },
	});
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
	const [foods, setFoods] = useState<{ id: string; quantity: number; price: number }[]>([]);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const locale = useLocale();
	const { id } = useParams();
	const pathname = usePathname();
	const t = useTranslations('Booking');

	const totalFoodPrice = foods.reduce((total, food) => {
		const product = beverage.find((b) => b.id === food.id);
		const productPrice = product ? Number(product.price) : 0;
		return total + productPrice * food.quantity;
	}, 0);

	const totalTicketPrice =
		price.adult.quantity * price.adult.price + price.student.quantity * price.student.price;

	const totalAmount = totalTicketPrice + totalFoodPrice;

	const totalTickets = price.adult.quantity + price.student.quantity;

	const handleSaveToLocalStorage = () => {
		if (!selectedBranchId || !selectShowTime || selectedSeats.length === 0) {
			return;
		}
		const orderDetails = {
			movie: translation?.name,
			branch:
				branches.find((branch) => branch.showTimeId === selectedBranchId)?.branch?.name ||
				t('noSelected'),
			showTime: selectShowTime ? new Date(selectShowTime.show_time_start).toLocaleString() : '',
			seats: selectedSeats,
			foods,
			totalAmount,
		};
		localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
	};

	const translation = movie.translations?.find((t) => t.categoryLanguage.languageCode === locale);

	const branches = movie.showTimes
		? Array.from(
				new Map(
					movie.showTimes.map((showTime) => {
						const branch = showTime?.room?.branch?.translations?.find(
							(t) => t.languageCode === locale,
						);
						return [branch?.id, { branch, showTimeId: showTime?.room?.branch?.id }];
					}),
				).values(),
			)
		: [];

	const filteredShowTimes = selectedBranchId
		? movie.showTimes.filter((showTime) => showTime.room.branch.id === selectedBranchId)
		: [];

	const groupByDate = (showTimes: Showtime[]) => {
		return showTimes.reduce(
			(groups, showTime) => {
				const date = new Date(showTime.show_time_start);
				const day = date.toLocaleDateString(locale, {
					day: '2-digit',
					month: '2-digit',
				});
				const weekday = date.toLocaleDateString(locale, {
					weekday: 'long',
				});

				if (!groups[day]) {
					groups[day] = { weekday, showTimes: [] };

					groups[day].showTimes.push(showTime);
				}
				return groups;
			},
			{} as Record<string, { weekday: string; showTimes: Showtime[] }>,
		);
	};

	const groupedShowTimes = groupByDate(filteredShowTimes);

	const sortedGroupedShowTimes = Object.keys(groupedShowTimes)
		.sort((a, b) => {
			const dateA = new Date(a.split('/').reverse().join('-'));
			const dateB = new Date(b.split('/').reverse().join('-'));
			return dateA.getTime() - dateB.getTime();
		})
		.reduce(
			(sortedGroups, date) => {
				sortedGroups[date] = groupedShowTimes[date];
				return sortedGroups;
			},
			{} as Record<string, { weekday: string; showTimes: Showtime[] }>,
		);

	const handleSelectShowTime = (value: any) => setSelectShowTime(value);

	const handleDateSelect = (date: string) => {
		setSelectedDate(date);
		setSelectShowTime(null);
	};

	const handleQuantityChange = (
		type: 'adult' | 'student',
		operation: 'increment' | 'decrement',
	) => {
		setPrice((prevPrice) => {
			const newQuantity =
				operation === 'increment' ? prevPrice[type].quantity + 1 : prevPrice[type].quantity - 1;
			return {
				...prevPrice,
				[type]: {
					...prevPrice[type],
					quantity: Math.max(0, newQuantity),
				},
			};
		});
	};

	useEffect(() => {
		if (id) {
			setIsLoading(true);

			axios
				.get(`${process.env.NEXT_PUBLIC_API}/movies/${id}`, {
					params: {
						languageCode: locale,
					},
				})
				.then((res) => {
					const movieData = res.data;
					setMovie(movieData);
					setIsLoading(true);
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
				});
		}
	}, [id, locale]);

	useEffect(() => {
		if (selectedBranchId) {
			setSelectedDate(null);
			setSelectShowTime(null);
			setSelectedSeats([]);
			setFoods([]);
			setPrice({
				adult: {
					price: 0,
					quantity: 0,
				},
				student: {
					price: 0,
					quantity: 0,
				},
			});
			setShowTicketSelection(false);
			localStorage.removeItem('orderDetails');
		}
	}, [selectedBranchId]);

	useEffect(() => {
		setSelectShowTime(null);
		setSelectedSeats([]);
		setFoods([]);
		setPrice({
			adult: {
				price: 0,
				quantity: 0,
			},
			student: {
				price: 0,
				quantity: 0,
			},
		});
		setShowTicketSelection(false);
		localStorage.removeItem('orderDetails');
	}, [selectedDate]);

	useEffect(() => {
		if (selectShowTime) {
			setSelectedSeats([]);
			setFoods([]);
			setPrice({
				adult: {
					price: selectShowTime.price * 1.3,
					quantity: 0,
				},
				student: {
					price: selectShowTime.price,
					quantity: 0,
				},
			});
			setShowTicketSelection(true);
		}
	}, [selectShowTime]);

	useEffect(() => {
		setIsButtonDisabled(
			!selectedBranchId ||
				!selectShowTime ||
				totalTickets === 0 ||
				selectedSeats.length !== totalTickets,
		);
	}, [selectedSeats, totalTickets, selectedBranchId, selectShowTime]);

	useEffect(() => {
		if (pathname !== '/booking' && pathname !== '/payment-pay') {
			localStorage.removeItem('orderDetails');
		}
	}, [pathname]);

	if (!isLoading) return <Loading />;

	return (
		<div className='container mx-auto my-10 flex flex-col gap-10'>
			<div className='flex w-full items-center gap-20 px-10'>
				<Image src={movie.poster_url} className='max-h-20 rounded-sm lg:max-h-40' />
				<h1 className='text-8xl font-extrabold uppercase'>
					{translation?.name || 'No title available'}
				</h1>
			</div>

			{/* Chọn rạp */}
			<div className='flex flex-col items-center justify-center gap-8'>
				<h1 className='text-4xl font-extrabold uppercase'>{t('branch')}</h1>
				<select
					className='w-full rounded border px-4 py-5 text-lg'
					onChange={(e) => {
						const selectedBranch = e.target.value;
						setSelectedBranchId(selectedBranch);
						if (!selectedBranch) {
							setShowTicketSelection(false);
						}
					}}
					value={selectedBranchId || ''}
					disabled={branches.length === 0}
				>
					{branches.length === 0 ? (
						<option value=''>{t('noShowtimesAvailable')}</option>
					) : (
						<>
							<option value=''>{t('optionBranch')}</option>
							{branches.map(({ branch, showTimeId }) => (
								<option key={branch?.id} value={showTimeId} className='text-lg'>
									{branch?.name || t('noNameBranch')}
								</option>
							))}
						</>
					)}
				</select>
			</div>

			{/* Hiển thị các ngày */}
			{selectedBranchId && Object.keys(groupedShowTimes).length > 0 && (
				<div className='flex flex-col items-center justify-center gap-20'>
					<div className='flex flex-col items-center justify-center gap-8'>
						<h1 className='text-4xl font-extrabold uppercase'>{t('branch')}</h1>

						<div className='flex space-x-4'>
							{Object.keys(sortedGroupedShowTimes).map((date) => {
								const { weekday } = sortedGroupedShowTimes[date];
								return (
									<button
										key={date}
										onClick={() => handleDateSelect(date)}
										className={`rounded border-2 p-5 text-xl font-bold hover:bg-red-400 ${
											selectedDate === date ? 'bg-red-500 text-white hover:bg-red-500' : ''
										}`}
									>
										<div className='flex w-32 flex-col'>
											<div>{date}</div>
											<div>{weekday}</div>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Hiển thị suất chiếu của ngày đã chọn */}
					{selectedDate && groupedShowTimes[selectedDate]?.showTimes.length > 0 ? (
						<div className='flex flex-col items-center justify-center gap-8'>
							<h1 className='text-4xl font-extrabold uppercase'>{t('branch')}</h1>

							<div className='flex space-x-4'>
								{groupedShowTimes[selectedDate].showTimes
									.sort(
										(a, b) =>
											new Date(a.show_time_start).getTime() - new Date(b.show_time_start).getTime(),
									)
									.map((showTime) => (
										<div key={showTime.id} className='flex items-center gap-10'>
											<button
												onClick={() => handleSelectShowTime(showTime)}
												className={`rounded border-2 px-5 py-3 text-xl font-bold hover:bg-red-400 ${
													selectShowTime?.id === showTime.id
														? 'bg-red-500 text-white hover:bg-red-500'
														: ''
												}`}
											>
												{new Date(showTime.show_time_start).toLocaleTimeString('en-GB', {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</button>
										</div>
									))}
							</div>
						</div>
					) : (
						<p>{t('noShowtime')}</p>
					)}
				</div>
			)}

			{/* Chọn vé */}
			<div>
				{showTicketSelection && selectShowTime && (
					<div className='flex flex-col items-center justify-center gap-5'>
						<h1 className='text-4xl font-extrabold uppercase'>{t('ticket')}</h1>
						<div className='flex gap-40 text-xl'>
							<div className='group flex flex-col items-center justify-center gap-5 rounded border p-5 px-20'>
								<h3 className='text-2xl font-bold group-hover:text-primary'>{t('adult')}</h3>
								<p>{selectShowTime.price * 1.3} VND</p>
								<div className='flex items-center justify-center gap-5 rounded bg-slate-400'>
									<p
										onClick={() => handleQuantityChange('adult', 'decrement')}
										className='w-20 rounded py-3 text-center hover:text-primary'
									>
										-
									</p>
									<p>{price.adult.quantity}</p>
									<p
										onClick={() => handleQuantityChange('adult', 'increment')}
										className='w-20 rounded py-3 text-center hover:text-primary'
									>
										+
									</p>
								</div>
							</div>

							<div className='group flex flex-col items-center justify-center gap-5 rounded border p-5 px-20'>
								<h3 className='text-2xl font-bold group-hover:text-primary'>{t('student')}</h3>
								<p>{selectShowTime.price} VND</p>
								<div className='flex items-center justify-center gap-5 rounded bg-slate-400'>
									<p
										onClick={() => handleQuantityChange('student', 'decrement')}
										className='w-20 rounded py-3 text-center hover:text-primary'
									>
										-
									</p>
									<p>{price.student.quantity}</p>
									<p
										onClick={() => handleQuantityChange('student', 'increment')}
										className='w-20 rounded py-3 text-center hover:text-primary'
									>
										+
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Chọn ghế */}
			<div>
				{selectedBranchId
					? (price.adult.quantity > 0 || price.student.quantity > 0) && (
							<div className='flex flex-col items-center gap-5'>
								<h1 className='text-4xl font-extrabold uppercase'>{t('seat')}</h1>
								{selectShowTime?.room?.seatMaps ? (
									<SeatSelection
										seatMap={selectShowTime.room.seatMaps}
										selectedSeats={selectedSeats}
										setSelectedSeats={setSelectedSeats}
									/>
								) : (
									<p className='text-gray-500 text-center text-xl'>Vui lòng chọn lịch chiếu.</p>
								)}
							</div>
						)
					: null}
			</div>

			{/* Chọn đồ ăn */}
			<div>
				{selectedBranchId && selectedSeats.length > 0 && (
					<div className='flex w-full flex-col items-center gap-5'>
						<h1 className='text-4xl font-extrabold uppercase'>{t('food')}</h1>
						<PopCornSelection beverages={beverage} foods={foods} setQuantities={setFoods} />
					</div>
				)}
			</div>

			{/* Tổng tiền */}
			<div className='fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-between border-t-1 bg-[#4A4A4A] p-4 text-white md:flex-row'>
				{/* Thông tin đã chọn */}
				<div className='text-md ml-5 flex h-fit flex-col gap-1'>
					{translation?.name && (
						<p className='mb-3 text-3xl font-extrabold uppercase text-primary'>
							{translation.name}
						</p>
					)}

					{selectedBranchId && (
						<p className=''>
							{branches.find((branch) => branch.showTimeId === selectedBranchId)?.branch?.name ||
								t('noSelected')}
							{(price.adult.quantity > 0 || price.student.quantity > 0) && ' | '}
							{price.adult.quantity > 0 && `${price.adult.quantity} - ${t('adult')}`}
							{price.adult.quantity > 0 && price.student.quantity > 0 && ', '}
							{price.student.quantity > 0 && `${price.student.quantity} ${t('student')}`}
						</p>
					)}

					{selectedBranchId && selectedSeats.length > 0 && selectShowTime?.room?.name ? (
						<p>
							<strong>{t('room')}:</strong> {selectShowTime.room.name} | {selectedSeats.join(', ')}{' '}
							|{' '}
							{new Date(selectShowTime.show_time_start).toLocaleDateString('en-GB', {
								day: '2-digit',
								month: '2-digit',
							})}{' '}
							-{' '}
							{new Date(selectShowTime.show_time_start).toLocaleTimeString('vi-VN', {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							})}
						</p>
					) : (
						<p>{t('noRoom')}</p>
					)}

					{selectedBranchId && Object.keys(foods).length > 0 && (
						<div>
							<ul>
								{foods.map((food) => {
									const product = beverage.find((b) => b.id === food.id);
									const productName =
										product?.translations.find((t) => t.categoryLanguage.languageCode === locale)
											?.name || t('noItem');
									return (
										<li key={food.id}>
											{food.quantity} - {productName}
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</div>

				{/* Giá tiền */}
				<div className='flex flex-col items-end justify-between gap-3'>
					<div className='flex items-center justify-between gap-10'>
						<p className='text-sm'>{t('price')}:</p>
						<div className='flex gap-1 text-xl'>
							<p>{selectedBranchId ? totalAmount.toLocaleString() : 0}</p>
							<p>VND</p>
						</div>
					</div>
					<Links
						className={`w-full rounded px-4 py-2 text-center text-white ${
							isButtonDisabled
								? 'cursor-not-allowed bg-red-500 opacity-50'
								: 'bg-red-500 hover:bg-red-600'
						}`}
						disabled={isButtonDisabled}
						href='/payment-pay'
						onClick={(e) => {
							if (isButtonDisabled) {
								e.preventDefault();
							} else {
								handleSaveToLocalStorage();
							}
						}}
					>
						{t('button')}
					</Links>
				</div>
			</div>
		</div>
	);
};
export default BookingPage;
