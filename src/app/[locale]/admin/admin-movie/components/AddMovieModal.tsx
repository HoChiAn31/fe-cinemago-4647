import { Button, Input, Spacer, Spinner, Checkbox } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MovieData, Genre } from '../types';
import { useTranslations } from 'next-intl';
interface AddMovieModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddMovie: (movie: MovieData) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}
const AddMovieModal: React.FC<AddMovieModalProps> = ({
	isOpen,
	onOpenChange,
	onAddMovie,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminMovieAdd');
	const [newMovie, setNewMovie] = useState<MovieData>({
		director: '',
		cast: '',
		releaseDate: '',
		duration: 0,
		language: '',
		country: '',
		rating: 0,
		poster_url: '',
		trailer_url: '',
		is_showing: false,
		translations: [
			{
				categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
				name: '',
				description: '',
			},
			{
				categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
				name: '',
				description: '',
			},
		],
		genres: [],
	});
	const [categories, setCategories] = useState<any[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [translationFields, setTranslationFields] = useState<{
		[key: string]: { name: string; description: string };
	}>({
		vi: { name: '', description: '' },
		en: { name: '', description: '' },
	});

	useEffect(() => {
		// Fetch categories
		axios
			.get('http://localhost:5000/category-language')
			.then((response) => {
				setCategories(response.data.data);
			})
			.catch((error) => console.error('Error fetching categories:', error));

		// Fetch genres
		axios
			.get('http://localhost:5000/movie-genres')
			.then((response) => {
				setGenres(response.data.data);
			})
			.catch((error) => console.error('Error fetching genres:', error));
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewMovie((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleTranslationFieldChange = (
		langId: string,
		field: 'name' | 'description',
		value: string,
	) => {
		setTranslationFields((prev) => ({
			...prev,
			[langId]: { ...prev[langId], [field]: value },
		}));
	};

	const handleAddMovie = async () => {
		setIsAdding(true);
		const updatedTranslations = Object.keys(translationFields).map((langId) => {
			let categoryLanguageId = '';
			if (langId === 'vi') {
				categoryLanguageId = '33348724-5aec-4f4b-8c44-4fbcab59b09d'; // Vietnamese ID
			} else if (langId === 'en') {
				categoryLanguageId = 'd5784fc5-3695-40e5-84ff-2456c9f6a199'; // English ID
			}
			return {
				categoryLanguageId,
				name: translationFields[langId]?.name || '',
				description: translationFields[langId]?.description || '',
			};
		});

		const updatedGenres = selectedGenres.map((genreId) => {
			const genre = genres.find((g) => g.id === genreId);
			return { id: genreId, name: genre ? genre.name : '' };
		});

		const movieData = {
			...newMovie,
			translations: updatedTranslations,
			genres: updatedGenres,
		};

		// Uncomment and use the API call as needed
		console.log(movieData);
		try {
			const response = await axios.post('http://localhost:5000/movies', movieData);
			console.log('API Response:', response.data);

			if (response.data && response.data.success) {
				onAddMovie(response.data.data);
				onFinishAdding();
				onReloadData();

				// Reset form
				setNewMovie({
					director: '',
					cast: '',
					releaseDate: '',
					duration: 0,
					language: '',
					country: '',
					rating: 0,
					poster_url: '',
					trailer_url: '',
					is_showing: false,
					translations: [
						{
							categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							name: '',
							description: '',
						},
						{
							categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							name: '',
							description: '',
						},
					],
					genres: [],
				});
				setSelectedGenres([]);
				setTranslationFields({
					vi: { name: '', description: '' },
					en: { name: '', description: '' },
				});

				// Close the modal
				onOpenChange && onOpenChange();
			} else {
				onAddMovie(response.data.data);
				onFinishAdding();
				onReloadData();
				console.error('Failed to add movie. Response:', response.data);
			}
			toast.success('The new movie has been successfully added.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error adding movie:', error);
			toast.error('An error occurred while adding the movie. Please try again.', {
				duration: 3000,
			});
		} finally {
			setIsAdding(false);
		}
	};

	const handleGenreChange = (genreId: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId],
		);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className='container mx-auto rounded-lg bg-white p-4'>
			<h1 className='mb-4 text-2xl font-bold'>Add New Movie</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddMovie();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='director'
					value={newMovie.director}
					onChange={handleInputChange}
					label={t('director')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='cast'
					value={newMovie.cast}
					onChange={handleInputChange}
					label={t('cast')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='date'
					name='releaseDate'
					value={newMovie.releaseDate}
					onChange={handleInputChange}
					label='Release Date'
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='number'
					name='duration'
					value={newMovie.duration.toString()}
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
					value={newMovie.language}
					onChange={handleInputChange}
					label={t('language')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='country'
					value={newMovie.country}
					onChange={handleInputChange}
					label={t('country')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='number'
					name='rating'
					value={newMovie.rating.toString()}
					onChange={handleInputChange}
					label={t('rating')}
					min={0}
					max={10}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='url'
					name='poster_url'
					value={newMovie.poster_url}
					onChange={handleInputChange}
					label={t('poster_url')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='url'
					name='trailer_url'
					value={newMovie.trailer_url}
					onChange={handleInputChange}
					label={t('trailer_url')}
					required
					variant='bordered'
				/>

				{/* Fixed Translation Inputs */}
				<div className='translation-fields space-y-4'>
					{/* Name in Vietnamese */}
					<Input
						fullWidth
						type='text'
						value={translationFields['vi']?.name || ''}
						onChange={(e) => handleTranslationFieldChange('vi', 'name', e.target.value)}
						label={t('name_vi')}
						required
						variant='bordered'
					/>
					{/* Description in Vietnamese */}
					<Input
						fullWidth
						type='text'
						value={translationFields['vi']?.description || ''}
						onChange={(e) => handleTranslationFieldChange('vi', 'description', e.target.value)}
						label={t('description_vi')}
						required
						variant='bordered'
					/>
					{/* Name in English */}
					<Input
						fullWidth
						type='text'
						value={translationFields['en']?.name || ''}
						onChange={(e) => handleTranslationFieldChange('en', 'name', e.target.value)}
						label={t('name_en')}
						required
						variant='bordered'
					/>
					{/* Description in English */}
					<Input
						fullWidth
						type='text'
						value={translationFields['en']?.description || ''}
						onChange={(e) => handleTranslationFieldChange('en', 'description', e.target.value)}
						label={t('description_en')}
						required
						variant='bordered'
					/>
				</div>

				{/* Handle genres */}
				{genres.length > 0 && (
					<>
						<div className='flex items-center'>
							<span className='mr-2 font-semibold'>{t('genres')}:</span>
							{/* <span className='text-gray-500 text-sm'>(Select multiple)</span> */}
						</div>
						<div className='flex flex-wrap gap-2'>
							{genres.map((genre) => (
								<Checkbox
									key={genre.id}
									isSelected={selectedGenres.includes(genre.id)}
									onChange={() => handleGenreChange(genre.id)}
								>
									{genre.name}
								</Checkbox>
							))}
						</div>
					</>
				)}
				<Spacer y={2} />
				<Button
					onClick={handleAddMovie}
					type='submit'
					color='primary'
					isDisabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addMovie')}
				</Button>
			</form>
		</div>
	);
};

export default AddMovieModal;
