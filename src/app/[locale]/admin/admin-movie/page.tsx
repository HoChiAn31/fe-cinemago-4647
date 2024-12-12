'use client';
import { FC, useEffect, useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { Movie } from './types';
import MovieTable from './components/MovieTable';
// import SearchAndFilter from './components/SearchAndFilter';
import AddMovieModal from './components/AddMovie';
import DeleteMovieModal from './components/DeleteMovieModal';
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import SearchAndFilter from '@/app/components/SearchAndFilter';

const AdminMoviePage: FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedGenre, setSelectedGenre] = useState<string>('');
	const [lastPage, setLastPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
	// const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
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

	const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
	const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
	const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set());
	const debouncedSearchQuery = useDebounce(searchQuery, 200);
	useEffect(() => {
		fetchMovies();
	}, [currentPage, debouncedSearchQuery, selectedGenre, itemsPerPage]);

	const fetchMovies = async () => {
		try {
			const response = await axios.get('http://localhost:5000/movies', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
					genre: selectedGenre === 'all' ? '' : selectedGenre,
				},
			});
			setMovies(response.data.data);
			setTotalPages(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
			setIsLoading(true);
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	};

	const handleAddMovie = () => {
		// onAddOpenChange();
		fetchMovies();
	};

	const handleDeleteMovie = () => {
		if (movieToDelete) {
			setMovies(movies.filter((movie) => movie.id !== movieToDelete.id));
			setMovieToDelete(null);
			onDeleteOpenChange();
			fetchMovies();
		}
	};

	const handleEditMovie = () => {
		setMovieToEdit(null);
		onEditOpenChange();
		fetchMovies();
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchMovies();
		// onAddOpenChange();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchMovies();
		onDeleteOpenChange();
	};

	return (
		<div>
			<ManagementHeader
				isOpen={!isAddOpen}
				title={isAddOpen ? '' : 'Quản lý phim'}
				titleOpen='Thêm phim'
				onChange={() => setIsAddOpen(true)}
			/>
			{!isAddOpen ? (
				<>
					<SearchAndFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						selectedGenre={selectedGenre}
						setSelectedGenre={setSelectedGenre}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setCurrentPage={setCurrentPage}
					/>
					<MovieTable
						movies={movies}
						selectedMovies={selectedMovies}
						setSelectedMovies={setSelectedMovies}
						onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						setMovieToEdit={setMovieToEdit}
						setMovieToDelete={setMovieToDelete}
						isLoading={isLoading}
					/>

					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddMovieModal
						isOpen={isAddOpen}
						// onOpenChange={onAddOpenChange}
						onAddMovie={handleAddMovie}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchMovies}
					/>

					<DeleteMovieModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						movieToDelete={movieToDelete}
						onDeleteMovie={handleDeleteMovie}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<>
					<AddMovieModal
						isOpen={isAddOpen}
						// onOpenChange={onAddOpenChange}
						onAddMovie={handleAddMovie}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchMovies}
					/>
				</>
			)}
		</div>
	);
};

export default AdminMoviePage;
