import { useTheme } from '@/app/context/ThemeContext';
import { selectItem } from '@/app/services/select'; // Assuming this is the same service for user filtering
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface UserSearchAndFilterProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedRole: string; // Assuming you want to filter by user role
	setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
	itemsPerPage: number;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const UserSearchAndFilter: React.FC<UserSearchAndFilterProps> = ({
	searchQuery,
	setSearchQuery,
	selectedRole,
	setSelectedRole,
	itemsPerPage,
	setItemsPerPage,
	setCurrentPage,
}) => {
	const t = useTranslations('AdminSearchAndFilter');
	const { isDarkMode } = useTheme();
	const handleItemsPerPageChange = (value: string) => {
		setItemsPerPage(Number(value));
		setCurrentPage(1);
	};
	const handleSelectRole = (value: string) => {
		// if (setSelectedRole) {
		// 	// Check if setSelectedRole is defined
		// }
		setSelectedRole(String(value));
	};
	return (
		<div className='mb-6 rounded-lg p-4'>
			<div className='flex items-center gap-4'>
				<div className='w-full'>
					<Input
						label={t('searchPlaceholder')}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='h-14 text-lg focus:outline-none'
						variant='bordered'
						radius='sm'
					/>
				</div>
				<div className='flex w-full flex-col items-center justify-between'>
					<div className='w-full'>
						<Select
							label={t('itemsPerPageLabel')}
							value={itemsPerPage.toString()}
							onChange={(e) => handleItemsPerPageChange(e.target.value)}
							className='h-14 text-lg'
							variant='bordered'
							radius='sm'
						>
							{selectItem.map((item) => (
								<SelectItem
									key={item.key}
									value={item.key}
									className={`${isDarkMode ? 'text-white' : 'text-black'}`}
								>
									{item.value}
								</SelectItem>
							))}
						</Select>
					</div>
				</div>
				<div className='w-full'>
					<Select
						label={t('roleLabel')}
						value={selectedRole}
						onChange={(e) => handleSelectRole(e.target.value)}
						className='h-14 text-lg text-red-500'
						variant='bordered'
					>
						<SelectItem key='' value='' className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
							Tất cả
						</SelectItem>
						<SelectItem
							key='admin'
							value='admin'
							className={`${isDarkMode ? 'text-white' : 'text-black'}`}
						>
							Admin
						</SelectItem>
						<SelectItem
							key='user'
							value='user'
							className={`${isDarkMode ? 'text-white' : 'text-black'}`}
						>
							User
						</SelectItem>
						{/* <SelectItem key='guest' value='guest' className='text-black'>
								Guest
							</SelectItem> */}
					</Select>
				</div>
			</div>
		</div>
	);
};

export default UserSearchAndFilter;
