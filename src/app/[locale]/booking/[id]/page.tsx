'use client';

import React, { FC, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { MovieData } from '@/app/types/MovieDetail.type';
import { useParams } from 'next/navigation';
import Image from '@/app/components/Image';
import SeatSelection from '@/app/components/SeatSelection';

const movieData: MovieData = {
	id: '047c527d-7005-4609-9d21-c16e07e907ce',
	director: 'Võ Thanh Hòa',
	cast: 'Hùng Anh, Nhật Linh, Phương Duyên, Ngọc Trai, Vũ Long',
	releaseDate: '2024-12-27T00:00:00.000Z',
	duration: 110,
	language: 'Tiếng Việt',
	country: 'Vietnam',
	rating: 9,
	poster_url:
		'https://firebasestorage.googleapis.com/v0/b/be-cinemago-201024.appspot.com/o/movies%2F616f8c35-2d4d-4fdf-bbe1-d7180f0a30af-350x490.jpg?alt=media',
	trailer_url: '6z1BoUbB-fs',
	createdAt: '2024-12-10T10:56:47.251Z',
	updatedAt: '2024-12-10T10:56:47.251Z',
	translations: [
		{
			id: '1f74f803-88e2-4d8e-a3e7-47d67585fdb8',
			name: 'Kính Vạn Hoa',
			description:
				'A humorous and adventurous journey of a group of young friends as they discover fascinating aspects of life through a magical kaleidoscope.',
			categoryLanguage: {
				id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
				languageCode: 'en',
			},
		},
		{
			id: '93c1889c-88c3-418f-a5ab-e8ba04334c54',
			name: 'Kính Vạn Hoa',
			description:
				'Một hành trình hài hước và đầy phiêu lưu của nhóm bạn trẻ khi họ khám phá những điều thú vị trong cuộc sống qua một chiếc kính vạn hoa kỳ diệu.',
			categoryLanguage: {
				id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
				languageCode: 'vi',
			},
		},
	],
	genres: [],
	showTimes: [
		{
			id: '3869adbf-8833-4889-9bd8-b645ee4ff2ec',
			show_time_start: '2024-12-22T12:36:00.000Z',
			show_time_end: '2024-12-22T13:36:00.000Z',
			price: 10000,
			room: {
				id: '3cefc1de-d4a8-4a61-b0b4-5623de07b44e',
				name: 'A102',
				screeningType: 'standard',
				totalSeats: 50,
				branch: {
					id: 'f33d1eca-f16b-4052-8979-ee485f5cff61',
					email: 'cinemahbt@gmail.com',
					translations: [
						{
							id: '36a24d69-a9df-45ca-b938-b6b5a02961de',
							languageCode: 'vi',
							name: 'Cinestar Hai Bà Trưng',
							address: '125 Hai Bà Trưng, Quận 3',
							categoryLanguage: {
								id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							},
						},
						{
							id: '4205a202-4b23-4e8f-89f5-434942ba95b0',
							languageCode: 'en',
							name: 'Cinestar Hai Ba Trung',
							address: '125 Hai Ba Trung, District 3',
							categoryLanguage: {
								id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							},
						},
					],
				},
				seatMaps: [],
			},
		},
		{
			id: '889575cd-7b99-4c4e-b065-45f7f6d6d054',
			show_time_start: '2024-09-10T14:30:00.000Z',
			show_time_end: '2024-09-10T17:00:00.000Z',
			price: 150000,
			room: {
				id: 'a200dd9c-f7c2-4055-a8a5-2d7c3625630a',
				name: 'A107',
				screeningType: 'vip',
				totalSeats: 50,
				branch: {
					id: 'f33d1eca-f16b-4052-8979-ee485f5cff61',
					email: 'cinemahbt@gmail.com',
					translations: [
						{
							id: '36a24d69-a9df-45ca-b938-b6b5a02961de',
							languageCode: 'vi',
							name: 'Cinestar Hai Bà Trưng',
							address: '125 Hai Bà Trưng, Quận 3',
							categoryLanguage: {
								id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							},
						},
						{
							id: '4205a202-4b23-4e8f-89f5-434942ba95b0',
							languageCode: 'en',
							name: 'Cinestar Hai Ba Trung',
							address: '125 Hai Ba Trung, District 3',
							categoryLanguage: {
								id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							},
						},
					],
				},
				seatMaps: [
					{
						id: '11889327-e102-42d1-87e8-0f178c35c2f6',
						row: 'A',
						count: 10,
					},
					{
						id: '8e04e51b-bfce-438c-b6f5-b2fb4f07a44c',
						row: 'E',
						count: 10,
					},
					{
						id: '96ea1554-677d-463d-9a6d-3c72f62684e4',
						row: 'D',
						count: 10,
					},
					{
						id: 'bf3f1f99-f098-4c64-96bb-e175c85e547e',
						row: 'B',
						count: 10,
					},
					{
						id: 'cbaf5568-f70d-4892-867c-32e47b53ae4c',
						row: 'C',
						count: 10,
					},
				],
			},
		},
		{
			id: '9137b829-38ec-424e-8a60-00f0ed0bd856',
			show_time_start: '2024-12-21T11:34:00.000Z',
			show_time_end: '2024-12-21T12:34:00.000Z',
			price: 10000,
			room: {
				id: '1a09985f-08fe-4d99-bd74-b7233c77e6fc',
				name: 'A105',
				screeningType: '3d',
				totalSeats: 50,
				branch: {
					id: 'f33d1eca-f16b-4052-8979-ee485f5cff61',
					email: 'cinemahbt@gmail.com',
					translations: [
						{
							id: '36a24d69-a9df-45ca-b938-b6b5a02961de',
							languageCode: 'vi',
							name: 'Cinestar Hai Bà Trưng',
							address: '125 Hai Bà Trưng, Quận 3',
							categoryLanguage: {
								id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							},
						},
						{
							id: '4205a202-4b23-4e8f-89f5-434942ba95b0',
							languageCode: 'en',
							name: 'Cinestar Hai Ba Trung',
							address: '125 Hai Ba Trung, District 3',
							categoryLanguage: {
								id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							},
						},
					],
				},
				seatMaps: [],
			},
		},
		{
			id: 'a55e4322-ed0d-49ac-8f5f-61a7da49e7bf',
			show_time_start: '2024-12-20T08:30:00.000Z',
			show_time_end: '2024-12-20T08:30:00.000Z',
			price: 50000,
			room: {
				id: 'b2dc6f7b-0863-4fed-baeb-6ea8f96097f3',
				name: 'A103',
				screeningType: 'imax',
				totalSeats: 50,
				branch: {
					id: 'f33d1eca-f16b-4052-8979-ee485f5cff61',
					email: 'cinemahbt@gmail.com',
					translations: [
						{
							id: '36a24d69-a9df-45ca-b938-b6b5a02961de',
							languageCode: 'vi',
							name: 'Cinestar Hai Bà Trưng',
							address: '125 Hai Bà Trưng, Quận 3',
							categoryLanguage: {
								id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							},
						},
						{
							id: '4205a202-4b23-4e8f-89f5-434942ba95b0',
							languageCode: 'en',
							name: 'Cinestar Hai Ba Trung',
							address: '125 Hai Ba Trung, District 3',
							categoryLanguage: {
								id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							},
						},
					],
				},
				seatMaps: [],
			},
		},
		{
			id: 'a8b2df63-3c5f-462d-a095-baebd56e5b8f',
			show_time_start: '2024-12-21T15:35:00.000Z',
			show_time_end: '2024-12-21T16:35:00.000Z',
			price: 10000,
			room: {
				id: 'f45742c5-897e-4cd2-a14a-16705169c41d',
				name: 'A106',
				screeningType: '3d',
				totalSeats: 30,
				branch: {
					id: 'f33d1eca-f16b-4052-8979-ee485f5cff61',
					email: 'cinemahbt@gmail.com',
					translations: [
						{
							id: '36a24d69-a9df-45ca-b938-b6b5a02961de',
							languageCode: 'vi',
							name: 'Cinestar Hai Bà Trưng',
							address: '125 Hai Bà Trưng, Quận 3',
							categoryLanguage: {
								id: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							},
						},
						{
							id: '4205a202-4b23-4e8f-89f5-434942ba95b0',
							languageCode: 'en',
							name: 'Cinestar Hai Ba Trung',
							address: '125 Hai Ba Trung, District 3',
							categoryLanguage: {
								id: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							},
						},
					],
				},
				seatMaps: [],
			},
		},
	],
	comments: [
		{
			id: '4e544841-158d-4997-9f63-c7726ba46453',
			rating: 10,
			comment: 'good',
			createdAt: '2024-12-19T02:09:15.582Z',
			user: {
				id: 'a31e7721-aec5-4ec5-b65b-dd96516732d6',
				firstName: 'Minh ',
				lastName: 'Trí',
				email: '20522047@gm.uit.edu.vn',
				avatar: null,
			},
		},
	],
};

const BookingPage: FC = () => {
	const locale = useLocale();
	const param = useParams();
	const id = param.id as string;
	const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
	const [selectShowTime, setSelectShowTime] = useState<any>(null);
	const [price, setPrice] = useState({
		adult: {
			price: 0,
			quantity: 0,
		},
		student: {
			price: 0,
			quantity: 0,
		},
	});
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	console.log(selectedSeats);
	const translation = movieData.translations.find(
		(t) => t.categoryLanguage.languageCode === locale,
	);

	// Lọc danh sách các rạp (branch)
	const branches = Array.from(
		new Map(
			movieData.showTimes.map((showTime) => {
				const branch = showTime.room.branch.translations.find((t) => t.languageCode === locale);
				return [branch?.id, { branch, showTimeId: showTime.room.branch.id }];
			}),
		).values(),
	);

	// Lọc các suất chiếu theo rạp đã chọn
	const filteredShowTimes = selectedBranchId
		? movieData.showTimes.filter((showTime) => showTime.room.branch.id === selectedBranchId)
		: [];

	const handleSelectShowTime = (value: any) => setSelectShowTime(value);

	console.log(selectShowTime);

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
					quantity: Math.max(0, newQuantity), // Ensure quantity doesn't go below 0
				},
			};
		});
	};
	useEffect(() => {
		if (selectShowTime) {
			setPrice({
				adult: {
					price: selectShowTime.price * 1.3,
					quantity: 0, // Initialize the quantity to 0
				},
				student: {
					price: selectShowTime.price,
					quantity: 0, // Initialize the quantity to 0
				},
			});
		}
	}, [selectShowTime]);
	return (
		<div className='container mx-auto my-10'>
			<div className='flex w-full'>
				<Image src={movieData.poster_url} className='max-h-20' />
				<h1>{translation?.name || 'No title available'}</h1>
			</div>

			<div>
				<h1>Danh sách rạp</h1>
				<select
					className='w-full rounded border px-4 py-2'
					onChange={(e) => {
						setSelectedBranchId(e.target.value);
					}}
					value={selectedBranchId || ''}
				>
					<option value=''>Chọn rạp</option>
					{branches.map(({ branch, showTimeId }) => (
						<option key={branch?.id} value={showTimeId}>
							{branch?.name || 'Unknown Theater'}
						</option>
					))}
				</select>
			</div>

			{/* Hiển thị các suất chiếu của rạp đã chọn */}
			{selectedBranchId && filteredShowTimes.length > 0 ? (
				<div>
					<ul>
						{filteredShowTimes.map((showTime) => (
							<li key={showTime.id} onClick={() => handleSelectShowTime(showTime)}>
								{new Date(showTime.show_time_start).toLocaleString()} - {showTime.price} VND
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>Chưa có suất chiếu nào cho rạp này.</p>
			)}

			{/* Chon ve */}
			<div>
				<h1>Chon loai ve</h1>
				{selectShowTime && (
					<div>
						<div>
							<h3>Nguoi lon</h3>
							<p>{selectShowTime.price * 1.3}</p>
							<div>
								<p onClick={() => handleQuantityChange('adult', 'increment')}>+</p>
								<p>{price.adult.quantity}</p>
								<p onClick={() => handleQuantityChange('adult', 'decrement')}>-</p>
							</div>
						</div>
						<div>
							<h3>HSSV</h3>
							<p>{selectShowTime.price}</p>
							<div>
								<p onClick={() => handleQuantityChange('student', 'increment')}>+</p>
								<p>{price.student.quantity}</p>
								<p onClick={() => handleQuantityChange('student', 'decrement')}>-</p>
							</div>
						</div>
					</div>
				)}
			</div>
			<div>
				{price.adult.quantity > 0 && (
					<div>
						<SeatSelection
							seatMap={selectShowTime.room.seatMaps}
							selectedSeats={selectedSeats} // Pass selectedSeats prop
							setSelectedSeats={setSelectedSeats} // Pass the setter function for selected seats
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookingPage;
