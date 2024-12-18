'use client';

import React, { FC, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from '@/app/components/Image';
import { Image as AntImage } from 'antd';
import { Theater } from '@/app/types/Theater.type';
import { theater } from '@/app/modules/data';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

const AboutPage: FC = () => {
	const t = useTranslations('About');
	const locale = useLocale();
	const [theaters] = useState<Theater[]>(theater);

	return (
		<div className='container mx-auto'>
			<div className='relative w-full rounded p-5 py-10 md:p-16'>
				<Image
					src='/images/theater/ht-qc-br.jpg'
					className='absolute inset-0 z-[1] h-full w-full rounded object-cover'
					alt='Theater Image'
				/>
				<div className='absolute inset-0 z-[2] rounded bg-black opacity-65'></div>
				<div className='relative z-[3] text-center'>
					<h1 className='bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-4xl font-bold uppercase tracking-tight text-transparent text-yellow-500 md:font-extrabold'>
						{t('heading1')}
					</h1>
					<p className='mt-8 text-sm font-semibold text-white md:px-20 lg:px-40'>{t('des1')}</p>
				</div>
			</div>

			<div className='mt-20 text-center'>
				<h1 className='bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-4xl font-bold uppercase tracking-tighter text-transparent text-yellow-500 md:font-extrabold'>
					{t('heading2')}
				</h1>
				<div className='mt-10 flex w-full flex-col justify-center gap-6 px-5 lg:flex-row lg:px-0'>
					{[1, 2, 3].map((mission) => (
						<div
							key={mission}
							className='flex w-full flex-1 flex-col gap-2 rounded-lg bg-blue-700 bg-opacity-80 p-4 text-center lg:gap-6 lg:p-6'
						>
							<p className='text-hover-color mx-auto bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-3xl font-bold leading-none text-transparent text-yellow-500 md:font-extrabold'>
								0{mission}
							</p>
							<p className='text-xs font-semibold text-white md:text-sm'>
								{t(`mission${mission}`)}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className='mb-10 mt-20'>
				<h1 className='bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-center text-4xl font-bold uppercase tracking-tighter text-transparent text-yellow-500 md:font-extrabold'>
					{t('heading4')}
				</h1>
				<p className='mt-8 px-10 text-center text-sm font-semibold lg:px-80'>{t('des2')}</p>
				<div className='mt-10 grid grid-cols-1 gap-6 px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-0'>
					{theaters.map((theater, index) => (
						<div
							key={index}
							className='group transform rounded-lg text-center transition-all duration-300 hover:scale-105 hover:border-4 hover:border-red-600 hover:shadow-xl'
						>
							<AntImage
								src={
									theater.image ||
									'https://via.placeholder.com/600x400.png?text=Image+Not+Available'
								}
								className='h-auto w-full rounded-lg object-cover'
								alt={
									theater.translations?.find((t) => t.languageCode === locale)?.name ||
									'Coming Soon'
								}
							/>
							<p className='mt-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 bg-clip-text text-lg font-bold uppercase tracking-tighter text-transparent text-yellow-500 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-red-500 group-hover:to-red-400 group-hover:text-red-500'>
								{theater.translations?.find((t) => t.languageCode === locale)?.name
									? `${theater.translations.find((t) => t.languageCode === locale)?.name}`
									: 'Coming Soon'}
							</p>
						</div>
					))}
				</div>
				{theaters
					.filter((theater) =>
						theater.translations?.some(
							(translation) => translation.name === 'Cinestar Hai Bà Trưng',
						),
					)
					.map((theater, index) => (
						<div key={index} className='relative mt-16 w-full rounded'>
							<Image
								src={
									theater.image ||
									'https://via.placeholder.com/600x400.png?text=Image+Not+Available'
								}
								className='absolute inset-0 z-[1] h-full w-full rounded object-cover'
								alt={
									theater.translations?.find((translation) => translation.languageCode === locale)
										?.name || 'Cinestar Hai Bà Trưng'
								}
							/>
							<div className='absolute inset-0 z-[2] rounded bg-gradient-to-r from-red-500 via-red-400 to-transparent md:from-red-700 md:via-transparent'></div>
							<div className='relative z-[3] rounded bg-opacity-80 p-10 md:p-20'>
								<h2 className='text-hover-color bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-100 bg-clip-text text-xl font-bold uppercase text-transparent text-yellow-500 md:text-4xl md:font-extrabold'>
									{theater.translations?.find((translation) => translation.languageCode === locale)
										?.name || 'Cinestar Hai Bà Trưng'}
								</h2>
								<div className='mt-8 flex flex-col gap-4'>
									<div className='flex items-center gap-3'>
										<MapPin className='text-yellow-400' />
										<p className='text-sm text-white md:text-lg'>
											{theater.translations?.find(
												(translation) => translation.languageCode === locale,
											)?.address || ''}
										</p>
									</div>

									<div className='flex items-center gap-3'>
										<Mail className='text-yellow-400' />
										<p className='text-sm text-white md:text-lg'>{theater.email}</p>
									</div>

									<div className='flex items-center gap-3'>
										<PhoneCall className='text-yellow-400' />
										<p className='text-sm text-white md:text-lg'>{theater.phone}</p>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AboutPage;
