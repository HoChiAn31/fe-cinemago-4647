import React from 'react';
import { User } from '../types'; // Assuming you have a User type defined
import { Button } from '@nextui-org/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import { Pencil, Trash2 } from 'lucide-react';

interface UserTableProps {
	users: User[];
	selectedUsers?: Set<string>;
	setSelectedUsers?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen?: () => void;
	onDeleteOpen: () => void;
	// setUserToEdit: React.Dispatch<React.SetStateAction<User | null>>;
	setUserToDelete: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserTable: React.FC<UserTableProps> = ({
	users,
	selectedUsers,
	setSelectedUsers,
	onEditOpen,
	onDeleteOpen,
	// setUserToEdit,
	setUserToDelete,
}) => {
	const t = useTranslations('AdminTable');
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='bg-darkGreen overflow-hidden rounded-md border-x border-t border-gray'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray'>
						<th className='border-r border-gray p-3'>{t('order')}</th>
						{/* <th className='border-r border-gray p-3'>{t('id')}</th> */}
						<th className='border-r border-gray p-3'>{t('name')}</th>
						<th className='border-r border-gray p-3'>{t('email')}</th>
						<th className='border-r border-gray p-3'>{t('role')}</th>
						<th className='p-3'>{t('actions')}</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.id} className='border-b border-gray'>
							<td className='border-r border-gray p-3 text-center'>{index + 1}</td>
							{/* Display order number */}
							{/* <td className='border-r border-gray p-3 text-center'>{user.id}</td> */}
							<td className='border-r border-gray p-3 text-center'>
								{user.firstName + user.lastName}
							</td>
							<td className='border-r border-gray p-3 text-center'>{user.email}</td>
							<td className='border-r border-gray p-3 text-center'>{user.role}</td>
							<td className='grid grid-cols-2 gap-2 p-3'>
								<div className='flex items-center justify-center'>
									<Button
										color='warning'
										onPress={() => {
											router.push(`/${locale}/admin/admin-user/${user.id}`);
										}}
										isIconOnly
										radius='sm'
									>
										<Pencil className='text-white' />
									</Button>
								</div>
								<div className='flex items-center justify-center'>
									<Button
										color='danger'
										onPress={() => {
											setUserToDelete(user);
											onDeleteOpen();
										}}
										isIconOnly
										radius='sm'
									>
										<Trash2 />
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
