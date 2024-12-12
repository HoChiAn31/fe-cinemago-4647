'use client';

import React from 'react';

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='w-full max-w-md rounded bg-white p-4'>
				{children}
				<button className='text-gray-700 absolute right-2 top-2' onClick={onClose}>
					&times;
				</button>
			</div>
		</div>
	);
};

export default Modal;
