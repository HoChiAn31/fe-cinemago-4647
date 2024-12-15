'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';

const TrailerModal: React.FC = () => {
	const { isOpen, trailerUrl, closeModal } = useModal();

	if (!isOpen) return null;

	const handleOutsideClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
			onClick={handleOutsideClick}
		>
			<div className='relative h-[300px] w-11/12 p-5 md:h-[400px] md:w-10/12 lg:h-[500px] lg:w-4/5'>
				<iframe
					src={trailerUrl}
					className='h-full w-full rounded-xl'
					title='Trailer'
					allow='autoplay; fullscreen'
					style={{ border: 0 }}
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default TrailerModal;
