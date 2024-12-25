import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import axios from '@/app/utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Branch, BranchAdd } from '../types'; // Điều chỉnh import dựa trên định nghĩa của bạn
import { useTranslations } from 'next-intl';

interface AddBranchModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddBranch: (branch: Branch) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({
	isOpen,
	onOpenChange,
	onAddBranch,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminBranch.add');
	const [newBranch, setNewBranch] = useState<BranchAdd>({
		email: '',
		phone: '',
		translations: [
			{ languageCode: 'vi', name: '', address: '', description: '' },
			{ languageCode: 'en', name: '', address: '', description: '' },
		], // Khởi tạo với hai bản dịch cho 'vi' và 'en'
	});

	useEffect(() => {
		// Fetch any necessary data if needed
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewBranch((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Handle translation input change
	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedTranslations = [...newBranch.translations];
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[name]: value,
		};
		setNewBranch((prevState) => ({
			...prevState,
			translations: updatedTranslations,
		}));
	};

	const handleAddBranch = async () => {
		console.log(newBranch);
		// setIsAdding(true);
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/branch`, newBranch);
			if (response.data && response.data.success) {
				// onAddBranch(response.data.data);
				onFinishAdding();
				onReloadData();
				// Reset form
				setNewBranch({
					email: '',
					phone: '',
					translations: [
						{ languageCode: 'vi', name: '', address: '', description: '' },
						{ languageCode: 'en', name: '', address: '', description: '' },
					],
				});
				onOpenChange && onOpenChange(); // Đóng modal
				toast.success('The new branch has been successfully added.', {
					duration: 3000,
				});
			} else {
				onAddBranch(response.data.data);
				onFinishAdding();
				onReloadData();
				console.error('Failed to add branch. Response:', response.data);
				toast.error('Failed to add branch. Please try again.', {
					duration: 3000,
				});
			}
		} catch (error) {
			console.error('Error adding branch:', error);
			toast.error('An error occurred while adding the branch. Please try again.', {
				duration: 3000,
			});
		} finally {
			setIsAdding(false);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className='container mx-auto rounded-lg p-4'>
			{/* <h1 className='mb-4 text-2xl font-bold'>Add New Branch</h1> */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddBranch();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='email'
					name='email'
					value={newBranch.email}
					onChange={handleInputChange}
					label={t('email')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='phone'
					value={newBranch.phone}
					onChange={handleInputChange}
					label={t('phone')}
					required
					variant='bordered'
				/>

				{/* Translation inputs */}
				{newBranch.translations.map((translation, index) => (
					<div key={index} className='space-y-2'>
						<h3 className='text-xl font-semibold'>
							{translation.languageCode === 'vi' ? 'Tiếng Việt' : 'English'}
						</h3>
						<Input
							fullWidth
							type='text'
							name='languageCode'
							value={translation.languageCode}
							label={t('languageCode')}
							disabled // Không cho phép chỉnh sửa languageCode
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

				<Spacer y={2} />
				<Button
					onClick={handleAddBranch}
					type='submit'
					color='primary'
					disabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addBranch')}
				</Button>
			</form>
			<Toaster />
		</div>
	);
};

export default AddBranchModal;
