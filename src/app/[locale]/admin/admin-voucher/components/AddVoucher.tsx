import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VoucherAdd } from '../types'; // Adjust import based on your definition
import { useTranslations } from 'next-intl';

interface AddVoucherModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddVoucher: (voucher: VoucherAdd) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddVoucherModal: React.FC<AddVoucherModalProps> = ({
	isOpen,
	onOpenChange,
	onAddVoucher,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminVoucherAdd');
	const [newVoucher, setNewVoucher] = useState<VoucherAdd>({
		discountType: '',
		discountValue: '',
		startDate: new Date(),
		endDate: new Date(),
		minimumPurchase: 0,
		applicableMovies: {
			movieIds: [],
		},
		usageLimit: 0,
		usageCount: 0,
		isActive: true,
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
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewVoucher((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedTranslations = [...newVoucher.translations];
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[name]: value,
		};
		setNewVoucher((prevState: VoucherAdd) => ({
			...prevState,
			translations: updatedTranslations,
		}));
	};

	const handleAddVoucher = async () => {
		setIsAdding(true);
		try {
			const response = await axios.post('http://localhost:5000/vouchers', newVoucher);
			if (response.data && response.data.success) {
				onAddVoucher(response.data.data);
				onFinishAdding();
				onReloadData();
				// Reset form
				setNewVoucher({
					discountType: '',
					discountValue: '',
					startDate: new Date(),
					endDate: new Date(),
					minimumPurchase: 0,
					applicableMovies: {
						movieIds: [],
					},
					usageLimit: 0,
					usageCount: 0,
					isActive: true,
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
				});
				onOpenChange && onOpenChange(); // Close modal
				toast.success('Voucher has been successfully added.', { duration: 3000 });
			} else {
				console.error('Failed to add voucher:', response.data);
				toast.error('Failed to add voucher. Please try again.', { duration: 3000 });
			}
		} catch (error) {
			console.error('Error adding voucher:', error);
			toast.error('An error occurred while adding the voucher. Please try again.', {
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
			<h1 className='mb-4 text-2xl font-bold'>Add New Voucher</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddVoucher();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='discountType'
					value={newVoucher.discountType}
					onChange={handleInputChange}
					label={t('discountType')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='text'
					name='discountValue'
					value={newVoucher.discountValue}
					onChange={handleInputChange}
					label={t('discountValue')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='date'
					name='startDate'
					value={newVoucher.startDate.toISOString().slice(0, 10)}
					onChange={handleInputChange}
					label={t('startDate')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='date'
					name='endDate'
					value={newVoucher.endDate.toISOString().slice(0, 10)}
					onChange={handleInputChange}
					label={t('endDate')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='number'
					name='minimumPurchase'
					value={newVoucher.minimumPurchase.toString()}
					onChange={handleInputChange}
					label={t('minimumPurchase')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='number'
					name='usageLimit'
					value={newVoucher.usageLimit.toString()}
					onChange={handleInputChange}
					label={t('usageLimit')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				{newVoucher.translations.map((translation, index) => (
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
					onClick={handleAddVoucher}
					type='submit'
					color='primary'
					disabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addVoucher')}
				</Button>
			</form>
		</div>
	);
};

export default AddVoucherModal;
