import React from 'react';
import { MovieGenre } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface TableMovieGenresProps {
	movieGenres: MovieGenre[]; // Adjust the prop type
	selectedGenres?: Set<string>;
	setSelectedGenres?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setGenreToEdit: React.Dispatch<React.SetStateAction<MovieGenre | null>>;
	setGenreToDelete: React.Dispatch<React.SetStateAction<MovieGenre | null>>;
}

const MovieGenreTable: React.FC<TableMovieGenresProps> = ({
	movieGenres,
	selectedGenres,
	setSelectedGenres,
	onEditOpen,
	onDeleteOpen,
	setGenreToEdit,
	setGenreToDelete,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='bg-darkGreen overflow-hidden rounded-md border-x border-t border-gray2'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray2'>
						<th className='border-r border-gray2 p-3'>Order</th>
						<th className='border-r border-gray2 p-3'>Name</th>
						<th className='border-r border-gray2 p-3'>Description</th> {/* Adjust as needed */}
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{movieGenres.map((genre, index) => (
						<tr key={genre.id} className='border-b border-gray2'>
							<td className='border-r border-gray2 p-3 text-center'>{index + 1}</td>
							<td className='border-r border-gray2 p-3 text-center'>
								{genre.movieGenreTranslation
									.filter((translation) => translation.categoryLanguage.languageCode === locale)
									.map((translation) => translation.name)}
							</td>
							<td className='border-r border-gray2 p-3 text-center'>
								{genre.movieGenreTranslation
									.filter((translation) => translation.categoryLanguage.languageCode === locale)
									.map((translation) => translation.description)}
							</td>
							<td className='grid grid-cols-2 gap-2 p-3'>
								<div className='flex items-center justify-center'>
									<Button
										color='warning'
										onPress={() => {
											router.push(`/${locale}/admin/admin-movie-genres/${genre.id}`);
										}}
										isIconOnly
										radius='sm'
									>
										<Pencil className='text-white' />
									</Button>
								</div>
								<div className='flex items-center justify-center'>
									<Button
										color='danger'
										onPress={() => {
											setGenreToDelete(genre);
											onDeleteOpen();
										}}
										isIconOnly
										radius='sm'
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

export default MovieGenreTable;
