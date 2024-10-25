'use client';

import { FC, useEffect, useState } from 'react';
import MaxWidth from '@/app/components/MaxWidth';
import OnGoing from '@/app/components/OnGoing';
import { MovieProps } from '@/app/types/Movie.type';
import { moviesData } from '@/app/modules/data';
import { useTheme } from '@/app/context/ThemeContext';
import { useTranslations } from 'next-intl';
import Movie from '@/app/components/Movie';

const UpComingPage: FC = () => {
	const [movies, setMovies] = useState<MovieProps['movie'][]>([]);
	const t = useTranslations('HomePage');
	const { isDarkMode } = useTheme();

	useEffect(() => {
		const upcomingMovies = moviesData.filter((movie) => {
			const releaseDate = new Date(movie.releaseDate);
			const today = new Date();
			return !movie.onGoing || releaseDate > today;
		});
		setMovies(upcomingMovies);
	}, []);

	return (
		<MaxWidth>
			<div className='container mx-auto mb-32 mt-16 flex flex-col items-center justify-center'>
				<div className='text-default-color mb-8 text-center text-4xl font-bold uppercase tracking-tighter'>
					{t('label.upComing')}
				</div>
				<div className='grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{movies.map((movie, index) => (
						<div key={index} className='px-2'>
							<Movie movie={movie} />
						</div>
					))}
				</div>
			</div>
			<div className='mb-8'>
				<OnGoing />
			</div>
		</MaxWidth>
	);
};

export default UpComingPage;
