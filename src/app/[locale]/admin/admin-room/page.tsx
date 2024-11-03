'use client';
import { FC, useEffect, useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { Room } from './types'; // Adjust the import based on your types
import RoomTable from './components/RoomTable'; // Create this component
import SearchAndFilter from './components/SearchAndFilter';
import AddRoomModal from './components/AddRoom'; // Create this component
import DeleteRoomModal from './components/DeleteRoom'; // Create this component
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { Branch } from '../admin-branch/types';
import { useTheme } from '@/app/context/ThemeContext';
import BranchTable from './components/BranchTable';
import ManagementHeaderUpdate from '@/app/components/ManagementHeaderUpdate';

const AdminRoomPage: FC = () => {
	const { url } = useTheme();
	const [rooms, setRooms] = useState<Room[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
	const [branches, setBranches] = useState<Branch[]>([]);
	const [isLoadingBranch, setIsLoadingBranches] = useState<boolean>(false);
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onOpenChange: onDeleteOpenChange,
	} = useDisclosure();

	const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	useEffect(() => {
		fetchBranches();
	}, []);
	useEffect(() => {
		fetchRooms();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchBranches = () => {
		axios
			.get(`${url}/branch`)
			.then((response) => {
				setBranches(response.data.data);
				setIsLoadingBranches(true);
			})
			.catch((error) => {
				console.error('Error fetching branches:', error);
			});
	};
	const fetchRooms = () => {
		axios
			.get(`${url}/rooms`, {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			})
			.then((response) => {
				setRooms(response.data.data);
				setTotalPages(response.data.total);
				setLastPage(response.data.lastPage);
				setNextPage(response.data.nextPage);
				setPrevPage(response.data.prevPage);
			})
			.catch((error) => {
				console.error('Error fetching rooms:', error);
			});
	};

	const handleAddRoom = () => {
		fetchRooms();
	};

	const handleDeleteRoom = () => {
		if (roomToDelete) {
			setRooms(rooms.filter((room) => room.id !== roomToDelete.id));
			setRoomToDelete(null);
			onDeleteOpenChange();
			fetchRooms();
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchRooms();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchRooms();
		onDeleteOpenChange();
	};

	const handleOpenAddRoom = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeaderUpdate title='Danh sách rạp' />
			{!isAddOpen ? (
				<>
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

					<DeleteRoomModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						roomToDelete={roomToDelete} // Adjust the prop name
						onDeleteRoom={handleDeleteRoom} // Adjust the prop name
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default AdminRoomPage;
