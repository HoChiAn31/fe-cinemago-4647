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
import { Voucher } from '../types'; // Adjust the import based on your types
import toast, { Toaster } from 'react-hot-toast';

interface DeleteVoucherModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	voucherToDelete: Voucher | null;
	onDeleteVoucher: (voucherId: string) => void;
	onFinishDeleting: () => void;
}

const DeleteVoucherModal: React.FC<DeleteVoucherModalProps> = ({
	isOpen,
	onOpenChange,
	voucherToDelete,
	onDeleteVoucher,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteVoucher = async () => {
		if (!voucherToDelete) return;

		setIsDeleting(true);
		try {
			await axios.delete(`http://localhost:5000/vouchers/${voucherToDelete.id}`);

			onDeleteVoucher(voucherToDelete.id);
			toast.success('The voucher has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting voucher:', error);
			if (axios.isAxiosError(error)) {
				toast.error(`Error deleting voucher: ${error.response?.data?.message || error.message}`, {
					duration: 3000,
				});
			} else {
				toast.error('An unexpected error occurred while deleting the voucher.', {
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
						<ModalHeader className='flex flex-col gap-1'>Delete Voucher</ModalHeader>
						<ModalBody>
							<p>Are you sure you want to delete this voucher? This action cannot be undone.</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteVoucher} isDisabled={isDeleting}>
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

export default DeleteVoucherModal;
