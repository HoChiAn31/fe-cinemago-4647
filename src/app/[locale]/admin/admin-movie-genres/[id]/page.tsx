'use client';
import { Button, Input, Spinner } from '@nextui-org/react';
import { MovieGenre } from '../types'; // Import the MovieGenre type
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeader from '@/app/components/ManagementHeader';

const EditMovieGenrePage = () => {
	const t = useTranslations('AdminMovieGenres.edit');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [movieGenre, setMovieGenre] = useState<MovieGenre | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchMovieGenre = async () => {
			const response = await fetch(`http://localhost:5000/movie-genres/${id}`);
			const data = await response.json();
			console.log(data);
			setMovieGenre(data);
		};
		fetchMovieGenre();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Ensure movieGenre is not null
		if (!movieGenre) return;

		// Determine which language is being updated based on the 'name' field
		const languageCode = name.includes('en') ? 'en' : 'vi'; // Assuming 'name' includes language code (e.g., 'name_en', 'name_vi')

		setMovieGenre((prevState) => {
			if (!prevState) return null;

			// Update the correct translation based on the language
			const updatedTranslations = prevState.movieGenreTranslation.map((translation) =>
				translation.categoryLanguage.languageCode === languageCode
					? {
							...translation,
							[name.split('_')[0]]: value, // Dynamically update name or description
						}
					: translation,
			);

			return {
				...prevState,
				movieGenreTranslation: updatedTranslations,
			};
		});
	};

	const handleEditMovieGenre = async () => {
		console.log(movieGenre);
		setIsEditing(true);

		const updatePromise = axios.patch(`http://localhost:5000/movie-genres/${id}`, movieGenre);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: (response) => {
					if (response.data.affected === 1) {
						setTimeout(() => {
							router.push(`/${locale}/admin/admin-movie-genres/`);
						}, 3000);
						return toastT('updateSuccess');
					} else {
						throw new Error(toastT('updateFailed'));
					}
				},
				error: toastT('updateError'),
			},
			{
				duration: 3000,
			},
		);

		try {
			await updatePromise;
		} catch (error) {
			console.error('Error updating movie genre:', error);
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<div className='p-4'>
			<ManagementHeader
				isOpen
				isBack
				onChangeBack={() => router.back()}
				// title={'Chi tiết thể loại'}
				titleOpen='Cập nhật'
				onChange={handleEditMovieGenre}
			/>
			<div className='space-y-4'>
				<div>
					<h3>Thể loại Tiếng Anh</h3>
					<div className='space-y-4'>
						<Input
							fullWidth
							type='text'
							name='name'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'en',
								)?.name || ''
							} // Assuming first translation
							onChange={handleInputChange}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'en',
								)?.description || ''
							}
							onChange={handleInputChange}
							label={t('description')}
							required
							variant='bordered'
						/>
					</div>
				</div>
				<div>
					<h3>Thể loại Tiếng Việt</h3>
					<div className='space-y-4'>
						<Input
							fullWidth
							type='text'
							name='name'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'vi',
								)?.name || ''
							} // Assuming first translation
							onChange={handleInputChange}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'vi',
								)?.description || ''
							}
							onChange={handleInputChange}
							label={t('description')}
							required
							variant='bordered'
						/>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default EditMovieGenrePage;
