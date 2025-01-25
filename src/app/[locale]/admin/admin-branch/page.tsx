'use client';
import React, { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { Branch } from './types';
import BranchTable from './components/BranchTable';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import AddBranchModal from './components/AddBranch';
import DeleteBranchModal from './components/DeleteBranch';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const AdminBranchPage: FC = () => {
	const [branches, setBranches] = useState<Branch[]>([]);
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
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onOpenChange: onEditOpenChange,
	} = useDisclosure();

	const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
	const [branchToEdit, setBranchToEdit] = useState<Branch | null>(null);
	const t = useTranslations('AdminBranch');
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	const router = useRouter();
	useEffect(() => {
		fetchBranches();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchBranches = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/branch`, {
				// Adjust the endpoint
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setIsLoading(true);
			setBranches(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching branches:', error);
		}
	};
	console.log(branches);
	const handleAddBranch = () => {
		fetchBranches();
	};

	const handleDeleteBranch = () => {
		if (branchToDelete) {
			setBranches(branches.filter((branch) => branch.id !== branchToDelete.id));
			setBranchToDelete(null);
			onDeleteOpenChange();
			fetchBranches();
		}
	};

	const handleEditBranch = () => {
		setBranchToEdit(null);
		onEditOpenChange();
		fetchBranches();
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchBranches();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchBranches();
		onDeleteOpenChange();
	};

	const handleOpenAddBranch = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeader
				isOpen={!isAddOpen}
				isBack={isAddOpen}
				title={isAddOpen ? '' : `${t('managementTitle')}`}
				onChangeBack={isAddOpen ? () => setIsAddOpen(false) : () => router.back()}
				titleOpen={`${t('addCinema')}`}
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
					<BranchTable
						isLoading={isLoading}
						branches={branches} // Adjust the prop name
						onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						setBranchToEdit={setBranchToEdit} // Adjust the prop name
						setBranchToDelete={setBranchToDelete} // Adjust the prop name
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddBranchModal
						isOpen={isAddOpen}
						onAddBranch={handleAddBranch} // Adjust the prop name
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchBranches}
					/>

					<DeleteBranchModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						branchToDelete={branchToDelete} // Adjust the prop name
						onDeleteBranch={handleDeleteBranch} // Adjust the prop name
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<>
					<AddBranchModal
						isOpen={isAddOpen}
						onAddBranch={handleAddBranch} // Adjust the prop name
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchBranches}
					/>
				</>
			)}
		</div>
	);
};

export default AdminBranchPage;
