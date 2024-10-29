import { Button, Input, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import React, { ChangeEvent, useState } from 'react';
import axios from '@/app/utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { UserAdd } from '../types'; // Assuming you have a UserData type defined
import { useTranslations } from 'next-intl';
import { selectRole } from '@/app/services/select';

interface UserAddMovieModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddUser: (user: UserAdd) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const UserAddMovieModal: React.FC<UserAddMovieModalProps> = ({
	isOpen,
	onOpenChange,
	onAddUser,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminUserAdd');
	const [newUser, setNewUser] = useState<UserAdd>({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		password: '',
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNewUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddUser = async () => {
		setIsAdding(true);
		try {
			const response = await axios.post('http://localhost:5000/auth/register', newUser);
			if (response.data && response.data.success) {
				onAddUser(response.data.data);

				onReloadData();
				// Reset form
				setNewUser({ firstName: '', lastName: '', email: '', role: '', password: '' }); // Reset fields
				// onOpenChange && onOpenChange(); // Close the modal
			} else {
				console.error('Failed to add user. Response:', response.data);
			}
			setTimeout(() => {
				onFinishAdding();
			}, 3000);
			toast.success('The new user has been successfully added.', {
				duration: 3000,
			});
		} catch (error) {
			console.error('Error adding user:', error);
			toast.error('An error occurred while adding the user. Please try again.', {
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
			<h1 className='mb-4 text-2xl font-bold'>Add New User</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddUser();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='firstName'
					value={newUser.firstName}
					onChange={handleInputChange}
					label={t('firstName')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='lastName'
					value={newUser.lastName}
					onChange={handleInputChange}
					label={t('lastName')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='password'
					value={newUser.password}
					onChange={handleInputChange}
					label={t('password')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='email'
					name='email'
					value={newUser.email}
					onChange={handleInputChange}
					label={t('email')}
					required
					variant='bordered'
				/>
				<Select
					name='role'
					label={t('role')}
					value={newUser.role}
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
				<Spacer y={2} />
				<Button
					onClick={handleAddUser}
					type='submit'
					color='primary'
					isDisabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addUser')}
				</Button>
			</form>
			<Toaster />
		</div>
	);
};

export default UserAddMovieModal;
