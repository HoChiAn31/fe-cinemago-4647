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
import { Room } from '../types'; // Adjust the import based on your types
import toast, { Toaster } from 'react-hot-toast';

interface DeleteRoomModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	roomToDelete: Room | null; // Change from Branch to Room
	onDeleteRoom: (roomId: string) => void; // Change from onDeleteBranch to onDeleteRoom
	onFinishDeleting: () => void;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
	isOpen,
	onOpenChange,
	roomToDelete, // Change from branchToDelete to roomToDelete
	onDeleteRoom, // Change from onDeleteBranch to onDeleteRoom
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteRoom = async () => {
		// Change from handleDeleteBranch to handleDeleteRoom
		if (!roomToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(`http://localhost:5000/rooms/${roomToDelete.id}`); // Change URL to rooms

			onDeleteRoom(roomToDelete.id); // Change from onDeleteBranch to onDeleteRoom
			toast.success('The room has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting room:', error); // Change from branch to room
			if (axios.isAxiosError(error)) {
				toast.error(`Error deleting room: ${error.response?.data?.message || error.message}`, {
					// Change from branch to room
					duration: 3000,
				});
			} else {
				toast.error('An unexpected error occurred while deleting the room', {
					// Change from branch to room
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
						<ModalHeader className='flex flex-col gap-1'>Delete Room</ModalHeader>{' '}
						{/* Change from Branch to Room */}
						<ModalBody className=''>
							<p>Are you sure you want to delete the room? This action cannot be undone.</p>{' '}
							{/* Change from branch to room */}
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteRoom} isDisabled={isDeleting}>
								{' '}
								{/* Change from handleDeleteBranch to handleDeleteRoom */}
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

export default DeleteRoomModal; // Change from DeleteBranchModal to DeleteRoomModal
