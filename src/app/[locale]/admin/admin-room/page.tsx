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

const AdminRoomPage: FC = () => {
	const [rooms, setRooms] = useState<Room[]>([]);
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

	const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
	const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	useEffect(() => {
		fetchRooms();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchRooms = async () => {
		try {
			const response = await axios.get('http://localhost:5000/rooms', {
				// Adjust the endpoint
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setRooms(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching rooms:', error);
		}
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

	const handleEditRoom = () => {
		setRoomToEdit(null);
		onEditOpenChange();
		fetchRooms();
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
			<ManagementHeader
				isOpen={isAddOpen}
				onChange={handleOpenAddRoom}
				title='Quản lý phòng' // Adjust the title
				buttonText='Thêm phòng' // Adjust the button text
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
					<RoomTable
						rooms={rooms} // Adjust the prop name
						onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						setRoomToEdit={setRoomToEdit} // Adjust the prop name
						setRoomToDelete={setRoomToDelete} // Adjust the prop name
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddRoomModal
						isOpen={isAddOpen}
						onAddRoom={handleAddRoom} // Adjust the prop name
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchRooms}
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
				<>
					<AddRoomModal
						isOpen={isAddOpen}
						onAddRoom={handleAddRoom} // Adjust the prop name
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchRooms}
					/>
				</>
			)}
		</div>
	);
};

export default AdminRoomPage;
