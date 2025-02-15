import React from 'react';
import { Button } from '@nextui-org/react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ManagementHeaderProps {
	title?: string;
	buttonText?: string;
	onPress?: () => void;
	isOpen?: boolean;
	onChange?: () => void;
	titleOpen?: React.ReactNode;
	isBack?: boolean;
	onChangeBack?: () => void;
	isHidden?: boolean;
	isEdit?: boolean;
	onEdit?: () => void;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
	title,
	// buttonText,
	// onPress,
	isOpen,
	onChange,
	// titleOpen,
	isBack,
	onChangeBack,
	isHidden,
	isEdit,
	onEdit,
}) => {
	if (isHidden) {
		return null;
	}
	const t = useTranslations('ManagementHeader');
	return (
		<div className='flex items-center justify-between pb-6'>
			{isBack && (
				<>
					<Button
						className='border text-base'
						variant='bordered'
						startContent={<ChevronLeft height={20} width={20} />}
						color='primary'
						onClick={onChangeBack}
						radius='sm'
					>
						{t('back')}
					</Button>
				</>
			)}
			{title && (
				<div className='flex items-center justify-center'>
					<h3 className='text-3xl font-bold text-second'>{title}</h3>
				</div>
			)}
			{isOpen && (
				<>
					<Button
						className='border text-base'
						variant='bordered'
						color='primary'
						startContent={<Plus height={20} width={20} />}
						onClick={onChange}
						radius='sm'
					>
						{t('add')}
					</Button>
				</>
			)}
			{isEdit && (
				<>
					<Button
						className='border text-base'
						variant='bordered'
						color='primary'
						startContent={<Plus height={20} width={20} />}
						onClick={onEdit}
						radius='sm'
					>
						{t('edit')}
					</Button>
				</>
			)}
		</div>
	);
};

export default ManagementHeader;
