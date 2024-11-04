'use client';
import { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { FoodDrink } from './types';
import FoodDrinkTable from './components/TableFoodDrink';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import AddFoodDrinkModal from './components/AddFoodDrink';
import DeleteFoodDrinkModal from './components/DeleteFoodDrink';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';

const AdminFoodDrinkPage: FC = () => {
	const [foodDrinks, setFoodDrinks] = useState<FoodDrink[]>([]);
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

	const [foodDrinkToDelete, setFoodDrinkToDelete] = useState<FoodDrink | null>(null);
	const [foodDrinkToEdit, setFoodDrinkToEdit] = useState<FoodDrink | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	useEffect(() => {
		fetchFoodDrinks();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchFoodDrinks = async () => {
		try {
			const response = await axios.get('http://localhost:5000/food-drinks', {
				// Adjust the endpoint
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setIsLoading(true);
			setFoodDrinks(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching food drinks:', error);
		}
	};

	const handleAddFoodDrink = () => {
		fetchFoodDrinks();
	};

	const handleDeleteFoodDrink = () => {
		if (foodDrinkToDelete) {
			setFoodDrinks(foodDrinks.filter((foodDrink) => foodDrink.id !== foodDrinkToDelete.id));
			setFoodDrinkToDelete(null);
			onDeleteOpenChange();
			fetchFoodDrinks();
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchFoodDrinks();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchFoodDrinks();
		onDeleteOpenChange();
	};

	const handleOpenAddFoodDrink = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeader
				isOpen={isAddOpen}
				onChange={handleOpenAddFoodDrink}
				title='Quản lý thực phẩm và đồ uống'
				buttonText='Thêm thực phẩm và đồ uống'
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

					<FoodDrinkTable
						isLoading={isLoading}
						foodDrinks={foodDrinks}
						onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						setFoodDrinkToEdit={setFoodDrinkToEdit}
						setFoodDrinkToDelete={setFoodDrinkToDelete}
					/>
					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddFoodDrinkModal
						isOpen={isAddOpen}
						onAddFoodDrink={handleAddFoodDrink}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchFoodDrinks}
					/>

					<DeleteFoodDrinkModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						foodDrinkToDelete={foodDrinkToDelete}
						onDeleteFoodDrink={handleDeleteFoodDrink}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<>
					<AddFoodDrinkModal
						isOpen={isAddOpen}
						onAddFoodDrink={handleAddFoodDrink}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchFoodDrinks}
					/>
				</>
			)}
		</div>
	);
};

export default AdminFoodDrinkPage;
