import { Button } from '@nextui-org/react';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface ManagementHeaderProps {
	title: string;
	buttonText: string;
	onPress?: () => void;
	isAddOpen: boolean;
	onChangeAdd: () => void;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
	title,
	buttonText,
	onPress,
	isAddOpen,
	onChangeAdd,
}) => {
	return (
		<div className='flex items-center justify-between pb-6'>
			{isAddOpen ? (
				<>
					<Button
						className='bg-transparent text-base'
						variant='bordered'
						startContent={<ChevronLeft />}
						color='primary'
						onClick={onChangeAdd}
					>
						Quay lại
					</Button>
				</>
			) : (
				<>
					<h3 className='text-3xl font-bold text-second'>{title}</h3>
					<div>
						<Button className='bg-primary px-8 text-lg text-white' onPress={onChangeAdd}>
							{buttonText}
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default ManagementHeader;
