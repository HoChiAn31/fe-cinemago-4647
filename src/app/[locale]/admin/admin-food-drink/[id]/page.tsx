'use client';
import { Button, Image, Input, Spacer, Spinner } from '@nextui-org/react';
import { FoodDrink } from '../types'; // Import FoodDrink type
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeader from '@/app/components/ManagementHeader';

const EditFoodDrinkPage = () => {
	const t = useTranslations('AdminFoodDrink.edit'); // Update to use a new translation key
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [foodDrink, setFoodDrink] = useState<FoodDrink | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null); // State for the image file
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchFoodDrink = async () => {
			const response = await fetch(`http://localhost:5000/food-drinks/${id}`);
			const data = await response.json();
			setFoodDrink(data);
		};
		fetchFoodDrink();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFoodDrink((prevState) => {
			if (!prevState) return null;

			if (name in prevState) {
				// Ensure name is a valid key
				return {
					...prevState,
					[name as keyof FoodDrink]: value, // Cast to keyof FoodDrink
				};
			}
			return prevState; // Return the previous state if name is not a valid key
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleTranslationChange = (
		langId: string,
		field: 'name' | 'description',
		value: string,
	) => {
		setFoodDrink((prevState) => {
			if (!prevState) return null;

			const updatedTranslations = prevState.translations.map((translation) =>
				translation.categoryLanguage.languageCode === langId
					? { ...translation, [field]: value }
					: translation,
			);
			return { ...prevState, translations: updatedTranslations };
		});
	};

	const handleEditFoodDrink = async () => {
		setIsEditing(true);
		const formData = new FormData();

		if (foodDrink) {
			formData.append('price', foodDrink.price);
			if (imageFile) {
				formData.append('image', imageFile); // Append the new image file
			}

			foodDrink.translations.forEach((translation) => {
				formData.append('translations[]', JSON.stringify(translation)); // Assuming your backend can handle this format
			});
		}

		try {
			const response = await axios.put(`http://localhost:5000/food-drinks/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (response.data.affected === 1) {
				toast.success(toastT('updateSuccess'));
				setTimeout(() => {
					router.push(`/${locale}/admin/admin-food-drink/`);
				}, 3000);
			} else {
				throw new Error(toastT('updateFailed'));
			}
		} catch (error) {
			console.error('Error updating food/drink:', error);
			toast.error(toastT('updateError'));
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<div className='p-4'>
			<ManagementHeader isBack={true} onChangeBack={() => router.back()} />
			<div className='space-y-4'>
				{foodDrink && (
					<>
						<Image src={foodDrink.image} alt='image' height={120} width={120} />
						<Spacer y={4} />
						<Input
							fullWidth
							type='file'
							onChange={handleImageChange}
							label={t('uploadImage')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='price'
							value={foodDrink.price}
							onChange={handleInputChange}
							label={t('price')}
							required
							variant='bordered'
						/>

						{/* Image input */}

						{foodDrink.translations.map((translation) => (
							<div key={translation.categoryLanguage.id}>
								<Input
									fullWidth
									type='text'
									value={translation.name || ''}
									onChange={(e) =>
										handleTranslationChange(
											translation.categoryLanguage.languageCode,
											'name',
											e.target.value,
										)
									}
									label={t(`name_${translation.categoryLanguage.languageCode}`)}
									required
									variant='bordered'
								/>
								<Input
									fullWidth
									type='text'
									value={translation.description || ''}
									onChange={(e) =>
										handleTranslationChange(
											translation.categoryLanguage.languageCode,
											'description',
											e.target.value,
										)
									}
									label={t(`description_${translation.categoryLanguage.languageCode}`)}
									required
									variant='bordered'
								/>
							</div>
						))}

						<Button
							onClick={handleEditFoodDrink}
							type='submit'
							color='primary'
							isDisabled={isEditing}
							fullWidth
						>
							{isEditing ? <Spinner size='sm' /> : t('editFoodDrink')}
						</Button>
					</>
				)}
			</div>
			<Toaster />
		</div>
	);
};

export default EditFoodDrinkPage;
