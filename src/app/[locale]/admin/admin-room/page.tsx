'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import { Branch } from '../admin-branch/types';
import { useTheme } from '@/app/context/ThemeContext';
import BranchTable from './components/BranchTable';
import ManagementHeaderUpdate from '@/app/components/ManagementHeader';

const AdminRoomPage: FC = () => {
	const { url } = useTheme();
	// const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [branches, setBranches] = useState<Branch[]>([]);
	const [isLoadingBranch, setIsLoadingBranches] = useState<boolean>(false);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	useEffect(() => {
		fetchBranches();
	}, []);
	useEffect(() => {
		fetchBranches();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchBranches = () => {
		axios
			.get(`${url}/branch`, {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			})
			.then((response) => {
				setBranches(response.data.data);
				setIsLoadingBranches(true);

				// 			// setTotalPages(response.data.total);
				setLastPage(response.data.lastPage);
				setNextPage(response.data.nextPage);
				setPrevPage(response.data.prevPage);
			})
			.catch((error) => {
				console.error('Error fetching branches:', error);
			});
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div>
			<ManagementHeaderUpdate title='Danh sách phòng' />

			<SearchAndFilter
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				itemsPerPage={itemsPerPage}
				setItemsPerPage={setItemsPerPage}
				setCurrentPage={setCurrentPage}
			/>
			<BranchTable branches={branches} isLoading={isLoadingBranch} />
			<PaginationControls
				currentPage={currentPage}
				lastPage={lastPage}
				prevPage={prevPage}
				nextPage={nextPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default AdminRoomPage;
