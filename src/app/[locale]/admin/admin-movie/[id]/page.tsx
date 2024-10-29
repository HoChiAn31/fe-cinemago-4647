'use client';
import { Button, Image, Input, Spinner } from '@nextui-org/react';
import { Movies } from '../types'; // Import the Movie type
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeader from '@/app/components/ManagementHeader';

const EditMoviePage = () => {
	// Accept movie prop
	const t = useTranslations('AdminMovieAdd');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [movie, setMovie] = useState<Movies | null>(null);
	const [isTrue, setIsTrue] = useState<boolean>(true);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchBranch = async () => {
			const response = await fetch(`http://localhost:5000/movies/${id}`);
			const data = await response.json();

			setMovie(data);
		};
		fetchBranch();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMovie((prevState) => {
			if (!prevState) return null;
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleTranslationChange = (
		langId: string,
		field: 'name' | 'description',
		value: string,
	) => {
		setMovie((prevState) => {
			if (!prevState) return null;
			const updatedTranslations = prevState.translations.map((translation) =>
				translation.categoryLanguage.languageCode === langId
					? { ...translation, [field]: value }
					: translation,
			);

			return { ...prevState, translations: updatedTranslations };
		});
	};
	// const handleAddMovie = async () => {
	// 	setIsEditing(true);

	// 	toast.loading('Added successfully.');
	// 	try {
	// 		const response = await axios.put(`http://localhost:5000/moviess/${id}`, movie);
	// 		console.log('API Response:', response.data.affected);

	// 		if (response.data.affected === 1) {
	// 			toast.success('Added successfully.');
	// 			setTimeout(() => {
	// 				router.push(`/${locale}/admin/admin-movie/`);
	// 			}, 3000);
	// 		} else {
	// 			toast.error('Add failed. Please try again.', {
	// 				duration: 3000,
	// 			});
	// 		}
	// 	} catch (error) {
	// 		// console.error('Error adding movie:', error);
	// 		toast.error('An error occurred. Please try again.', {
	// 			duration: 3000,
	// 		});
	// 	} finally {
	// 		setIsEditing(false);
	// 	}
	// };
	// ... existing code ...

	const handleAddMovie = async () => {
		setIsEditing(true);

		const updatePromise = axios.put(`http://localhost:5000/movies/${id}`, movie);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: (response) => {
					if (response.data.affected === 1) {
						setTimeout(() => {
							router.push(`/${locale}/admin/admin-movie/`);
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
			console.error('Error updating movie:', error);
		} finally {
			setIsEditing(false);
		}
	};

	// ... existing code ...

	return (
		<div className='p-4'>
			<ManagementHeader isOpen={true} onChange={() => router.back()} />
			<div className='space-y-4'>
				<Image src={movie?.poster_url} alt={movie?.director} height={120} width={120} />

				<Input
					fullWidth
					type='text'
					name='director'
					value={movie?.director}
					onChange={handleInputChange}
					label={t('director')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='cast'
					value={movie?.cast}
					onChange={handleInputChange}
					label={t('cast')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='date'
					name='releaseDate'
					value={movie?.releaseDate.toString()}
					onChange={handleInputChange}
					label='Release Date'
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='number'
					name='duration'
					value={movie?.duration.toString()}
					onChange={handleInputChange}
					label={t('duration')}
					min={1}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='language'
					value={movie?.language}
					onChange={handleInputChange}
					label={t('language')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='country'
					value={movie?.country}
					onChange={handleInputChange}
					label={t('country')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='url'
					name='poster_url'
					value={movie?.poster_url}
					onChange={handleInputChange}
					label={t('poster_url')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='url'
					name='trailer_url'
					value={movie?.trailer_url}
					onChange={handleInputChange}
					label={t('trailer_url')}
					required
					variant='bordered'
				/>
				{movie?.translations.map((mt) => (
					<>
						<Input
							fullWidth
							type='text'
							value={mt.name || ''}
							// onChange={(e) => handleTranslationFieldChange('vi', 'name', e.target.value)}
							onChange={(e) =>
								handleTranslationChange(mt.categoryLanguage.languageCode, 'name', e.target.value)
							}
							label={mt.categoryLanguage.languageCode === 'vi' ? t('name_vi') : t('name_en')}
							required
							variant='bordered'
						/>

						<Input
							fullWidth
							type='text'
							value={mt.description || ''}
							// onChange={(e) => handleTranslationFieldChange('vi', 'description', e.target.value)}
							onChange={(e) =>
								handleTranslationChange(
									mt.categoryLanguage.languageCode,
									'description',
									e.target.value,
								)
							}
							label={
								mt.categoryLanguage.languageCode === 'vi'
									? t('description_vi')
									: t('description_en')
							}
							required
							variant='bordered'
						/>
					</>
				))}

				<Button
					onClick={handleAddMovie}
					type='submit'
					color='primary'
					isDisabled={isEditing}
					fullWidth
				>
					{isEditing ? <Spinner size='sm' /> : t('addMovie')}
				</Button>
			</div>
			<Toaster />
		</div>
	);
};

export default EditMoviePage;
