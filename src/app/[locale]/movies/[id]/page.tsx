'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from '@/app/context/ThemeContext';
import { MovieData } from '@/app/types/MovieDetail.type';
import Image from '@/app/components/Image';
import { formatCommentDate } from '@/app/utils/formatCommentDate.utils';
import Links from '@/app/components/Links';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import { useParams } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import toast, { Toaster } from 'react-hot-toast';

const currentUserEmail = 'a';

const movieDetailPage: React.FC = () => {
	const t = useTranslations('Detail');
	const locale = useLocale();
	const { isDarkMode } = useTheme();
	const { id } = useParams();
	const [movie, setMovie] = useState<MovieData>({} as MovieData);
	const translation = movie.translations?.find((t) => t.categoryLanguage.languageCode === locale);
	const [isPopupOpen, setIsPopupOpen] = useState<string | null>(null);
	const [editedComment, setEditedComment] = useState<{
		commentId: string;
		text: string;
		rating: number;
	} | null>(null);
	const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
	const dotsRef = React.useRef<HTMLDivElement | null>(null);
	const [formattedDate, setFormattedDate] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUser();
	const [rating, setRating] = useState<number>();
	const [comments, setComments] = useState<string>();
	const [isReload, setIsReload] = useState<number>(0);
	useEffect(() => {
		if (id) {
			setIsLoading(true);

			axios
				.get(`${process.env.NEXT_PUBLIC_API}/movies/findOneView/${id}`, {
					params: {
						languageCode: locale,
					},
				})
				.then((res) => {
					const movieData = res.data;
					console.log(movieData);
					setMovie(movieData);
					setIsLoading(true);
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
				});
		}
	}, [id, locale, isReload]);

	useEffect(() => {
		if (movie.releaseDate) {
			const date = new Date(movie.releaseDate);
			setFormattedDate(date.toLocaleDateString());
		}
	}, [movie.releaseDate]);

	if (!isLoading) return <Loading />;

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
		if (editedComment && movie) {
			const updatedComments = movie.comments?.map((comment) =>
				comment.id === editedComment.commentId
					? { ...comment, comment: editedComment.text, rating: editedComment.rating }
					: comment,
			);

			if (updatedComments) {
				movie.comments = updatedComments;
				localStorage.setItem('movieData', JSON.stringify(movie));
			}

			setEditedComment(null);
		}
	};

	const handleDelete = (commentId: string) => {
		if (movie && movie.comments) {
			const updatedComments = movie.comments.filter((comment) => comment.id !== commentId);
			movie.comments = updatedComments;
			localStorage.setItem('movieData', JSON.stringify(movie));
			setIsPopupOpen(null);
		}
	};
	const handleSubmitComment = () => {
		const data = {
			movieId: movie.id,
			userId: user?.id,
			rating: rating,
			content: comments,
		};

		axios
			.post(`${process.env.NEXT_PUBLIC_API}/comments`, data)
			.then(() => {
				toast.success(t('toast.success'));
				setIsReload(isReload + 1);
			})
			.catch((error) => {
				console.error(error);
			});
		console.log('comment submission', data);
	};
	return (
		<div className='min-h-screen text-white'>
			<div className='container mx-auto flex w-full flex-col gap-6 p-4 lg:w-[60%]'>
				{/* Header Section */}
				<div className='flex h-fit flex-col items-center gap-10 md:flex-row md:items-stretch lg:flex-row'>
					<img
						src={movie.poster_url}
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
									{t('labels.director')}: {movie.director}
								</p>
								<p>
									{t('labels.cast')}: {movie.cast}
								</p>
								<p>
									{t('labels.genres')}:{' '}
									{Array.isArray(movie.genres) && movie.genres.length > 0
										? movie.genres.map((genre) => genre.movieGenreTranslation[0]?.name).join(', ')
										: t('labels.update')}
								</p>
								{formattedDate ? (
									<p>
										{t('labels.releaseDate')}: {formattedDate}
									</p>
								) : (
									<p>&#39;&#39;</p>
								)}
								<p>
									{t('labels.duration')}: {movie.duration} {t('labels.minutes')}
								</p>
								<p>
									{t('labels.language')}: {movie.language}
								</p>
							</div>
							<div className='mb-2 mt-5 flex items-center justify-center'>
								<Links
									href={`/booking/${movie.id}`}
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
							src={`https://www.youtube.com/embed/${movie.trailer_url}`}
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
					{user?.id !== '' ? (
						<div
							className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white'} flex items-start gap-2 rounded p-2`}
						>
							<Image
								src='https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg'
								alt='name'
								className='h-10 w-10 lg:h-14 lg:w-14'
							/>
							<div className='w-full'>
								<form className='flex flex-col gap-2'>
									<input
										className={`${isDarkMode ? 'bg-dark1 text-white' : 'bg-slate-100'} w-full rounded p-1 px-2 text-xs focus:outline-none md:p-3 md:px-5 md:text-base`}
										placeholder={t('form.comment')}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setComments(e.target.value)
										}
									></input>
									<div className='flex items-center gap-1'>
										<input
											className={`w-16 rounded ${isDarkMode ? 'bg-dark1 text-white' : 'bg-slate-100'} px-1 py-2 text-xs focus:outline-none md:w-20 md:text-base`}
											placeholder={t('form.rate')}
											type='number'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setRating(Number(e.target.value))
											}
										></input>
										<p className='font-bold md:text-xl'>/10</p>
									</div>
								</form>
							</div>
							<Button
								// href='#'
								onClick={handleSubmitComment}
								className={`flex h-12 cursor-pointer items-center justify-center text-nowrap rounded-md bg-red-500 px-3 py-10 text-xs font-normal transition duration-200 hover:bg-red-400 md:px-7 md:py-2 md:text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}
							>
								{t('button.submit')}
							</Button>
						</div>
					) : (
						<div className='flex items-center justify-center'>
							<Button
								href={`/${locale}/login`}
								className={`cursor-pointer text-nowrap rounded-md bg-red-500 px-3 py-1 text-xs font-normal transition duration-200 hover:bg-red-400 md:px-7 md:py-2 md:text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}
							>
								{t('button.login')}
							</Button>
						</div>
					)}

					{/* Load Comments */}
					<div className='flex flex-col gap-4'>
						{movie.comments?.length
							? movie.comments.map((comment) => (
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
															'https://cdn-icons-png.flaticon.com/512/149/149071.png'
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
																setEditedComment({
																	...editedComment,
																	rating: parseInt(e.target.value),
																})
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
								))
							: ''}
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default movieDetailPage;
