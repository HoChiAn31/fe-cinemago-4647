'use client';
import React from 'react';
import { Button, Input, Spinner } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import { RoomEdit } from '../../types'; // Import the Room type
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeaderUpdate from '@/app/components/ManagementHeader';

const EditRoomPage = () => {
	const t = useTranslations('AdminRoom.AdminRoomGeneral');
	const toastT = useTranslations('AdminToast');
	const params = useParams();

	const roomId = params.roomId as string;

	const [room, setRoom] = useState<RoomEdit | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();

	const fetchRoom = async () => {
		axios
			.get(`http://localhost:5000/rooms/${roomId}`)
			.then((res) => {
				setRoom(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
				toast.error(toastT('fetchFailed'));
			});
	};
	useEffect(() => {
		fetchRoom();
	}, [roomId]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRoom((prevState) => {
			if (!prevState) return null;
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleEditRoom = () => {
		setIsEditing(true);
		console.log(room);

		const updatePromise = axios.put(`http://localhost:5000/rooms/${roomId}`, room);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: () => {
					setTimeout(() => {
						router.back();
					}, 3000);
					return toastT('updateSuccess');
				},
				error: toastT('updateError'),
			},
			{
				duration: 3000,
			},
		);

		updatePromise
			.then((response) => {
				// No need to handle success here since toast.promise already does
			})
			.catch((error) => {
				console.error('Error updating room:', error);
			})
			.finally(() => {
				setIsEditing(false);
			});
	};

	return (
		<div className='p-4'>
			<ManagementHeaderUpdate isBack={true} onChangeBack={() => router.back()} />
			<div className='space-y-4'>
				<Input
					fullWidth
					type='text'
					name='name'
					value={room?.name}
					onChange={handleInputChange}
					label={t('name')}
					required
					variant='bordered'
					radius='sm'
				/>

				<Input
					fullWidth
					type='text'
					name='screeningType'
					value={room?.screeningType}
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
					value={room?.totalSeats.toString()}
					onChange={handleInputChange}
					label={t('screeningType')}
					required
					variant='bordered'
					radius='sm'
				/>

				<Button
					onClick={handleEditRoom}
					type='submit'
					color='primary'
					disabled={isEditing}
					fullWidth
				>
					{isEditing ? <Spinner size='sm' /> : t('editMovie')}
				</Button>
			</div>

			<Toaster />
		</div>
	);
};

export default EditRoomPage;
