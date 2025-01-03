import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FoodDrinkAdd } from '../types';
import { useTranslations } from 'next-intl';

interface AddFoodDrinkModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddFoodDrink: (foodDrink: FoodDrinkAdd) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddFoodDrinkModal: React.FC<AddFoodDrinkModalProps> = ({
	isOpen,
	onOpenChange,
	onAddFoodDrink,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminFoodDrinkAdd');
	const [newFoodDrink, setNewFoodDrink] = useState<FoodDrinkAdd>({
		price: '',
		image: '',
		translations: [
			{
				categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
				name: '',
				description: '',
			},
			{
				categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
				name: '',
				description: '',
			},
		],
		type: 'food',
	});
	const [imageFile, setImageFile] = useState<File | null>(null); // New state for handling file

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewFoodDrink((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedTranslations = [...newFoodDrink.translations];
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[name]: value,
		};
		setNewFoodDrink((prevState: FoodDrinkAdd) => ({
			...prevState,
			translations: updatedTranslations,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleAddFoodDrink = async () => {
		setIsAdding(true);
		const formData = new FormData();
		formData.append('price', newFoodDrink.price);
		formData.append('type', newFoodDrink.type);

		if (imageFile) {
			console.log('imageFile', imageFile);
			console.log('imageFile', typeof imageFile);
			formData.append('image', imageFile);
		}
		newFoodDrink.translations.forEach((translation) => {
			formData.append('translations[]', JSON.stringify(translation));
		});

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
		try {
			const response = await axios.post('http://localhost:5000/food-drinks', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(response);
			if (response.status === 201) {
				onAddFoodDrink(response.data.data);
				onFinishAdding();
				onReloadData();
				setNewFoodDrink({
					price: '',
					image: '',
					translations: [
						{
							categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
							name: '',
							description: '',
						},
						{
							categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
							name: '',
							description: '',
						},
					],
					type: 'combo',
				});
				setImageFile(null); // Reset file state
				onOpenChange && onOpenChange();
				toast.success('The new food/drink has been successfully added.');
			} else {
				toast.error('Failed to add food/drink. Please try again.');
			}
		} catch (error) {
			toast.error('An error occurred while adding the food/drink. Please try again.');
		} finally {
			setIsAdding(false);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className='container mx-auto rounded-lg p-4'>
			<h1 className='mb-4 text-2xl font-bold'>Add New Food/Drink</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddFoodDrink();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='price'
					value={newFoodDrink.price}
					onChange={handleInputChange}
					label={t('price')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='file'
					name='image'
					onChange={handleFileChange}
					label={t('image')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				{newFoodDrink.translations.map((translation, index) => (
					<div key={index} className='space-y-2'>
						<h3 className='text-xl font-semibold'>
							{translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
								? 'Tiếng Việt'
								: 'English'}
						</h3>
						<Input
							fullWidth
							type='text'
							name='name'
							value={translation.name}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description'
							value={translation.description}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('description')}
							required
							variant='bordered'
						/>
					</div>
				))}
				<Spacer y={2} />
				<Button
					onClick={handleAddFoodDrink}
					type='submit'
					color='primary'
					disabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addFoodDrink')}
				</Button>
			</form>
		</div>
	);
};

export default AddFoodDrinkModal;
