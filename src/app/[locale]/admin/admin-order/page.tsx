'use client';
import Loading from '@/app/components/Loading';
import { Order } from '@/app/types/Order';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import OrderTable from './components/TableOrder';
import ManagementHeader from '@/app/components/ManagementHeader';
import PaginationControls from '@/app/components/PaginationControls';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import useDebounce from '@/app/hook/useDebounce';
import EditOrderModal from './components/EditOrderModal';

const adminOderPage: FC = () => {
	const [dataOrder, setDataOrder] = useState<Order[]>([]);
	const [isLoading, setIsLoaing] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [lastPage, setLastPage] = useState<number>(1);
	const debouncedSearchQuery = useDebounce(searchQuery, 100);

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = (order: Order) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	// const handleSave = (updatedOrder: Order) => {
	// 	onEdit(updatedOrder);
	// 	console.log('Updated Order:', updatedOrder);
	// };
	const handleSave = async (updatedOrder: Order) => {
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API}/bookings/${updatedOrder.id}`,
				{ paymentStatus: updatedOrder.payment.paymentStatus },
			);
			console.log('Order updated:', response.data);
			fetchOrder(); // Refresh orders
		} catch (error) {
			console.error('Failed to update order:', error);
		}
	};
	useEffect(() => {
		fetchOrder();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);
	const fetchOrder = async () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/bookings`, {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			})
			.then((response) => {
				setDataOrder(response.data.data);
				setIsLoaing(true);
				// setTotalPages(response.data.total);

				setLastPage(response.data.lastPage);
				setNextPage(response.data.nextPage);
				setPrevPage(response.data.prevPage);
			})
			.catch((error) => console.error(error));
	};
	useEffect(() => {}, []);

	if (!isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	const handleEdit = () => {
		console.log('handleEdit');
	};
	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	return (
		<>
			<div className='bg-gray-100 min-h-screen p-4'>
				<ManagementHeader title={'Quản lý đơn hàng'} />
				<div className='rounded-lg p-6 shadow-md'>
					<SearchAndFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setCurrentPage={setCurrentPage}
					/>
					<OrderTable orders={dataOrder} isLoading={isLoading} onEdit={handleEditClick} />
					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
			<EditOrderModal
				order={selectedOrder}
				isVisible={isModalOpen}
				onClose={handleModalClose}
				onSave={handleSave}
			/>
		</>
	);
};

export default adminOderPage;
