'use client';

import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import Button from './Button';
import Slider from 'react-slick';
import { useTranslations } from 'next-intl';
import './home.css';
import { useTheme } from '@/app/context/ThemeContext';
import { moviesData } from '@/app/modules/data';

interface MovieProps {
	movie: {
		image: string;
		title: string;
		tags: string[];
		rating: string;
		url: string;
		releaseDate?: string;
		onGoing: boolean;
	};
}

const OnGoing: React.FC = () => {
	const [movies, setMovies] = useState<MovieProps['movie'][]>([]);

	useEffect(() => {
		const ongoingMovies = moviesData.filter((movie) => movie.onGoing);
		setMovies(ongoingMovies);
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
	};

	const t = useTranslations('HomePage');
	const { isDarkMode } = useTheme();

	return (
		<div className='container mx-auto mt-10 flex flex-col items-center justify-center'>
			<div className='mb-8 text-center text-4xl font-bold uppercase'>{t('label.onGoing')}</div>
			<div className='container mx-auto mb-14'>
				<Slider {...settings} className={`${isDarkMode ? 'darkmode' : ''}`}>
					{movies.map((movie, index) => (
						<div key={index} className='px-2'>
							<Movie movie={movie} />
						</div>
					))}
				</Slider>
			</div>
			<Button
				href='vi/movies/'
				className={`rounded-md border-[0.1rem] border-second bg-primary px-20 py-3 text-white transition duration-200 hover:bg-white hover:text-second`}
			>
				{t('button.see')}
			</Button>
		</div>
	);
};

export default OnGoing;
