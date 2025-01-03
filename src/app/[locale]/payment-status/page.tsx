'use client';

import React, { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { CircleCheckBig, CircleAlert } from 'lucide-react';
import Links from '@/app/components/Links';

const Status: FC = () => {
	const [isSuccess, setIsSuccess] = useState<boolean>(true);

	const t = useTranslations('Status');

	return (
		<div className='container mx-auto my-10 flex flex-col items-center justify-center gap-4 text-center'>
			<div className='flex justify-center'>
				{isSuccess ? (
					<CircleCheckBig className='h-12 w-12 text-green-600' />
				) : (
					<CircleAlert className='h-12 w-12 text-red-600' />
				)}
			</div>

			{isSuccess ? (
				<div className='font-semibold'>
					<h1 className='font-bold text-green-600'>{t('success.h1')}</h1>
					<p>{t('success.p')}</p>
					<p>{t('success.p1')}</p>
				</div>
			) : (
				<div className='font-semibold text-red-600'>
					<h1>{t('fail.h1')}</h1>
					<p>{t('fail.p')}</p>
					<p>{t('fail.p1')}</p>
				</div>
			)}

			{/* Nút chuyển về trang Home */}
			<Links
				href='/'
				className='w-fit text-nowrap rounded-md border-[0.1rem] border-blue-500 bg-blue-500 px-9 py-3 font-bold text-white transition duration-200 hover:bg-white hover:!text-blue-500'
			>
				{t('button')}
			</Links>
		</div>
	);
};

export default Status;
