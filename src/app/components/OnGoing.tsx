'use client';

import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import Slider from 'react-slick';
import { useTranslations } from 'next-intl';
import './home.css';
import { useTheme } from '@/app/context/ThemeContext';
import { moviesData } from '@/app/modules/data';
import { MovieProps } from '../types/Movie.type';
import Links from './Links';

const OnGoing: React.FC = () => {
	const [movies, setMovies] = useState<MovieProps['movie'][]>([]);
	const t = useTranslations('HomePage');
	const { isDarkMode } = useTheme();

	useEffect(() => {
		const ongoingMovies = moviesData.filter((movie) => movie.onGoing);
		setMovies(ongoingMovies);
	}, []);

	const settings = {
		infinite: true,
		arrows: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};

	return (
		<div className='container mx-auto mt-10 flex flex-col items-center justify-center'>
			<div className='mb-8 text-center text-4xl font-bold uppercase'>{t('label.onGoing')}</div>
			<div className='container mx-auto mb-14 ml-9 md:ml-8 lg:ml-0'>
				<Slider {...settings} className={`${isDarkMode ? 'darkmode' : ''}`}>
					{movies.map((movie, index) => (
						<div key={index} className='lg:px-2'>
							<Movie movie={movie} />
						</div>
					))}
				</Slider>
			</div>
			<Links
				href='movies/'
				className={`rounded-md border-[0.1rem] border-second bg-primary px-20 py-3 text-white transition duration-200 hover:bg-white hover:text-second`}
			>
				{t('button.see')}
			</Links>
		</div>
	);
};

export default OnGoing;
