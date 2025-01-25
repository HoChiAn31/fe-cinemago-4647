import {
	Modal,
	Button,
	Select,
	ModalHeader,
	ModalBody,
	ModalFooter,
	SelectItem,
	ModalContent,
} from '@nextui-org/react';
import React, { FC, useState } from 'react';
import { Order } from '@/app/types/Order';

interface EditOrderModalProps {
	isVisible: boolean;
	order: Order | null;
	onClose: () => void;
	onSave: (updatedOrder: Order) => void;
}

const EditOrderModal: FC<EditOrderModalProps> = ({ isVisible, order, onClose, onSave }) => {
	const [status, setStatus] = useState<string>(order?.payment.paymentStatus || '');

	// Handle change in select input
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(event.target.value); // Set the selected value to status
	};

	const handleSave = () => {
		if (order) {
			// Update the order with the new status
			const updatedOrder = { ...order, payment: { ...order.payment, paymentStatus: status } };
			onSave(updatedOrder);
		}
		onClose();
	};

	return (
		<Modal closeButton isOpen={isVisible} onClose={onClose}>
			<ModalContent>
				<ModalHeader>
					<h3>Edit Order Status</h3>
				</ModalHeader>
				<ModalBody>
					{order && (
						<div>
							<div>
								<label className='block text-sm'>Order ID: {order.id}</label>
							</div>
							<div>
								<label className='block text-sm'>Status</label>
								<Select value={status} onChange={handleChange} aria-label='Select Order Status'>
									<SelectItem key='Đã thanh toán'>Đã thanh toán</SelectItem>
									<SelectItem key='Chưa thanh toán'>Chưa thanh toán</SelectItem>
									<SelectItem key='Đang xử lý'>Đang xử lý</SelectItem>
									<SelectItem key='Đã hủy'>Đã hủy</SelectItem>
								</Select>
							</div>
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					<Button color='danger' onPress={onClose}>
						Close
					</Button>
					<Button onPress={handleSave}>Save</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditOrderModal;
