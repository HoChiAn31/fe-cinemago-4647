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
import { FoodDrink } from '../types'; // Adjust the import based on your types
import toast, { Toaster } from 'react-hot-toast';

interface DeleteFoodDrinkModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	foodDrinkToDelete: FoodDrink | null;
	onDeleteFoodDrink: (foodDrinkId: string) => void;
	onFinishDeleting: () => void;
}

const SearchAndFilter: React.FC<DeleteFoodDrinkModalProps> = ({
	isOpen,
	onOpenChange,
	foodDrinkToDelete,
	onDeleteFoodDrink,
	onFinishDeleting,
}) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteFoodDrink = async () => {
		if (!foodDrinkToDelete) return;

		setIsDeleting(true);
		try {
			const response = await axios.delete(
				`http://localhost:5000/food-drinks/${foodDrinkToDelete.id}`,
			);

			onDeleteFoodDrink(foodDrinkToDelete.id);
			toast.success('The food/drink item has been successfully deleted.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error deleting food/drink item:', error);
			if (axios.isAxiosError(error)) {
				toast.error(
					`Error deleting food/drink item: ${error.response?.data?.message || error.message}`,
					{
						duration: 3000,
					},
				);
			} else {
				toast.error('An unexpected error occurred while deleting the food/drink item', {
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
						<ModalHeader className='flex flex-col gap-1'>Delete Food/Drink Item</ModalHeader>
						<ModalBody>
							<p>
								Are you sure you want to delete this food/drink item? This action cannot be undone.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color='default' variant='light' onPress={onClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button color='danger' onPress={handleDeleteFoodDrink} isDisabled={isDeleting}>
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

export default SearchAndFilter;
