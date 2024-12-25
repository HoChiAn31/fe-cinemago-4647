'use client';

import { FC, useEffect, useState } from 'react';
import { MovieProp } from '@/app/types/MovieDetail.type';
import { useTheme } from '@/app/context/ThemeContext';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import Movie from '@/app/components/Movie';
import Loading from '@/app/components/Loading';
import MaxWidth from '@/app/components/MaxWidth';
import OnGoing from '@/app/components/OnGoing';

const UpComingPage: FC = () => {
	const [movies, setMovies] = useState<MovieProp['movie'][]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const t = useTranslations('HomePage');
	const { isDarkMode } = useTheme();
	const locale = useLocale();

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/movies`, {
				params: {
					languageCode: locale,
				},
			})
			.then((res) => {
				const upcomingMovies: MovieProp['movie'][] = res.data.data;

				const filteredMovies = upcomingMovies.filter((movie) => {
					const releaseDate = new Date(movie.releaseDate);
					const today = new Date();
					return releaseDate > today;
				});

				setMovies(filteredMovies);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);

	if (!isLoading) return <Loading />;

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
