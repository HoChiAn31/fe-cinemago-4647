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

	const handleItemsPerPageChange = (value: number) => {
		setItemsPerPage(value);
		setCurrentPage(1); // Reset to first page on items per page change
	};

	return (
		<div>
			<Input
				placeholder='Search...'
				value={searchQuery}
				onChange={handleSearchChange}
				radius='sm'
			/>
			<Select
				value={itemsPerPage.toString()}
				onChange={(value) => handleItemsPerPageChange(Number(value))}
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
