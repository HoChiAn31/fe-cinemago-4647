'use client';

import React from 'react';
import Image from './Image';
import { iconTags } from '@/app/contracts/IconTag.contract';
import { formatDate } from '@/app/utils/format.utils';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/app/context/ThemeContext';
import { MovieProp } from '../types/MovieDetail.type';
import { useModal } from '../context/ModalContext';
import Links from './Links';

const Movie: React.FC<MovieProp> = ({ movie }) => {
	const t = useTranslations('HomePage');
	const locale = useLocale();
	const { openModal } = useModal();
	const { isDarkMode } = useTheme();

	const translation = movie.translations?.find((t) => t.categoryLanguage.languageCode === locale);

	const getIconSrc = (index: number) => iconTags[index] || '';
	console.log(movie.genres);
	return (
		<div
			className={`group relative my-2 mt-4 flex w-full max-w-xs flex-col overflow-hidden rounded-sm shadow-lg ${isDarkMode ? 'bg-white' : ''}`}
		>
			<Links className='relative block min-h-[200px] flex-1 rounded-sm' href={`movies/${movie.id}`}>
				<Image
					src={movie.poster_url}
					alt={translation?.name}
					className={`h-[451.98px] min-h-full w-full border-2 object-cover transition-transform duration-500 group-hover:scale-100 ${isDarkMode ? 'border-second' : 'border-gray-400'}`}
					sizes='(max-width: 768px) 135px, 280px'
				/>
				<div className='absolute inset-0 flex flex-col justify-center bg-black bg-opacity-60 px-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
					<div className='mb-4 text-lg font-bold text-white'>{translation?.name}</div>
					<div className='flex flex-col'>
						<div className='mb-1 flex flex-col gap-1 px-2 py-1 text-sm text-white'>
							<div className='flex items-center'>
								<Image src={getIconSrc(0)} alt='genre-icon' className='mr-2 h-6 w-6' />
								<span>
									{Array.isArray(movie.genres) && movie.genres.length > 0
										? movie.genres.map((genre) => genre.movieGenreTranslation[0]?.name).join(', ')
										: t('label.update')}
								</span>
							</div>
							<div className='flex items-center'>
								<Image src={getIconSrc(1)} alt='duration-icon' className='mr-2 h-6 w-6' />
								<span>
									{movie.duration} {t('label.minutes')}
								</span>
							</div>
							<div className='flex items-center'>
								<Image src={getIconSrc(2)} alt='language-icon' className='mr-2 h-6 w-6' />
								<span>{movie.language}</span>
							</div>
							<div className='flex items-center'>
								<Image src={getIconSrc(3)} alt='country-icon' className='mr-2 h-6 w-6' />
								<span>{movie.country}</span>
							</div>
						</div>
					</div>
				</div>
			</Links>

			<div className='absolute left-[1px] top-[1px] flex w-full items-center transition-transform duration-500 group-hover:translate-y-[-150%]'>
				<div className='flex items-center justify-center bg-[#f93] p-2 uppercase text-black'>
					<div className='flex h-7 items-center justify-center rounded-md border-2 border-black p-1 font-bold'>
						2D
					</div>
				</div>
			</div>

			<div className='group-hover:hover-color mt-4 w-full flex-1 flex-col items-center justify-center text-center font-bold text-primary'>
				{new Date(movie.releaseDate) > new Date() && (
					<div className='mb-4 text-sm'>
						{t('label.date')}: {formatDate(movie.releaseDate)}
					</div>
				)}
				<div className='line-clamp-2 h-12 w-full overflow-hidden text-ellipsis px-2'>
					{translation?.name}
				</div>
			</div>

			<div className='mt-2 flex items-end justify-between'>
				<a
					className='text-md ml-3 flex items-center gap-1 p-2 text-primary'
					onClick={() => openModal(movie.trailer_url)}
				>
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
				<Links
					href={`/booking/${movie.id}`}
					className={`text-nowrap px-9 py-3 text-sm hover:text-primary ${isDarkMode ? 'text-dark' : ''}`}
				>
					{t('button.book')}
				</Links>
			</div>
		</div>
	);
};

export default Movie;
