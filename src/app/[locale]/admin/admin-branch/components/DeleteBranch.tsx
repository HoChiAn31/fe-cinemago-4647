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
import { Branch } from '../types'; // Adjust the import based on your types
import toast, { Toaster } from 'react-hot-toast';

interface DeleteBranchModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	branchToDelete: Branch | null;
	onDeleteBranch: (branchId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteBranchModal: React.FC<DeleteBranchModalProps> = ({
	isOpen,
	onOpenChange,
	branchToDelete,
	onDeleteBranch,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteBranch = async () => {
		if (!branchToDelete) return;

		setIsDeleting(true);
		try {
			await axios.delete(`http://localhost:5000/branch/${branchToDelete.id}`);

			onDeleteBranch(branchToDelete.id);
			toast.success('The branch has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting branch:', error);
			if (axios.isAxiosError(error)) {
				toast.error(`Error deleting branch: ${error.response?.data?.message || error.message}`, {
					duration: 3000,
				});
			} else {
				toast.error('An unexpected error occurred while deleting the branch', {
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
						<ModalHeader className='flex flex-col gap-1'>Delete Branch</ModalHeader>
						<ModalBody className=''>
							<p>Are you sure you want to delete the branch? This action cannot be undone.</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteBranch} isDisabled={isDeleting}>
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

export default DeleteBranchModal;
