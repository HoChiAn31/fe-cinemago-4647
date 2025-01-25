'use client';
import React, { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { Voucher } from './types'; // Import Voucher type
import VoucherTable from './components/TableVoucher'; // Create VoucherTable component
import SearchAndFilter from '@/app/components/SearchAndFilter';
import AddVoucherModal from './components/AddVoucher'; // Create AddVoucherModal component
import DeleteVoucherModal from './components/DeleteVoucher'; // Create DeleteVoucherModal component
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';

const AdminVoucherPage: FC = () => {
	const [vouchers, setVouchers] = useState<Voucher[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
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

	const [voucherToDelete, setVoucherToDelete] = useState<Voucher | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	useEffect(() => {
		fetchVouchers();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchVouchers = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/promotions`, {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			console.log(response.data.data);
			setIsLoading(true);
			setVouchers(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching vouchers:', error);
		}
	};

	const handleAddVoucher = () => {
		fetchVouchers();
	};

	const handleDeleteVoucher = () => {
		if (voucherToDelete) {
			setVouchers(vouchers.filter((voucher) => voucher.id !== voucherToDelete.id));
			setVoucherToDelete(null);
			onDeleteOpenChange();
			fetchVouchers();
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchVouchers();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchVouchers();
		onDeleteOpenChange();
	};

	const handleOpenAddVoucher = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeader
				isBack
				isOpen={!isAddOpen}
				onChange={handleOpenAddVoucher}
				// title='Quản lý Voucher'
				buttonText='Thêm Voucher'
				titleOpen='Thêm Voucher'
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

					<VoucherTable
						isLoading={isLoading}
						vouchers={vouchers}
						onDeleteOpen={onDeleteOpen}
						setVoucherToDelete={setVoucherToDelete}
					/>
					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddVoucherModal
						isOpen={isAddOpen}
						onAddVoucher={handleAddVoucher}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchVouchers}
					/>

					<DeleteVoucherModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						voucherToDelete={voucherToDelete}
						onDeleteVoucher={handleDeleteVoucher}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<AddVoucherModal
					isOpen={isAddOpen}
					onAddVoucher={handleAddVoucher}
					onFinishAdding={handleFinishAdding}
					onReloadData={fetchVouchers}
				/>
			)}
		</div>
	);
};

export default AdminVoucherPage;
