'use client';
import { FC, useEffect, useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import axios from '@/app/utils/axios';
import { User } from './types'; // Assuming you have a User type defined
import UserTable from './components/UserTable'; // Create this component
import SearchAndFilter from '@/app/components/SearchAndFilter';
import AddUserModal from './components/AddUser'; // Create this component
// import EditUserModal from './components/'; // Create this component
import DeleteUserModal from './components/DeleteUserModal'; // Create this component
import useDebounce from '@/app/hook/useDebounce';
import PaginationControls from '@/app/components/PaginationControls';
import ManagementHeader from '@/app/components/ManagementHeader';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import toast, { Toaster } from 'react-hot-toast';

const AdminUserPage: FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [userFilterRole, setUserFilterRole] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(5);
	const router = useRouter();
	const locale = useLocale();
	const [nextPage, setNextPage] = useState<number | null>(null);
	const [prevPage, setPrevPage] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
	const [errorHandled, setErrorHandled] = useState<boolean>(false); // New flag
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onOpenChange: onDeleteOpenChange,
	} = useDisclosure();

	const [userToDelete, setUserToDelete] = useState<User | null>(null);
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

	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:5000/users', {
				params: {
					page: currentPage.toString(),
					items_per_page: itemsPerPage.toString(),
					search: searchQuery,
				},
			});
			console.log(response);
			setUsers(response.data.data);
			setLastPage(response.data.total);
			setLastPage(response.data.lastPage);
			setNextPage(response.data.nextPage);
			setPrevPage(response.data.prevPage);
		} catch (error) {
			console.error('Error fetching users:', (error as Error).message);

			if ((error as Error).message === 'Request failed with status code 401') {
				// console.log('leu leu');
			}
			if ((error as Error).message === 'Request failed with status code 403' && !errorHandled) {
				// Ensure this block runs only once
				setErrorHandled(true);
				toast.error('You do not have permission to access this resource.', {
					duration: 3000,
				});
				setTimeout(() => {
					router.push(`/${locale}/admin`);
					setErrorHandled(false); // Reset the flag after navigation
				}, 3000);
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
				isOpen={!isAddOpen}
				isBack={isAddOpen}
				title={isAddOpen ? '' : 'Quản lý người dùng'}
				onChangeBack={isAddOpen ? () => setIsAddOpen(false) : () => router.back()}
				titleOpen='Thêm người dùng'
				onChange={() => setIsAddOpen(true)}
			/>
			{!isAddOpen ? (
				<>
					<SearchAndFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						isSelectedRole
						selectedRole={selectedRole}
						setSelectedRole={setSelectedRole}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						setCurrentPage={setCurrentPage}
					/>
					<UserTable
						users={selectedRole ? userFilterRole : users}
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
			<Toaster />
		</div>
	);
};

export default AdminUserPage;
