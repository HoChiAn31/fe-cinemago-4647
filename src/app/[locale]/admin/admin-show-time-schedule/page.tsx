'use client';
import React, { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { ShowTime } from './types';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { useRouter } from 'next/navigation';
import AddShowTimeSchedule from './components/AddShowTimeSchedule';
import DeleteShowTimeScheduleModal from './components/DeleteShowTimeScheduleModal';
import TableShowTimeSchedule from './components/TableShowTimeSchedule';

const AdminShowTimeSchedulesPage: FC = () => {
	const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// const [totalPages, setTotalPages] = useState<number>(1);
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

	// const [showTimeEdit, setShowTimeEdit] = useState<ShowTime | null>(null);

	const [showTimeToDelete, setShowTimeToDelete] = useState<ShowTime | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);
	const router = useRouter();

	useEffect(() => {
		fetchShowTimes();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchShowTimes = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get('http://localhost:5000/show-time-schedules', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setShowTimes(response.data.data);
			// setTotalPages(response.data.total);
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
				title={isAddOpen ? '' : 'Quản lý lịch chiếu'}
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

					<TableShowTimeSchedule
						isLoading={isLoading}
						showTimes={showTimes}
						onDeleteOpen={onDeleteOpen}
						setShowTimeToDelete={setShowTimeToDelete}
						// onEditOpen={onEditOpen}
						// setShowTimeToEdit={setShowTimeEdit}
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>

					<AddShowTimeSchedule
						isOpen={isAddOpen}
						onAddShowTime={handleAddShowTime}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchShowTimes}
					/>

					<DeleteShowTimeScheduleModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						showTimeToDelete={showTimeToDelete}
						onDeleteShowTime={handleDeleteShowTime}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<AddShowTimeSchedule
					isOpen={isAddOpen}
					onAddShowTime={handleAddShowTime}
					onFinishAdding={handleFinishAdding}
					onReloadData={fetchShowTimes}
				/>
			)}
		</div>
	);
};

export default AdminShowTimeSchedulesPage;
