import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { MovieGenre } from '../types';
import toast, { Toaster } from 'react-hot-toast';

interface DeleteMovieGenreModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	movieGenreToDelete: MovieGenre | null;
	onDeleteMovieGenre: (movieGenreId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteMovieGenreModal: React.FC<DeleteMovieGenreModalProps> = ({
	isOpen,
	onOpenChange,
	movieGenreToDelete,
	onDeleteMovieGenre,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteMovieGenre = async () => {
		if (!movieGenreToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(
				`http://localhost:5000/movie-genres/${movieGenreToDelete.id}`,
			);

			onDeleteMovieGenre(movieGenreToDelete.id);
			toast.success('The movie genre has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting movie genre:', error);
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error deleting movie genre: ${error.response?.data?.message || error.message}`,
					{
						duration: 3000,
					},
				);
			} else {
				toast.error('An unexpected error occurred while deleting the movie genre', {
					duration: 3000,
				});
			}
		} finally {
			setIsDeleting(false);
			onFinishDeleting();
			onOpenChange();
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Delete Movie Genre</ModalHeader>
						<ModalBody>
							<p>Are you sure you want to delete this movie genre? This action cannot be undone.</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteMovieGenre} isDisabled={isDeleting}>
								{isDeleting ? <Spinner size='sm' color='white' /> : 'Delete'}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
			<Toaster />
		</Modal>
	);
};

export default DeleteMovieGenreModal;
