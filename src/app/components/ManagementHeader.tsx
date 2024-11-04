import { Button } from '@nextui-org/react';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface ManagementHeaderProps {
	title?: string;
	buttonText?: string;
	onPress?: () => void;
	isOpen?: boolean;
	onChange?: () => void;
	titleOpen?: string;
	isBack?: boolean;
	onChangeBack?: () => void;
	isHidden?: boolean;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
	title,
	buttonText,
	onPress,
	isOpen,
	onChange,
	titleOpen,
	isBack,
	onChangeBack,
	isHidden,
}) => {
	if (isHidden) {
		return null;
	}
	return (
		<div className='flex items-center justify-between pb-6'>
			{isBack && (
				<>
					<Button
						className='border bg-transparent text-base'
						variant='bordered'
						startContent={<ChevronLeft />}
						color='primary'
						onClick={onChangeBack}
						radius='sm'
						size='sm'
					>
						Quay lại
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
						className='bg-transparent text-base'
						variant='faded'
						color='primary'
						onClick={onChange}
						radius='sm'
					>
						{titleOpen}
					</Button>
				</>
			)}
		</div>
	);
};

export default ManagementHeader;
