import { useTheme } from '@/app/context/ThemeContext';
import { selectItem } from '@/app/services/select';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import React from 'react';

interface SearchAndFilterProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedGenre?: string;
	setSelectedGenre?: React.Dispatch<React.SetStateAction<string>>;
	isSelectedRole?: boolean;
	selectedRole?: string; // Assuming you want to filter by user role
	setSelectedRole?: React.Dispatch<React.SetStateAction<string>>;
	itemsPerPage: number;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	searchQuery,
	setSearchQuery,
	// selectedGenre,
	// setSelectedGenre,
	isSelectedRole,
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
		if (setSelectedRole) {
			setSelectedRole(value);
		}
	};
	return (
		<div className='mb-6 rounded-lg'>
			<div className='flex items-center gap-4'>
				<div className='w-full'>
					<Input
						startContent={<Search height={14} width={14} />}
						placeholder={t('searchPlaceholder')}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='text-lg focus:outline-none'
						variant='flat'
						radius='sm'
					/>
				</div>
				<div className='flex w-full flex-col items-center justify-between'>
					<div className='w-full'>
						<Select
							placeholder={t('itemsPerPageLabel')}
							value={itemsPerPage.toString()}
							onChange={(e) => handleItemsPerPageChange(e.target.value)}
							className='text-lg'
							variant='flat'
							radius='sm'
							// Increased height and font size
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

				{/* ===== */}
				<>
					{isSelectedRole && (
						<div className='w-full'>
							<Select
								placeholder={t('roleLabel')}
								value={selectedRole}
								onChange={(e) => handleSelectRole(e.target.value)}
								className='text-lg'
								variant='bordered'
							>
								<SelectItem
									key=''
									value=''
									className={`${isDarkMode ? 'text-white' : 'text-black'}`}
								>
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
								<SelectItem
									key='staff'
									value='staff'
									className={`${isDarkMode ? 'text-white' : 'text-black'}`}
								>
									Staff
								</SelectItem>
							</Select>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default SearchAndFilter;
