'use client';
import React from 'react';
import { Room } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface AdminRoomTableProps {
	rooms: Room[];
	onEditOpen?: () => void;
	onDeleteOpen?: () => void;
	setRoomToEdit?: React.Dispatch<React.SetStateAction<Room | null>>;
	setRoomToDelete: (room: Room | null) => void;
	isLoading: boolean;
	idBranch: string;
}

const AdminRoomTable: React.FC<AdminRoomTableProps> = ({
	rooms,
	onEditOpen,
	onDeleteOpen,
	setRoomToEdit,
	setRoomToDelete,
	isLoading,
	idBranch,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='bg-darkGreen overflow-hidden rounded-sm border-x border-t border-gray2'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray2'>
						<th className='border-r border-gray2 p-3'>Order</th>
						<th className='border-r border-gray2 p-3'>Name</th>
						<th className='border-r border-gray2 p-3'>Screening Type</th>
						<th className='border-r border-gray2 p-3'>Seats</th>
						<th className='border-r border-gray2 p-3'>Branch Phone</th>
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						<tr>
							<td colSpan={6} className='overflow-hidden border-b border-gray2 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					) : (
						rooms.map((room, index) => (
							<tr key={room.id} className='border-b border-gray2'>
								<td className='border-r border-gray2 p-3 text-center'>{index + 1}</td>
								<td className='border-r border-gray2 p-3 text-center'>{room.name}</td>
								<td className='border-r border-gray2 p-3 text-center'>{room.screeningType}</td>
								<td className='border-r border-gray2 p-3 text-center'>{room.totalSeats}</td>
								<td className='border-r border-gray2 p-3 text-center'>{room.branch.phone}</td>
								<td className='grid grid-cols-2 gap-2 p-3'>
									<div className='flex items-center justify-center'>
										<Button
											color='warning'
											onPress={() => {
												// if (setRoomToEdit) setRoomToEdit(room);
												// if (onEditOpen) onEditOpen();
												console.log(room.id);
												router.push(`/${locale}/admin/admin-room/${idBranch}/${room.id}`);
											}}
											isIconOnly
											radius='sm'
										>
											<Pencil className='text-white' />
										</Button>
									</div>
									<div className='flex items-center justify-center'>
										<Button
											color='danger'
											onPress={() => {
												setRoomToDelete(room);
												if (onDeleteOpen) onDeleteOpen();
											}}
											isIconOnly
											radius='sm'
										>
											<Trash2 className='text-white' />
										</Button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminRoomTable;
