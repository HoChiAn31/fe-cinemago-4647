'use client';
import { Button, Input, Spinner, useDisclosure } from '@nextui-org/react';
import { Room } from '../types'; // Import the Room type
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminRoomTable from '../components/RoomTable';
import { useTheme } from '@/app/context/ThemeContext';
import ManagementHeaderUpdate from '@/app/components/ManagementHeaderUpdate';
import AddRoom from '../components/AddRoom';
import DeleteRoomModal from '../components/DeleteRoom';
import PaginationControls from '@/app/components/PaginationControls';
import SearchAndFilter from '../components/SearchAndFilter';
import useDebounce from '@/app/hook/useDebounce';

const EditRoomPage = () => {
	const t = useTranslations('AdminRoomEdit');
	const { url } = useTheme();
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [lastPage, setLastPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [rooms, setRooms] = useState<Room[]>([]);
	const router = useRouter();
	const locale = useLocale();
	const [isLoading, setIsLoading] = useState(false);
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onOpenChange: onDeleteOpenChange,
	} = useDisclosure();
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

	useEffect(() => {
		fetchRooms();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchRooms = async () => {
		axios
			.get(`${url}/rooms/branch/${id}`, {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			})
			.then((res) => {
				setRooms(res.data.data);
				setIsLoading(true);
				// setTotalPages(response.data.total);
				setLastPage(res.data.lastPage);
				setNextPage(res.data.nextPage);
				setPrevPage(res.data.prevPage);
			})
			.catch((error) => {
				console.error('Error fetching rooms:', error);
			});
	};
	useEffect(() => {
		fetchRooms();
	}, [id]);

	const handleAddRoom = () => {
		fetchRooms();
	};
	const handleFinishAdding = () => {
		fetchRooms();
		setIsAddOpen(false);
	};

	const handleDeleteRoom = () => {
		if (roomToDelete) {
			setRooms(rooms.filter((room) => room.id !== roomToDelete.id));
			setRoomToDelete(null);
			onDeleteOpenChange();
			fetchRooms();
		}
	};
	const handleFinishDeleteting = () => {
		fetchRooms();
		onDeleteOpenChange();
	};
	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};
	return (
		<div className='p-4'>
			<ManagementHeaderUpdate
				isOpen={!isAddOpen}
				isBack
				title={isAddOpen ? '' : 'Danh sách phòng'}
				onChangeBack={isAddOpen ? () => setIsAddOpen(false) : () => router.back()}
				titleOpen='Thêm phòng'
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
					<AdminRoomTable
						rooms={rooms} // Adjust the prop name
						onDeleteOpen={onDeleteOpen}
						setRoomToDelete={setRoomToDelete} // Adjust the prop name
						isLoading={isLoading}
						idBranch={id}
					/>
					<DeleteRoomModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						roomToDelete={roomToDelete} // Adjust the prop name
						onDeleteRoom={handleDeleteRoom}
						onFinishDeleting={handleFinishDeleteting}
					/>
					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<>
					<AddRoom
						isOpen={isAddOpen}
						onAddRoom={handleAddRoom} // Adjust the prop name
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchRooms}
						idBranch={id}
					/>
				</>
			)}

			<Toaster />
		</div>
	);
};

export default EditRoomPage;
