'use client';
import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { User } from '../types'; // Import the User type
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from '@/app/utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { selectRole } from '@/app/services/select';

const EditUserModal = () => {
	// Accept user prop
	const t = useTranslations('AdminUserAdd');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [user, setUser] = useState<User | null>(null);
	const [firstRole, setFirstRole] = useState<String>();
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();
	console.log(firstRole);
	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(`http://localhost:5000/users/${id}`);

			setUser(response.data);
			setFirstRole(response.data.role);
		};
		fetchUser();
	}, [id]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setUser((prevState) => {
			if (!prevState) return null;
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleUpdateUser = async () => {
		setIsEditing(true);

		const updatePromise = axios.put(`http://localhost:5000/users/${id}`, user);

		toast.promise(
			updatePromise,
			{
				loading: toastT('updating'),
				success: (response) => {
					if (response.data.affected === 1) {
						setTimeout(() => {
							router.push(`/${locale}/admin/admin-user/`);
						}, 1500);
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
			console.error('Error updating user:', error);
		} finally {
			setIsEditing(false);
		}
	};
	if (!user) {
		return null;
	}
	return (
		<div className='bg-white p-4'>
			<div className='space-y-4'>
				<Input
					fullWidth
					type='text'
					name='firstName'
					value={user?.firstName}
					onChange={handleInputChange}
					label={t('firstName')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='lastName'
					value={user?.lastName}
					onChange={handleInputChange}
					label={t('lastName')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='email'
					name='email'
					value={user?.email}
					onChange={handleInputChange}
					label={t('email')}
					required
					variant='bordered'
					disabled
				/>
				<Select
					name='role'
					label={t('role')}
					value={firstRole?.toString() || ''}
					onChange={(e) => handleInputChange(e)}
					className='h-14 text-lg text-red-500'
					variant='bordered'
				>
					{selectRole.map((item) => (
						<SelectItem key={item.key} value={item.key} className='text-black'>
							{item.value}
						</SelectItem>
					))}
				</Select>
				<Button
					onClick={handleUpdateUser}
					type='submit'
					color='primary'
					isDisabled={isEditing}
					fullWidth
				>
					{isEditing ? <Spinner size='sm' /> : t('updateUser')}
				</Button>
			</div>
			<Toaster />
		</div>
	);
};

export default EditUserModal;
