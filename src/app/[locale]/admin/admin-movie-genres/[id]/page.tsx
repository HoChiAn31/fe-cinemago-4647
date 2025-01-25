'use client';
import { Input } from '@nextui-org/react';
import { MovieGenre } from '../types'; // Import the MovieGenre type
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
	// const [isEditing, setIsEditing] = useState(false);
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

		// Check if the value contains numbers
		if (/\d/.test(value)) {
			toast.error(toastT('noNumbersAllowed')); // Optional: Display a toast message if numbers are detected
			return;
		}

		// Parse the field and language code from the input name
		const [field, languageCode] = name.split('_'); // Example: "name_en" => ["name", "en"]

		setMovieGenre((prevState) => {
			if (!prevState) return null;

			// Update the correct translation based on the language code
			const updatedTranslations = prevState.movieGenreTranslation.map((translation) =>
				translation.categoryLanguage.languageCode === languageCode
					? {
							...translation,
							[field]: value, // Dynamically update "name" or "description"
						}
					: translation,
			);

			return {
				...prevState,
				movieGenreTranslation: updatedTranslations,
			};
		});
	};

	const handleEditMovieGenre = () => {
		// console.log(movieGenre);
		// setIsEditing(true);

		axios
			.put(`http://localhost:5000/movie-genres/${id}`, movieGenre)
			.then((response) => {
				// if (response.data.affected === 1) {

				// } else {
				// 	toast.error(toastT('updateFailed'));
				// }
				toast.success(toastT('updateSuccess'));
				setTimeout(() => {
					router.push(`/${locale}/admin/admin-movie-genres/`);
				}, 3000);
			})
			.catch((error) => {
				console.error('Error updating movie genre:', error);
				toast.error(toastT('updateError'));
			})
			.finally(() => {
				// setIsEditing(false);
			});
	};

	return (
		<div className='p-4'>
			<ManagementHeader
				isEdit
				isBack
				onChangeBack={() => router.back()}
				titleOpen='Cập nhật'
				onEdit={handleEditMovieGenre}
			/>
			<div className='space-y-4'>
				<div>
					<h3>Thể loại Tiếng Anh</h3>
					<div className='space-y-4'>
						<Input
							fullWidth
							type='text'
							name='name_en'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'en',
								)?.name || ''
							}
							onChange={handleInputChange}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description_en'
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
							name='name_vi'
							value={
								movieGenre?.movieGenreTranslation.find(
									(translation) => translation.categoryLanguage.languageCode === 'vi',
								)?.name || ''
							}
							onChange={handleInputChange}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description_vi'
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
