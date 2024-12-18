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
import { ShowTime } from '../types'; // Adjust the import based on your types
import toast, { Toaster } from 'react-hot-toast';

interface DeleteShowTimeModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	showTimeToDelete: ShowTime | null;
	onDeleteShowTime: (showTimeId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteShowTimeModal: React.FC<DeleteShowTimeModalProps> = ({
	isOpen,
	onOpenChange,
	showTimeToDelete,
	onDeleteShowTime,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteShowTime = async () => {
		if (!showTimeToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(
				`http://localhost:5000/show-times/${showTimeToDelete.id}`,
			);

			onDeleteShowTime(showTimeToDelete.id);
			toast.success('The showtime has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting showtime:', error);
			if (axios.isAxiosError(error)) {
				toast.error(`Error deleting showtime: ${error.response?.data?.message || error.message}`, {
					duration: 3000,
				});
			} else {
				toast.error('An unexpected error occurred while deleting the showtime.', {
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
						<ModalHeader className='flex flex-col gap-1'>Delete Showtime</ModalHeader>
						<ModalBody>
							<p>Are you sure you want to delete this showtime? This action cannot be undone.</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteShowTime} isDisabled={isDeleting}>
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

export default DeleteShowTimeModal;
