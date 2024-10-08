import { selectItem } from '@/app/services/select';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import React from 'react';

interface SearchAndFilterProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedGenre: string;
	setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
	itemsPerPage: number;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	searchQuery,
	setSearchQuery,
	selectedGenre,
	setSelectedGenre,
	itemsPerPage,
	setItemsPerPage,
	setCurrentPage,
}) => {
	const t = useTranslations('AdminSearchAndFilter');
	const handleItemsPerPageChange = (value: string) => {
		setItemsPerPage(Number(value));
		setCurrentPage(1);
	};

	return (
		<div className='mb-6 rounded-lg bg-white p-4'>
			<div className='flex items-center gap-4'>
				<div className='w-full'>
					<Input
						label={t('searchPlaceholder')}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='h-14 text-lg'
						variant='bordered'
					/>
				</div>
				<div className='flex w-full flex-col items-center justify-between'>
					<div className='w-full'>
						<Select
							label={t('itemsPerPageLabel')}
							value={itemsPerPage.toString()}
							onChange={(e) => handleItemsPerPageChange(e.target.value)}
							className='h-14 text-lg text-red-500'
							variant='bordered'
							// Increased height and font size
						>
							{selectItem.map((item) => (
								<SelectItem key={item.key} value={item.key} className='text-black'>
									{item.value}
								</SelectItem>
							))}
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchAndFilter;
