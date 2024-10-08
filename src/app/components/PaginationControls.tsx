import { FC } from 'react';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

interface PaginationControlsProps {
	currentPage: number;
	lastPage: number;
	prevPage: number | null;
	nextPage: number | null;
	onPageChange: (newPage: number) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
	currentPage,
	lastPage,
	prevPage,
	nextPage,
	onPageChange,
}) => {
	const t = useTranslations('ComponentPaginationControls');
	return (
		<div className='py-4 text-center'>
			<div className=''>
				<Button disabled={prevPage === null} onPress={() => onPageChange(prevPage || currentPage)}>
					{t('previous')}
				</Button>
				<span className='mx-2'>{t('page', { currentPage, lastPage })}</span>
				<Button disabled={nextPage === null} onPress={() => onPageChange(nextPage || currentPage)}>
					{t('next')}
				</Button>
			</div>
		</div>
	);
};

export default PaginationControls;
