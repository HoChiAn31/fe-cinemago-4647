'use client';
import { Button, Input, Spinner } from '@nextui-org/react';
import { Branch } from '../types'; // Import the Branch type
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeader from '@/app/components/ManagementHeader';

const EditBranchPage = () => {
	const t = useTranslations('AdminBranch.edit');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [branch, setBranch] = useState<Branch | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchBranch = async () => {
			const response = await fetch(`http://localhost:5000/branch/${id}`);
			const data = await response.json();
			setBranch(data);
		};
		fetchBranch();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();
		if (name === 'phone' && /[^0-9]/.test(trimmedValue)) {
			// Nếu nhập vào không phải số, không cập nhật giá trị
			if (trimmedValue.length > 12) return;
			return;
		}
		setBranch((prevState) => {
			if (!prevState) return null;
			return {
				...prevState,
				[name]: trimmedValue,
			};
		});
	};

	const handleEditBranch = async () => {
		setIsEditing(true);
		const updatePromise = axios.put(`http://localhost:5000/branch/${id}`, branch);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: (response) => {
					if (response.data.affected === 1) {
						setTimeout(() => {
							router.push(`/${locale}/admin/admin-branch/`);
						}, 800);
						return toastT('updateSuccess');
					} else {
						throw new Error(toastT('updateFailed'));
					}
				},
				error: toastT('updateError'),
			},
			{
				duration: 800,
			},
		);

		try {
			await updatePromise;
		} catch (error) {
			console.error('Error updating branch:', error);
		} finally {
			setIsEditing(false);
		}
	};

	const handleTranslationChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		console.log(name, value);

		// Update the specific translation at the given index
		setBranch((prevState) => {
			if (!prevState) return null;

			// Update the translation field based on the index and input name
			const updatedTranslations = [...prevState.translations];
			updatedTranslations[index] = {
				...updatedTranslations[index],
				[name]: value,
			};

			return {
				...prevState,
				translations: updatedTranslations,
			};
		});
	};

	return (
		<div className='p-4'>
			<ManagementHeader isBack={true} onChangeBack={() => router.back()} />
			<div className='space-y-4'>
				<Input
					fullWidth
					type='email'
					name='email'
					value={branch?.email}
					onChange={handleInputChange}
					label={t('email')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='phone'
					value={branch?.phone}
					onChange={handleInputChange}
					label={t('phone')}
					required
					variant='bordered'
				/>

				{/* Translation inputs */}
				{branch?.translations.map((translation, index) => (
					<div key={index} className='space-y-2'>
						<h3 className='text-xl font-semibold'>
							{translation.languageCode === 'vi' ? 'Tiếng Việt:' : 'English:'}
						</h3>
						<Input
							fullWidth
							type='text'
							name='languageCode'
							value={translation.languageCode}
							label={t('languageCode')}
							disabled
							variant='bordered'
						/>
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
							name='address'
							value={translation.address}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('address')}
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
			</div>
			<Button
				onClick={handleEditBranch}
				type='submit'
				color='primary'
				disabled={isEditing}
				fullWidth
			>
				{isEditing ? <Spinner size='sm' /> : t('addBranch')}
			</Button>
			<Toaster />
		</div>
	);
};

export default EditBranchPage;
