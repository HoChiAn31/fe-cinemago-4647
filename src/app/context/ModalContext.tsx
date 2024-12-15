'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
	isOpen: boolean;
	trailerUrl: string;
	openModal: (url: string) => void;
	closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [trailerUrl, setTrailerUrl] = useState('');

	const openModal = (url: string) => {
		setTrailerUrl(url);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setTrailerUrl('');
	};

	return (
		<ModalContext.Provider value={{ isOpen, trailerUrl, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};
