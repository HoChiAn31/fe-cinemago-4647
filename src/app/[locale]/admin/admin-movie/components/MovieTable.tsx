import React from 'react';
import { Movie } from '../types';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Links from '@/app/components/Links';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import { Pencil, Trash2 } from 'lucide-react';

interface MovieTableProps {
	movies: Movie[];
	selectedMovies: Set<string>;
	setSelectedMovies: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setMovieToEdit: React.Dispatch<React.SetStateAction<Movie | null>>;
	setMovieToDelete: React.Dispatch<React.SetStateAction<Movie | null>>;
}

const MovieTable: React.FC<MovieTableProps> = ({
	movies,
	selectedMovies,
	setSelectedMovies,
	onEditOpen,
	onDeleteOpen,
	setMovieToEdit,
	setMovieToDelete,
}) => {
	const t = useTranslations('AdminTable');
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	const handleSelectMovie = (id: string) => {
		const newSelectedMovies = new Set(selectedMovies);
		if (newSelectedMovies.has(id)) {
			newSelectedMovies.delete(id);
		} else {
			newSelectedMovies.add(id);
		}
		setSelectedMovies(newSelectedMovies);
	};

	return (
		<div className='bg-darkGreen border-gray2 overflow-hidden rounded-md border-x border-t'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-gray2 border-b'>
						<th className='border-gray2 border-r p-3'>{t('order')}</th>
						<th className='border-gray2 border-r p-3'>{t('id')}</th>
						<th className='border-gray2 border-r p-3'>{t('name')}</th>
						<th className='border-gray2 border-r p-3'>{t('director')}</th>
						<th className='border-gray2 border-r p-3'>{t('releaseDate')}</th>
						<th className='border-gray2 border-r p-3'>{t('language')}</th>
						<th className='p-3'>{t('actions')}</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie, index) => (
						<tr key={movie.id} className='border-gray2 border-b'>
							<td className='border-gray2 border-r p-3 text-center'>{index + 1}</td>{' '}
							{/* Display order number */}
							<td className='border-gray2 border-r p-3 text-center'>{movie.id}</td>
							<td className='border-gray2 border-r p-3 text-center'>
								{movie.translations &&
									movie.translations.length > 0 &&
									(() => {
										const translation = movie.translations.find(
											(t) => t.categoryLanguage && t.categoryLanguage.languageCode === 'en',
										);
										return translation ? translation.name : movie.translations[0].name;
									})()}
							</td>
							<td className='border-gray2 border-r p-3 text-center'>{movie.director}</td>
							<td className='border-gray2 border-r p-3 text-center'>{movie.releaseDate}</td>
							<td className='border-gray2 border-r p-3 text-center'>{movie.language}</td>
							<td className='grid grid-cols-2 gap-2 p-3'>
								<div className='flex items-center justify-center'>
									<Button
										color='warning'
										onPress={() => {
											router.push(`/${locale}/admin/admin-movie/${movie.id}`);
										}}
										isIconOnly
									>
										<Pencil className='text-white' />
									</Button>
								</div>
								<div className='flex items-center justify-center'>
									<Button
										color='danger'
										onPress={() => {
											setMovieToDelete(movie);
											onDeleteOpen();
										}}
										isIconOnly
									>
										<Trash2 />
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MovieTable;
