'use client';
import { Button, Image, Input, Spinner, Checkbox } from '@nextui-org/react';
import { Genre, MovieDetails, Movies } from '../types'; // Import the Movie type
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
	const [genres, setGenres] = useState<Genre[]>([]);

	const [movie, setMovie] = useState<MovieDetails | null>(null);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchBranch = async () => {
			const response = await fetch(`http://localhost:5000/movies/${id}`);
			const data = await response.json();
			console.log(data);
			if (data?.genres) {
				setSelectedGenres(data.genres.map((genre: any) => genre.id));
			}
			setMovie(data);
		};
		fetchBranch();
	}, [id]);

	useEffect(() => {
		// Fetch categories and genres
		const fetchData = async () => {
			try {
				const genreResponse = await axios.get('http://localhost:5000/movie-genres', {
					params: {
						page: 1,
						items_per_page: 100,
					},
				});

				setGenres(genreResponse.data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);
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
	const handleGenreChange = (genreId: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId],
		);
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

	const handleEditMovie = async () => {
		setIsEditing(true);

		const dataMovie = {
			...movie,
		};
		const updateMovieData = {
			director: movie?.director,
			cast: movie?.cast,
			releaseDate: movie?.releaseDate,
			duration: movie?.duration,
			language: movie?.language,
			country: movie?.country,
			rating: movie?.rating,
			poster_url: movie?.poster_url,
			trailer_url: movie?.trailer_url,
			translations: movie?.translations,
			genres: selectedGenres.map((genreId) => ({ id: genreId })),
		};
		console.log(updateMovieData);
		const updatePromise = axios.patch(`http://localhost:5000/movies/${id}`, updateMovieData);

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

	return (
		<div className='p-4'>
			<ManagementHeader
				isOpen
				isBack
				onChangeBack={() => router.back()}
				title='Chi tiết'
				titleOpen={isEditing ? <Spinner size='sm' /> : t('addMovie')}
				onChange={handleEditMovie}
			/>
			<div className='space-y-4'>
				<Image
					src={
						movie?.poster_url ||
						'https://drive-in-theatre.netlify.app/movieImages/default-movie.png'
					}
					alt={movie?.director}
					height={120}
					width={120}
				/>

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
				{/* Handle genres */}
				{genres.length > 0 && (
					<>
						<div className='flex items-center'>
							<span className='mr-2 font-semibold'>{t('genres')}:</span>
						</div>
						<div className='flex flex-wrap gap-2'>
							{genres.map((genre) =>
								genre.movieGenreTranslation
									.filter((genres) => genres.categoryLanguage.languageCode === locale)
									.map((genres) => (
										<Checkbox
											key={genre.id}
											isSelected={selectedGenres.includes(genre.id)}
											onChange={() => handleGenreChange(genre.id)}
										>
											{genres.name}
										</Checkbox>
									)),
							)}
						</div>
					</>
				)}
				{/* <Button
					onClick={handleEditMovie}
					type='submit'
					color='primary'
					isDisabled={isEditing}
					fullWidth
				>
					{isEditing ? <Spinner size='sm' /> : t('addMovie')}
				</Button> */}
			</div>
			<Toaster />
		</div>
	);
};

export default EditMoviePage;
