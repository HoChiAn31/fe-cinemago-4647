import React from 'react';
import { Movie } from '../types';
import { Button } from '@nextui-org/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import { Pencil, Trash2 } from 'lucide-react';
import Loading from '@/app/components/Loading';

interface MovieTableProps {
	movies: Movie[];
	selectedMovies: Set<string>;
	setSelectedMovies: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen?: () => void;
	onDeleteOpen: () => void;
	setMovieToEdit: React.Dispatch<React.SetStateAction<Movie | null>>;
	setMovieToDelete: React.Dispatch<React.SetStateAction<Movie | null>>;
	isLoading: boolean;
}

const MovieTable: React.FC<MovieTableProps> = ({
	movies,
	selectedMovies,
	setSelectedMovies,
	// onEditOpen,
	onDeleteOpen,
	// setMovieToEdit,
	setMovieToDelete,
	isLoading,
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
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table
				className={`w-full ${isDarkMode ? 'text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>{t('order')}</th>
						<th className='border-r border-gray1 p-3 text-left'>{t('name')}</th>
						<th className='border-r border-gray1 p-3 text-left'>{t('director')}</th>
						<th className='border-r border-gray1 p-3 text-left'>{t('releaseDate')}</th>
						{/* <th className='border-r border-gray1 p-3'>{t('language')}</th> */}
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<>
							{movies.map((movie, index) => (
								<tr key={movie.id} className='border-b border-gray1'>
									<td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td>
									{/* Display order number */}
									{/* <td className='border-r border-gray1 p-3 text-center'>{movie.id}</td> */}
									<td className='border-r border-gray1 p-3'>
										{movie.translations &&
											movie.translations.length > 0 &&
											(() => {
												const translation = movie.translations.find(
													(t) => t.categoryLanguage && t.categoryLanguage.languageCode === locale,
												);
												return translation ? translation.name : movie.translations[0].name;
											})()}
									</td>
									<td className='border-r border-gray1 p-3'>{movie.director}</td>
									<td className='border-r border-gray1 p-3'>{movie.releaseDate}</td>
									{/* <td className='w-[8%] border-r border-gray1 p-3 text-center'>{movie.language}</td> */}
									<td className=''>
										<div className='flex items-center justify-center gap-2'>
											<div className='flex items-center justify-center'>
												<Button
													color='warning'
													onPress={() => {
														router.push(`/${locale}/admin/admin-movie/${movie.id}`);
													}}
													isIconOnly
													radius='sm'
													size='sm'
												>
													<Pencil className='text-white' height={20} width={20} />
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
													radius='sm'
													variant='bordered'
													className='border'
													size='sm'
												>
													<Trash2 height={20} width={20} />
												</Button>
											</div>
										</div>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan={5} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default MovieTable;
