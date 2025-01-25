import React, { FC } from 'react';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../context/ThemeContext';

interface PaginationControlsProps {
	currentPage: number;
	lastPage: number;
	prevPage: number | null;
	nextPage: number | null;
	totalPages?: number | null;

	onPageChange: (newPage: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
	currentPage,
	lastPage,
	prevPage,
	nextPage,
	// totalPages,
	onPageChange,
}) => {
	const t = useTranslations('ComponentPaginationControls');
	const { isDarkMode } = useTheme();
	return (
		<div className='py-4 text-center'>
			<div className=''>
				<Button
					className={`shadow-md ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
					disabled={prevPage === null}
					onPress={() => onPageChange(prevPage || currentPage)}
				>
					{t('previous')}
				</Button>
				<span className='mx-2'>{t('page', { currentPage, lastPage })}</span>
				<Button
					className={`shadow-md ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
					disabled={nextPage === null}
					onPress={() => onPageChange(nextPage || currentPage)}
				>
					{t('next')}
				</Button>
			</div>
		</div>
	);
};

export default PaginationControls;
