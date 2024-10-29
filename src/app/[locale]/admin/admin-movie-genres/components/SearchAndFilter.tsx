import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { selectItem } from '@/app/services/select';
import { useTheme } from '@/app/context/ThemeContext';

interface SearchAndFilterProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	itemsPerPage: number;
	setItemsPerPage: (items: number) => void;
	setCurrentPage: (page: number) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	searchQuery,
	setSearchQuery,
	itemsPerPage,
	setItemsPerPage,
	setCurrentPage,
}) => {
	const { isDarkMode } = useTheme();

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1); // Reset to first page on search
	};

	const handleItemsPerPageChange = (value: string) => {
		setItemsPerPage(Number(value));
		setCurrentPage(1); // Reset to first page on items per page change
	};

	return (
		<div className='mb-4 flex gap-4'>
			<Input
				placeholder='Tìm kiếm thể loại phim...'
				value={searchQuery}
				onChange={handleSearchChange}
				className='flex-grow'
				radius='sm'
			/>
			<Select
				label='Số lượng hiển thị'
				value={itemsPerPage.toString()}
				onChange={(e) => handleItemsPerPageChange(e.target.value)}
				className='w-48'
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
	);
};

export default SearchAndFilter;
