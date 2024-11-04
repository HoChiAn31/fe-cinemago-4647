'use client';
import { Image } from '@nextui-org/react';
import { FC } from 'react';

const NotFoundPage: FC = () => {
	return (
		<div className='mt-5 flex w-full items-center justify-center px-2'>
			<div>
				<Image
					src='https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png'
					height={240}
				/>
				<div className='my-5 text-center text-2xl'>Page not found</div>
			</div>
		</div>
	);
};
export default NotFoundPage;
