// import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { MovieGenre, MovieGenreAdd } from '../types'; // Adjust import based on your definitions
// import { useTranslations } from 'next-intl';

// interface AddMovieGenresModalProps {
// 	isOpen: boolean;
// 	onOpenChange?: () => void;
// 	onAddMovieGenre: (movieGenre: MovieGenre) => void;
// 	onFinishAdding: () => void;
// 	onReloadData: () => void;
// }

// const AddMovieGenres: React.FC<AddMovieGenresModalProps> = ({
// 	isOpen,
// 	onOpenChange,
// 	onAddMovieGenre,
// 	onFinishAdding,
// 	onReloadData,
// }) => {
// 	const [isAdding, setIsAdding] = useState(false);
// 	const t = useTranslations('AdminMovieGenreAdd');
// 	const [newMovieGenre, setNewMovieGenre] = useState<MovieGenreAdd>({
// 		numberCategory: 0,
// 		movieGenreTranslation: [
// 			{ categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199', name: '', description: '' },
// 			{ categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d', name: '', description: '' },
// 		],
// 	});

// 	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;

// 		const updatedTranslations = [...newMovieGenre.movieGenreTranslation];
// 		updatedTranslations[index] = {
// 			...updatedTranslations[index],
// 			[name]: value,
// 		};
// 		setNewMovieGenre((prevState: MovieGenreAdd) => ({
// 			...prevState,
// 			translations: updatedTranslations,
// 		}));
// 	};
// 	console.log(newMovieGenre.movieGenreTranslation.map((a) => a.name));
// 	const handleAddMovieGenre = async () => {
// 		setIsAdding(true);
// 		try {
// 			const response = await axios.post('http://localhost:5000/movie-genre', newMovieGenre);
// 			if (response.data && response.data.success) {
// 				onAddMovieGenre(response.data.data);
// 				onFinishAdding();
// 				onReloadData();
// 				setNewMovieGenre({
// 					numberCategory: 0,
// 					movieGenreTranslation: [
// 						{
// 							categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
// 							name: '',
// 							description: '',
// 						},
// 						{
// 							categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
// 							name: '',
// 							description: '',
// 						},
// 					],
// 				});
// 				onOpenChange && onOpenChange();
// 				toast.success('The new movie genre has been successfully added.', {
// 					duration: 3000,
// 				});
// 			} else {
// 				console.error('Failed to add movie genre. Response:', response.data);
// 				toast.error('Failed to add movie genre. Please try again.', {
// 					duration: 3000,
// 				});
// 			}
// 		} catch (error) {
// 			console.error('Error adding movie genre:', error);
// 			toast.error('An error occurred while adding the movie genre. Please try again.', {
// 				duration: 3000,
// 			});
// 		} finally {
// 			setIsAdding(false);
// 		}
// 	};

// 	if (!isOpen) {
// 		return null;
// 	}

// 	return (
// 		<div className='container mx-auto rounded-lg p-4'>
// 			<h1 className='mb-4 text-2xl font-bold'>Add New Movie Genre</h1>
// 			<form
// 				onSubmit={(e) => {
// 					e.preventDefault();
// 					handleAddMovieGenre();
// 				}}
// 				className='space-y-4'
// 			>
// 				{/* Translation inputs */}
// 				{newMovieGenre.movieGenreTranslation.map((translation, index) => (
// 					<div key={index} className='space-y-2'>
// 						<h3 className='text-xl font-semibold'>
// 							{translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
// 								? 'Tiếng Việt'
// 								: 'English'}
// 						</h3>
// 						<Input
// 							fullWidth
// 							type='text'
// 							name='languageCode'
// 							value={
// 								translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
// 									? 'Tiếng việt'
// 									: 'English'
// 							}
// 							label={t('languageCode')}
// 							disabled
// 							variant='bordered'
// 						/>
// 						<Input
// 							fullWidth
// 							type='text'
// 							name='name'
// 							value={translation.name}
// 							onChange={(e) => handleTranslationChange(index, e)}
// 							label={t('name')}
// 							required
// 							variant='bordered'
// 						/>
// 						<Input
// 							fullWidth
// 							type='text'
// 							name='description'
// 							value={translation.description}
// 							onChange={(e) => handleTranslationChange(index, e)}
// 							label={t('name')}
// 							required
// 							variant='bordered'
// 						/>
// 					</div>
// 				))}

// 				<Spacer y={2} />
// 				<Button
// 					onClick={handleAddMovieGenre}
// 					type='submit'
// 					color='primary'
// 					disabled={isAdding}
// 					fullWidth
// 				>
// 					{isAdding ? <Spinner size='sm' /> : t('addMovieGenre')}
// 				</Button>
// 			</form>
// 		</div>
// 	);
// };

// export default AddMovieGenres;

import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MovieGenre, MovieGenreAdd } from '../types'; // Adjust import based on your definitions
import { useTranslations } from 'next-intl';

interface AddMovieGenresModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddMovieGenre: (movieGenre: MovieGenre) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddMovieGenres: React.FC<AddMovieGenresModalProps> = ({
	isOpen,
	onOpenChange,
	onAddMovieGenre,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminMovieGenres.add');

	const [newMovieGenre, setNewMovieGenre] = useState<MovieGenreAdd>({
		numberCategory: Math.floor(Math.random() * 10000), // Generate a random number for numberCategory
		movieGenreTranslation: [
			{
				categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
				name: '',
				description: '',
			},
			{
				categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
				name: '',
				description: '',
			},
		],
	});

	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const updatedTranslations = [...newMovieGenre.movieGenreTranslation];
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[name]: value,
		};
		setNewMovieGenre((prevState: MovieGenreAdd) => ({
			...prevState,
			movieGenreTranslation: updatedTranslations,
		}));
	};

	const handleAddMovieGenre = async () => {
		setIsAdding(true);
		try {
			const response = await axios.post('http://localhost:5000/movie-genres', newMovieGenre);
			console.log(response);

			if (response.status === 201) {
				setTimeout(() => {
					onAddMovieGenre(response.data.data);
					onFinishAdding();
					onReloadData();
					onOpenChange && onOpenChange();
				}, 1500);

				setNewMovieGenre({
					numberCategory: Math.floor(Math.random() * 10000), // Generate a new random number for numberCategory
					movieGenreTranslation: [
						{
							categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							name: '',
							description: '',
						},
						{
							categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							name: '',
							description: '',
						},
					],
				});

				toast.success('The new movie genre has been successfully added.', {
					duration: 3000,
				});
			} else {
				console.error('Failed to add movie genre. Response:', response.data);
				toast.error('Failed to add movie genre. Please try again.', {
					duration: 3000,
				});
			}
		} catch (error) {
			console.error('Error adding movie genre:', error);
			toast.error('An error occurred while adding the movie genre. Please try again.', {
				duration: 3000,
			});
		} finally {
			setIsAdding(false);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className='container mx-auto rounded-lg p-4'>
			<h1 className='mb-4 text-2xl font-bold'>Add New Movie Genre</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddMovieGenre();
				}}
				className='space-y-4'
			>
				{/* Translation inputs */}
				{newMovieGenre.movieGenreTranslation.map((translation, index) => (
					<div key={index} className='space-y-2'>
						<h3 className='text-xl font-semibold'>
							{translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
								? 'Tiếng Việt'
								: 'English'}
						</h3>
						<Input
							fullWidth
							type='text'
							name='languageCode'
							value={
								translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
									? 'Tiếng việt'
									: 'English'
							}
							label={t('languageCode')}
							disabled
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='name'
							value={translation.name}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description'
							value={translation.description}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('description')}
							required
							variant='bordered'
						/>
					</div>
				))}

				<Spacer y={2} />
				<Button
					onClick={handleAddMovieGenre}
					type='submit'
					color='primary'
					disabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('submit')}
				</Button>
			</form>
		</div>
	);
};

export default AddMovieGenres;
