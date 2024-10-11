'use client';
import { FC, useEffect, useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import axios from '@/app/utils/axios';
import { User } from './types'; // Assuming you have a User type defined
import UserTable from './components/UserTable'; // Create this component
import SearchAndFilter from './components/SearchAndFilter'; // Reuse if applicable
import AddUserModal from './components/AddUser'; // Create this component
// import EditUserModal from './components/'; // Create this component
import DeleteUserModal from './components/DeleteUserModal'; // Create this component
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';

const AdminUserPage: FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [userFilterRole, setUserFilterRole] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);

	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
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

	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [userToEdit, setUserToEdit] = useState<User | null>(null);
	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	useEffect(() => {
		console.log('debouncedSearchQuery');
		fetchUsers();
	}, [currentPage, debouncedSearchQuery, itemsPerPage]);

	useEffect(() => {
		if (selectedRole) {
			const filter = users.filter((user) => user.role === selectedRole);
			setUserFilterRole(filter);
		}
	}, [selectedRole]);
	console.log(selectedRole);
	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:5000/users', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			setUsers(response.data.data);
			setLastPage(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching users:', (error as Error).message);
			if ((error as Error).message === 'Request failed with status code 401') {
				console.log('leu leu');
			}
		}
	};
	useEffect(() => {
		if (users) {
			const filter = users.filter((user) => user.role === '');
			console.log(filter);
		}
	}, [users]);
	const handleAddUser = () => {
		fetchUsers();
	};

	const handleDeleteUser = () => {
		if (userToDelete) {
			setUsers(users.filter((user) => user.id !== userToDelete.id));
			setUserToDelete(null);
			onDeleteOpenChange();
			fetchUsers();
		}
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= lastPage) {
			setCurrentPage(newPage);
		}
	};

	const handleFinishAdding = () => {
		fetchUsers();
		setIsAddOpen(false);
	};

	const handleFinishDeleting = () => {
		fetchUsers();
		onDeleteOpenChange();
	};

	const handleOpenAddUser = () => {
		setIsAddOpen(!isAddOpen);
	};

	return (
		<div>
			<ManagementHeader
				isAddOpen={isAddOpen}
				onChangeAdd={handleOpenAddUser}
				title='Quản lý người dùng'
				buttonText='Thêm người dùng'
			/>
			{!isAddOpen ? (
				<>
					<SearchAndFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						selectedRole={selectedRole}
						setSelectedRole={setSelectedRole}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setCurrentPage={setCurrentPage}
					/>
					<UserTable
						users={selectedRole ? userFilterRole : users}
						onEditOpen={onEditOpen}
						onDeleteOpen={onDeleteOpen}
						// setUserToEdit={setUserToEdit}
						setUserToDelete={setUserToDelete}
					/>
					<PaginationControls
						currentPage={currentPage}
						lastPage={lastPage}
						prevPage={prevPage}
						nextPage={nextPage}
						onPageChange={handlePageChange}
					/>
					<AddUserModal
						isOpen={isAddOpen}
						onAddUser={handleAddUser}
						onFinishAdding={handleFinishAdding}
						onReloadData={fetchUsers}
					/>
					<DeleteUserModal
						isOpen={isDeleteOpen}
						onOpenChange={onDeleteOpenChange}
						userToDelete={userToDelete}
						onDeleteUser={handleDeleteUser}
						onFinishDeleting={handleFinishDeleting}
					/>
				</>
			) : (
				<AddUserModal
					isOpen={isAddOpen}
					onAddUser={handleAddUser}
					onFinishAdding={handleFinishAdding}
					onReloadData={fetchUsers}
				/>
			)}
		</div>
	);
};

export default AdminUserPage;
