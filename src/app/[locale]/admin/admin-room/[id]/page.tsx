'use client';
import { Button, Input, Spinner } from '@nextui-org/react';
import { Room } from '../types'; // Import the Room type
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ManagementHeader from '@/app/components/ManagementHeader';

const EditRoomPage = () => {
	const t = useTranslations('AdminRoomEdit');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [room, setRoom] = useState<Room | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();

	useEffect(() => {
		const fetchRoom = async () => {
			const response = await fetch(`http://localhost:5000/room/${id}`);
			const data = await response.json();
			setRoom(data);
		};
		fetchRoom();
	}, [id]);

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

	const handleEditRoom = async () => {
		setIsEditing(true);
		const updatePromise = axios.put(`http://localhost:5000/rooms/${id}`, room);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: (response) => {
					if (response.data.affected === 1) {
						setTimeout(() => {
							router.push(`/${locale}/admin/admin-room/`);
						}, 3000);
						return toastT('updateSuccess');
					} else {
						throw new Error(toastT('updateFailed'));
					}
				},
				error: toastT('updateError'),
			},
			{
				duration: 3000,
			},
		);

		try {
			await updatePromise;
		} catch (error) {
			console.error('Error updating room:', error);
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<div className='p-4'>
			<ManagementHeader isOpen={true} onChange={() => router.back()} />
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
				/>
				{/* <Input
					fullWidth
					type='text'
					name='capacity'
					value={room?.capacity}
					onChange={handleInputChange}
					label={t('capacity')}
					required
					variant='bordered'
				/> */}
				{/* Add more fields as necessary */}
			</div>
			<Button onClick={handleEditRoom} type='submit' color='primary' disabled={isEditing} fullWidth>
				{isEditing ? <Spinner size='sm' /> : t('editRoom')}
			</Button>
			<Toaster />
		</div>
	);
};

export default EditRoomPage;
