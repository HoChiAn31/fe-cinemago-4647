import React from 'react';
import { Movie } from '../types';

interface EditMovieModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	movieToEdit: Movie | null;
	onEditMovie: () => void;
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({
	isOpen,
	onOpenChange,
	movieToEdit,
	onEditMovie,
}) => {
	return <div>{/* Implement edit movie modal here */}</div>;
};

export default EditMovieModal;
