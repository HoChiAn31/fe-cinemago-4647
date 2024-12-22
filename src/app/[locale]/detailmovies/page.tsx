'use client';

import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from '@/app/context/ThemeContext';
import { MovieData } from '@/app/types/MovieDetail.type';
import Image from '@/app/components/Image';
import { formatCommentDate } from '@/app/utils/formatCommentDate.utils';
import Links from '@/app/components/Links';

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

const currentUserEmail = 'a';

const MovieDetailPage: React.FC = () => {
	const t = useTranslations('Detail');
	const locale = useLocale();
	const { isDarkMode } = useTheme();

	const translation = movieData.translations.find(
		(t) => t.categoryLanguage.languageCode === locale,
	);

	const [isPopupOpen, setIsPopupOpen] = useState<string | null>(null);
	const [editedComment, setEditedComment] = useState<{
		commentId: string;
		text: string;
		rating: number;
	} | null>(null);
	const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
	const dotsRef = React.useRef<HTMLDivElement | null>(null);
	const [formattedDate, setFormattedDate] = useState<string | null>(null);

	const handlePopupToggle = (commentId: string) => {
		if (dotsRef.current) {
			const { top, left, height } = dotsRef.current.getBoundingClientRect();
			setPopupPosition({
				top: top + height + window.scrollY + 10,
				left: left + window.scrollX - 180,
			});
		}
		setIsPopupOpen(isPopupOpen === commentId ? null : commentId);
	};

	const handleEdit = (commentId: string, currentComment: string, currentRating: number) => {
		setEditedComment({ commentId, text: currentComment, rating: currentRating });
		setIsPopupOpen(null);
	};

	const handleUpdate = () => {
		if (editedComment) {
			const updatedComments = movieData.comments.map((comment) =>
				comment.id === editedComment.commentId
					? { ...comment, comment: editedComment.text, rating: editedComment.rating }
					: comment,
			);
			movieData.comments = updatedComments;
			localStorage.setItem('movieData', JSON.stringify(movieData));
			setEditedComment(null);
		}
	};

	const handleDelete = (commentId: string) => {
		const updatedComments = movieData.comments.filter((comment) => comment.id !== commentId);
		movieData.comments = updatedComments;
		localStorage.setItem('movieData', JSON.stringify(movieData));
		setIsPopupOpen(null);
	};

	useEffect(() => {
		const date = new Date(movieData.releaseDate);
		setFormattedDate(date.toLocaleDateString());
	}, []);

	return (
		<div className='min-h-screen text-white'>
			<div className='container mx-auto flex w-full flex-col gap-6 p-4 lg:w-[60%]'>
				{/* Header Section */}
				<div className='flex h-fit flex-col items-center gap-10 md:flex-row md:items-stretch lg:flex-row'>
					<img
						src={movieData.poster_url}
						alt={translation?.name || 'No title available'}
						className='max-h-96 w-fit rounded-lg md:max-h-[450px] lg:max-h-[500px] lg:w-2/5'
					/>
					<div className='flex w-full flex-col gap-5 lg:max-h-[500px] lg:w-3/5'>
						<h1 className='text-3xl font-bold text-yellow-500'>
							{translation?.name || 'No title available'}
						</h1>
						<div className='flex h-full flex-col justify-between rounded border-2 border-black bg-dark px-4 py-2'>
							<div className='flex flex-col gap-4'>
								<p>
									{t('labels.director')}: {movieData.director}
								</p>
								<p>
									{t('labels.cast')}: {movieData.cast}
								</p>
								{formattedDate ? (
									<p>
										{t('labels.releaseDate')}: {formattedDate}
									</p>
								) : (
									<p>''</p>
								)}
								<p>
									{t('labels.duration')}: {movieData.duration} {t('labels.minutes')}
								</p>
								<p>
									{t('labels.language')}: {movieData.language}
								</p>
							</div>
							<div className='mb-2 mt-5 flex items-center justify-center'>
								<Links
									href={`/booking/${movieData.id}`}
									className={`text-nowrap rounded-md border-[0.1rem] border-second bg-primary px-9 py-3 transition duration-200 hover:bg-white ${isDarkMode ? 'text-white hover:text-second' : 'text-dark'}`}
								>
									{t('button.order')}
								</Links>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-6 rounded border-2 border-black bg-dark p-4'>
					{/* Content Section */}
					<div className='flex flex-col gap-4'>
						<h2 className='text-xl font-semibold text-yellow-500'>{t('labels.description')}</h2>
						<p>{translation?.description || 'No description available'}</p>
					</div>

					{/* Video Section */}
					<div className='flex flex-col gap-4 rounded border-1 border-black bg-dark p-4'>
						<h2 className='text-xl font-semibold text-yellow-500'>
							{translation?.name} - Trailer{' '}
						</h2>
						<iframe
							className='h-80 w-full rounded'
							src={`https://www.youtube.com/embed/${movieData.trailer_url}`}
							title={translation?.name || 'YouTube video'}
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						></iframe>
					</div>
				</div>

				{/* Comment Section */}
				<div className='flex flex-col gap-6 rounded border-2 border-black bg-dark p-4'>
					<h2 className='text-xl font-semibold text-yellow-500'>{t('labels.comment')}</h2>
					{/* Upload Comment */}
					<div className='flex items-start gap-2 rounded bg-white p-2'>
						<Image
							src='https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg'
							alt='name'
							className='h-10 w-10 lg:h-14 lg:w-14'
						/>
						<div className='w-full'>
							<form className='flex flex-col gap-2'>
								<input
									className='w-full rounded bg-slate-100 p-1 px-2 text-xs text-black hover:bg-slate-200 md:p-3 md:px-5 md:text-base'
									placeholder={t('form.comment')}
								></input>
								<div className='flex items-center gap-1'>
									<input
										className='w-16 rounded bg-slate-100 px-1 py-2 text-xs text-black hover:bg-slate-200 md:w-20 md:text-base'
										placeholder={t('form.rate')}
									></input>
									<p className='font-bold text-black md:text-xl'>/10</p>
								</div>
							</form>
						</div>
						<Button
							href='#'
							className={`text-nowrap rounded-full bg-red-500 px-3 py-1 text-xs font-normal transition duration-200 hover:bg-red-400 md:px-7 md:py-2 md:text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}
						>
							{t('button.submit')}
						</Button>
					</div>
					{/* Load Comments */}
					<div className='flex flex-col gap-4'>
						{movieData.comments.map((comment) => (
							<div
								key={comment.id}
								className='flex w-full flex-col items-center rounded border-1 border-black bg-dark p-4'
							>
								<div className='flex w-full items-center justify-between'>
									<div className='flex items-center gap-2'>
										<div>
											<Image
												src={
													comment.user.avatar ||
													'https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg'
												}
												className='h-10 w-10 lg:h-14 lg:w-14'
												alt={`${comment.user.firstName} ${comment.user.lastName}`}
											/>
										</div>
										<div className='text-base font-bold text-[#e2a400] md:text-xl'>
											{`${comment.user.firstName} ${comment.user.lastName}`}
										</div>
									</div>
									<div className='flex items-start gap-2'>
										<div className='flex flex-col gap-1'>
											<div>
												<p className='text-right text-xs italic'>
													{formatCommentDate(comment.createdAt, locale, t)}
												</p>
											</div>
											<div className='flex gap-1'>
												<Image
													src='/images/icons/star.svg'
													alt='star icon'
													width='16px'
													height='16px'
												/>
												<div>{comment.rating}/10</div>
											</div>
										</div>
										{/* Options Menu */}
										{comment.user.email === currentUserEmail && (
											<div
												className='cursor-pointer'
												onClick={() => handlePopupToggle(comment.id)}
												ref={dotsRef}
											>
												<Image
													src='/images/icons/dots-vertical.svg'
													alt='options icon'
													width='16px'
													height='16px'
												/>
											</div>
										)}
									</div>
								</div>
								{/* Popup for Edit/Delete */}
								{isPopupOpen === comment.id && popupPosition && (
									<div
										className='absolute z-10 flex w-48 flex-col rounded bg-white text-black'
										style={{
											top: `${popupPosition.top}px`,
											left: `${popupPosition.left}px`,
										}}
										onBlur={() => setIsPopupOpen(null)}
									>
										<p
											className='rounded-t border-b-2 border-red-600 p-3 hover:bg-red-400 hover:font-bold hover:text-white'
											onClick={() => handleEdit(comment.id, comment.comment, comment.rating)}
										>
											{t('labels.update')}
										</p>
										<p
											className='rounded-b p-3 hover:bg-red-400 hover:font-bold hover:text-white'
											onClick={() => handleDelete(comment.id)}
										>
											{t('labels.delete')}
										</p>
									</div>
								)}

								{/* Edit Comment Section */}
								{editedComment?.commentId === comment.id ? (
									<div className='w-full'>
										<div className='ml-14 w-10/12'>
											<input
												type='text'
												value={editedComment.text}
												onChange={(e) =>
													setEditedComment({ ...editedComment, text: e.target.value })
												}
												className='w-full rounded bg-slate-100 p-3 text-black'
											/>
											<div className='mt-2 flex items-center gap-1'>
												<input
													type='text'
													value={editedComment.rating}
													onChange={(e) =>
														setEditedComment({ ...editedComment, rating: parseInt(e.target.value) })
													}
													className='w-10 rounded bg-slate-100 p-2 text-black'
												/>
												<p className='text-xl font-bold text-white'>/10</p>
											</div>
										</div>
										<div className='flex items-end justify-end'>
											<Button
												onClick={handleUpdate}
												className={`text-nowrap rounded-full bg-green-500 px-7 py-2 text-xs transition duration-200 hover:bg-green-400 ${isDarkMode ? 'text-white' : 'text-dark'}`}
											>
												{t('button.update')}
											</Button>
										</div>
									</div>
								) : (
									<div className='w-11/12 px-8'>{comment.comment}</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailPage;
