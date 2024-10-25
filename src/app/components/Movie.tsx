'use client';

import React, { useState } from 'react';
import Button from './Button';
import Image from './Image';
import { iconTags } from '@/app/contracts/IconTag.contract';
import { formatDate } from '@/app/utils/format.utils';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/app/context/ThemeContext';

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

const Movie: React.FC<MovieProps> = ({ movie }) => {
	const t = useTranslations('HomePage');

	const getAgeRating = (rating: string): string => {
		if (rating.includes('T13') || rating.includes('T16')) {
			return 'Teen';
		} else if (rating.includes('T18')) {
			return 'Adult';
		} else if (rating.includes('K')) {
			return 'Kid';
		}
		return '';
	};

	const ageRating = getAgeRating(movie.rating);
	const { isDarkMode } = useTheme();

	return (
		<div
			className={`group relative mt-4 flex w-full max-w-xs flex-col overflow-hidden rounded-sm shadow-lg ${isDarkMode ? 'bg-white' : ''}`}
		>
			<a className='relative block min-h-[200px] flex-1 rounded-sm' href='#'>
				<Image
					src={movie.image}
					alt={movie.title}
					className={`min-h-full w-full border-2 object-cover transition-transform duration-500 group-hover:scale-100 lg:h-[451.98px] ${isDarkMode ? 'border-second' : 'border-gray-400'}`}
					sizes='(max-width: 768px) 135px, 280px'
				/>
				<div className='absolute inset-0 flex flex-col justify-center bg-black bg-opacity-60 px-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
					<div className='mb-4 text-lg font-bold text-white'>{movie.title}</div>
					<div className='flex flex-col'>
						{movie.tags.map((tag, index) => (
							<div key={index} className='mb-1 flex gap-1 px-2 py-1 text-xs text-white'>
								<Image src={iconTags[index]} alt={`icon-${index}`} className='mr-2 h-4 w-4' />
								{tag}
							</div>
						))}
					</div>
				</div>
			</a>

			<div className='absolute left-[1px] top-[1px] flex w-full items-center transition-transform duration-500 group-hover:translate-y-[-150%]'>
				<div className='flex items-center justify-center bg-[#f93] p-2 uppercase text-black'>
					<div className='flex h-7 items-center justify-center rounded-md border-2 border-black p-1 font-bold'>
						2D
					</div>
				</div>
				<div className='flex h-11 flex-col items-center justify-center bg-[#f03] p-1 uppercase text-black'>
					<div className='text-center text-xl font-bold leading-none text-white'>
						{movie.rating}
					</div>
					<div className='flex w-full items-center justify-center bg-black p-1 text-[.5em] leading-[.4px] tracking-widest text-white'>
						{ageRating}
					</div>
				</div>
			</div>

			<div className='group-hover:hover-color mt-4 w-full flex-1 flex-col items-center justify-center text-center font-bold text-primary'>
				{!movie.onGoing && movie.releaseDate && (
					<div className='mb-4 text-sm'>
						{t('label.date')}: {formatDate(movie.releaseDate)}
					</div>
				)}
				<div className='line-clamp-2 h-12 w-full overflow-hidden text-ellipsis px-2'>
					{movie.title}
				</div>
			</div>

			<div className='mt-2 flex items-end justify-between'>
				<a className='text-md ml-3 flex items-center gap-1 p-2 text-primary'>
					<Image
						src={`../images/icons/icon-play-vid.svg`}
						className='border-gray-100 rounded-full border'
						width='23'
						height='23'
					/>
					<div
						className={`underline-position-under ml-1 text-center text-xs font-bold ${isDarkMode ? 'text-dark hover:text-primary' : 'text-dark hover:text-primary'}`}
					>
						{t('button.trailer')}
					</div>
				</a>
				<Button
					href='#'
					className={`text-nowrap px-9 py-3 text-sm hover:text-primary ${isDarkMode ? 'text-dark' : ''}`}
				>
					{t('button.book')}
				</Button>
			</div>
		</div>
	);
};

export default Movie;
