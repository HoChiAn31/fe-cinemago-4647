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
		<>
			<div className='overflow-hidden rounded-md border border-gray1'>
				<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} `}>
					<thead className=''>
						<tr className='border-b border-gray1'>
							<th className='border-gray1 p-3'>{t('order')}</th>
							<th className='border-l border-gray1 p-3'>{t('name')}</th>
							<th className='border-l border-gray1 p-3'>{t('email')}</th>
							<th className='border-l border-gray1 p-3'>{t('role')}</th>
							<th className='border-l border-gray1 p-3'></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user.id} className='border-t border-gray1'>
								<td className='border-gray1 p-3 text-center'>{index + 1}</td>
								<td className='border-l border-gray1 p-3 text-center'>
									{user.firstName + user.lastName}
								</td>
								<td className='border-l border-gray1 p-3 text-center'>{user.email}</td>
								<td className='border-x border-gray1 p-3 text-center'>{user.role}</td>
								<td>
									<div className='flex items-center justify-center gap-2'>
										<div className='flex items-center justify-center'>
											<Button
												color='warning'
												onPress={() => {
													router.push(`/${locale}/admin/admin-user/${user.id}`);
												}}
												isIconOnly
												radius='sm'
												size='sm'
											>
												<Pencil className='text-white' height={20} width={20} />
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
												variant='bordered'
												className='border'
												size='sm'
											>
												<Trash2 height={20} width={20} />
											</Button>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UserTable;
