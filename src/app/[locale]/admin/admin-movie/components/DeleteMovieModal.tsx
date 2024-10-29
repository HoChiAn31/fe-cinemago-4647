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
import { Movie } from '../types';
import toast, { Toaster } from 'react-hot-toast';

interface DeleteMovieModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	movieToDelete: Movie | null;
	onDeleteMovie: (movieId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({
	isOpen,
	onOpenChange,
	movieToDelete,
	onDeleteMovie,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteMovie = async () => {
		if (!movieToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(`http://localhost:5000/movies/${movieToDelete.id}`);

			onDeleteMovie(movieToDelete.id);
			toast.success('The movie has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting movie:', error);
			if (axios.isAxiosError(error)) {
				toast.error(`Error deleting movie: ${error.response?.data?.message || error.message}`, {
					duration: 3000,
				});
			} else {
				toast.error('An unexpected error occurred while deleting the movie', {
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
						<ModalHeader className='flex flex-col gap-1'>Delete Movie</ModalHeader>
						<ModalBody className=''>
							<p>
								Are you sure you want to delete the movie "{movieToDelete?.translations[0]?.name}"?
								This action cannot be undone.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteMovie} isDisabled={isDeleting}>
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

export default DeleteMovieModal;
