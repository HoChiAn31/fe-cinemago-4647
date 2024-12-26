'use client';
import { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { ShowTime } from './types';
import TableShowTime from './components/TableShowTime';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import AddShowTime from './components/AddShowTime';
import DeleteShowTimeModal from './components/DeleteShowTimeModal';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { useRouter } from 'next/navigation';

const AdminShowTimesPage: FC = () => {
	const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [lastPage, setLastPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onOpenChange: onDeleteOpenChange,
	} = useDisclosure();

	const [showTimeToDelete, setShowTimeToDelete] = useState<ShowTime | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);
	const router = useRouter();

	useEffect(() => {
		fetchShowTimes();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchShowTimes = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get('http://localhost:5000/show-times', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setShowTimes(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching showtimes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddShowTime = () => {
		fetchShowTimes();
	};

	const handleDeleteShowTime = () => {
		if (showTimeToDelete) {
			setShowTimes(showTimes.filter((showTime) => showTime.id !== showTimeToDelete.id));
			setShowTimeToDelete(null);
			onDeleteOpenChange();
			fetchShowTimes();
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchShowTimes();
		setIsAddOpen(false);
	};
	const handleFinishDeleting = () => {
		fetchShowTimes();
		onDeleteOpenChange();
	};
	return (
		<div>
			<ManagementHeader
				isOpen={!isAddOpen}
				isBack={isAddOpen}
				title={isAddOpen ? '' : 'Quản lý suất chiếu'}
				onChangeBack={isAddOpen ? () => setIsAddOpen(false) : () => router.back()}
				titleOpen='Thêm suất chiếu'
				onChange={() => setIsAddOpen(true)}
			/>
			{!isAddOpen ? (
				<>
					<SearchAndFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setCurrentPage={setCurrentPage}
					/>

					<TableShowTime
						isLoading={isLoading}
						showTimes={showTimes}
						onDeleteOpen={onDeleteOpen}
						setShowTimeToDelete={setShowTimeToDelete}
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>

					<AddShowTime
						isOpen={isAddOpen}
						onAddShowTime={handleAddShowTime}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchShowTimes}
					/>

					<DeleteShowTimeModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						showTimeToDelete={showTimeToDelete}
						onDeleteShowTime={handleDeleteShowTime}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<AddShowTime
					isOpen={isAddOpen}
					onAddShowTime={handleAddShowTime}
					onFinishAdding={handleFinishAdding}
					onReloadData={fetchShowTimes}
				/>
			)}
		</div>
	);
};

export default AdminShowTimesPage;
