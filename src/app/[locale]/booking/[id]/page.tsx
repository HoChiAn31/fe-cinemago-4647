'use client';

import React, { FC, useState } from 'react';
import { useLocale } from 'next-intl';
import { MovieData } from '@/app/types/MovieDetail.type';
import { useParams } from 'next/navigation';
import Image from '@/app/components/Image';

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
			},
		},
		// Các suất chiếu khác...
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

	const translation = movieData.translations.find(
		(t) => t.categoryLanguage.languageCode === locale,
	);

	const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

	// Lọc danh sách các rạp (branch)
	const branches = Array.from(
		new Map(
			movieData.showTimes.map((showTime) => {
				const branch = showTime.room.branch.translations.find((t) => t.languageCode === locale);
				return [branch?.id, branch];
			}),
		).values(),
	);

	// Lọc các suất chiếu theo rạp đã chọn
	const filteredShowTimes = selectedBranchId
		? movieData.showTimes.filter((showTime) =>
				showTime.room.branch.translations.some((t) => t.id === selectedBranchId),
			)
		: [];

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
					onChange={(e) => setSelectedBranchId(e.target.value)}
					value={selectedBranchId || ''}
				>
					<option value=''>Chọn rạp</option>
					{branches.map((branch) => (
						<option key={branch?.id} value={branch?.id}>
							{branch?.name || 'Unknown Theater'}
						</option>
					))}
				</select>
			</div>

			{/* Hiển thị các suất chiếu của rạp đã chọn */}
			{selectedBranchId && filteredShowTimes.length > 0 ? (
				<div>
					<h2>Suất chiếu tại rạp {branches.find((b) => b?.id === selectedBranchId)?.name}</h2>
					<ul>
						{filteredShowTimes.map((showTime) => (
							<li key={showTime.id}>
								{new Date(showTime.show_time_start).toLocaleString()} - {showTime.price} VND
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>Chưa có suất chiếu nào cho rạp này.</p>
			)}
		</div>
	);
};

export default BookingPage;
