'use client';
import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Room, RoomAdd } from '../types'; // Adjust import based on your definitions
import { useTranslations } from 'next-intl';
import { useTheme } from '@/app/context/ThemeContext';

interface AddRoomProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddRoom: (room: Room) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
	idBranch: string;
}

const AddRoom: React.FC<AddRoomProps> = ({
	isOpen,
	onOpenChange,
	onAddRoom,
	onFinishAdding,
	onReloadData,
	idBranch,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminRoom.AdminRoomGeneral');
	// const [dataBranches, setDataBranches] = useState<Branch[]>([]);
	const { url } = useTheme();
	const [newRoom, setNewRoom] = useState<RoomAdd>({
		name: '',
		screeningType: '',
		totalSeats: 0, // Add default value for totalSeats
		branch: idBranch, // Add default value for branch
	});

	const fetchDataBranches = async () => {
		axios
			.get(`${url}/branch`)
			.then((res) => {
				// setDataBranches(res.data.data);
				console.log(res.data.data);
				// setIsLoadingBranches(true);
				// setIsAdding(true);
				// onFinishAdding();
				// onReloadData();
				// onOpenChange && onOpenChange();
			})
			.catch((err) => {
				console.error(err);
			});
	};
	useEffect(() => {
		fetchDataBranches();
	}, []);
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setNewRoom((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddRoom = () => {
		console.log(newRoom);
		setIsAdding(true);

		axios
			.post('http://localhost:5000/rooms', newRoom)
			.then((response) => {
				setTimeout(() => {
					onAddRoom(response.data.data);
					onFinishAdding();
					onReloadData();
					onOpenChange?.();
				}, 1500);
				toast.success('The new room has been successfully added.', {
					duration: 3000,
				});
			})
			.catch((error) => {
				console.error('Error adding room:', error);
				toast.error('An error occurred while adding the room. Please try again.', {
					duration: 3000,
				});
			})
			.finally(() => {
				setIsAdding(false);
			});
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
				<Input
					fullWidth
					type='text'
					name='screeningType'
					value={newRoom.screeningType}
					onChange={handleInputChange}
					label={t('screeningType')}
					required
					variant='bordered'
					radius='sm'
				/>
				<Input
					fullWidth
					type='number'
					name='totalSeats'
					value={newRoom.totalSeats.toString()}
					onChange={handleInputChange}
					label={t('screeningType')}
					required
					variant='bordered'
					radius='sm'
				/>

				<Spacer y={2} />
				<Button onClick={handleAddRoom} type='submit' color='primary' disabled={isAdding} fullWidth>
					{isAdding ? <Spinner size='sm' /> : t('addRoom')}
				</Button>
			</form>
		</div>
	);
};

export default AddRoom;
