'use client';
import React, { FC, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import axios from 'axios';

import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { MovieGenre } from './types';
import AddMovieGenresModal from './components/AddMovieGenres';
import SearchAndFilter from '@/app/components/SearchAndFilter';
import MovieGenreTable from './components/MovieGenreTable';
import DeleteMovieGenreModal from './components/DeleteMovieGenres';
import { useRouter } from 'next/navigation';

const AdminMovieGenrePage: FC = () => {
	const [movieGenres, setMovieGenres] = useState<MovieGenre[]>([]);
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
	// const {
	// 	isOpen: isEditOpen,
	// 	onOpen: onEditOpen,
	// 	onOpenChange: onEditOpenChange,
	// } = useDisclosure();

	const [genreToDelete, setGenreToDelete] = useState<MovieGenre | null>(null);
	const [genreToEdit, setGenreToEdit] = useState<MovieGenre | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 700);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	useEffect(() => {
		fetchMovieGenres();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	const fetchMovieGenres = async () => {
		try {
			const response = await axios.get('http://localhost:5000/movie-genres', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setIsLoading(true);
			setMovieGenres(response.data.data);
			// setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching movie genres:', error);
		}
	};

	const handleAddMovieGenre: any = () => {
		fetchMovieGenres();
	};

	const handleDeleteMovieGenre = () => {
		if (genreToDelete) {
			setMovieGenres(movieGenres.filter((genre) => genre.id !== genreToDelete.id));
			setGenreToDelete(null);
			onDeleteOpenChange();
			fetchMovieGenres();
		}
	};

	// const handleEditMovieGenre = () => {
	// 	setGenreToEdit(null);
	// 	onEditOpenChange();
	// 	fetchMovieGenres();
	// };

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchMovieGenres();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchMovieGenres();
		onDeleteOpenChange();
	};

	const handleOpenAddMovieGenre = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeader
				isOpen={!isAddOpen}
				isBack={isAddOpen}
				title={isAddOpen ? '' : 'Quản lý thể loại phim'}
				onChangeBack={isAddOpen ? () => setIsAddOpen(false) : () => router.back()}
				titleOpen='Thêm thể loại phim'
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
					<MovieGenreTable
						movieGenres={movieGenres}
						// onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						setGenreToEdit={setGenreToEdit}
						setGenreToDelete={setGenreToDelete}
						isLoading={isLoading}
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddMovieGenresModal
						isOpen={isAddOpen}
						onAddMovieGenre={handleAddMovieGenre}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchMovieGenres}
					/>

					<DeleteMovieGenreModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						movieGenreToDelete={genreToDelete}
						onDeleteMovieGenre={handleDeleteMovieGenre}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<>
					<AddMovieGenresModal
						isOpen={isAddOpen}
						onAddMovieGenre={handleAddMovieGenre}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchMovieGenres}
					/>
				</>
			)}
		</div>
	);
};

export default AdminMovieGenrePage;
