import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Room, RoomAdd } from '../types'; // Adjust import based on your definitions
import { useTranslations } from 'next-intl';

interface AddRoomModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddRoom: (room: Room) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
	isOpen,
	onOpenChange,
	onAddRoom,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminRoomAdd');
	// const [newRoom, setNewRoom] = useState<RoomAdd>({
	// 	name: ''

	// });
	const [newRoom, setNewRoom] = useState<RoomAdd>({
		name: '',
		screeningType: '',
		totalSeats: 0, // Add default value for totalSeats
		branch: '', // Add default value for branch
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewRoom((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddRoom = async () => {
		console.log(newRoom);
		setIsAdding(true);
		try {
			const response = await axios.post('http://localhost:5000/room', newRoom);
			if (response.data && response.data.success) {
				onAddRoom(response.data.data);
				onFinishAdding();
				onReloadData();
				// Reset form
				// setNewRoom({ name: '' });
				onOpenChange && onOpenChange(); // Close modal
				toast.success('The new room has been successfully added.', {
					duration: 3000,
				});
			} else {
				console.error('Failed to add room. Response:', response.data);
				toast.error('Failed to add room. Please try again.', {
					duration: 3000,
				});
			}
		} catch (error) {
			console.error('Error adding room:', error);
			toast.error('An error occurred while adding the room. Please try again.', {
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
			<h1 className='mb-4 text-2xl font-bold'>Add New Room</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddRoom();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='name'
					value={newRoom.name}
					onChange={handleInputChange}
					label={t('name')}
					required
					variant='bordered'
				/>
				{/* <Input
					fullWidth
					type='number'
					name='capacity'
					value={newRoom.capacity}
					onChange={handleInputChange}
					label={t('capacity')}
					required
					variant='bordered'
				/> */}
				{/* <Input
					fullWidth
					type='text'
					name='features'
					value={newRoom.features}
					onChange={handleInputChange}
					label={t('features')}
					variant='bordered'
				/> */}

				<Spacer y={2} />
				<Button onClick={handleAddRoom} type='submit' color='primary' disabled={isAdding} fullWidth>
					{isAdding ? <Spinner size='sm' /> : t('addRoom')}
				</Button>
			</form>
		</div>
	);
};

export default AddRoomModal;
