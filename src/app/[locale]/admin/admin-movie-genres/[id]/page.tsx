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
	const t = useTranslations('AdminMovieGenreEdit');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [movieGenre, setMovieGenre] = useState<MovieGenre | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchMovieGenre = async () => {
			const response = await fetch(`http://localhost:5000/movie-genre/${id}`);
			const data = await response.json();
			setMovieGenre(data);
		};
		fetchMovieGenre();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMovieGenre((prevState) => {
			if (!prevState) return null;
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleEditMovieGenre = async () => {
		setIsEditing(true);
		const updatePromise = axios.put(`http://localhost:5000/movie-genres/${id}`, movieGenre);

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
			<ManagementHeader isOpen={true} onChange={() => router.back()} />
			<div className='space-y-4'>
				<Input
					fullWidth
					type='text'
					name='name'
					value={movieGenre?.movieGenreTranslation[0]?.name} // Assuming first translation
					onChange={handleInputChange}
					label={t('name')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='description'
					value={movieGenre?.movieGenreTranslation[0]?.description} // Assuming first translation
					onChange={handleInputChange}
					label={t('description')}
					required
					variant='bordered'
				/>
			</div>
			<Button
				onClick={handleEditMovieGenre}
				type='submit'
				color='primary'
				disabled={isEditing}
				fullWidth
			>
				{isEditing ? <Spinner size='sm' /> : t('editMovieGenre')}
			</Button>
			<Toaster />
		</div>
	);
};

export default EditMovieGenrePage;
