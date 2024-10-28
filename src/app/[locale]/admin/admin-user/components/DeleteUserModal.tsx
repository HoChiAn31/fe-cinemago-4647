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
import axios from '@/app/utils/axios';
import { User } from '../types';
import toast, { Toaster } from 'react-hot-toast';

interface DeleteUserModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	userToDelete: User | null;
	onDeleteUser: (userId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
	isOpen,
	onOpenChange,
	userToDelete,
	onDeleteUser,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteUser = async () => {
		if (!userToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(`http://localhost:5000/users/${userToDelete.id}`);

			onDeleteUser(userToDelete.id);
			toast.success('The user has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting user:', error);
			toast.error(`Error deleting user: ${error}`, {
				duration: 3000,
			});
			// } else {
			// 	toast.error('An unexpected error occurred while deleting the user', {
			// 		duration: 3000,
			// 	});
			// }
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
						<ModalHeader className='flex flex-col gap-1'>Delete User</ModalHeader>
						<ModalBody className=''>
							<p>
								Are you sure you want to delete the user "{userToDelete?.lastName}"? This action
								cannot be undone.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteUser} isDisabled={isDeleting}>
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

export default DeleteUserModal;
