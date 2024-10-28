import React from 'react';
import { Room } from '../types';
// Adjust the import based on your types

interface AdminRoomTableProps {
	rooms: Room[];
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setRoomToEdit: (room: Room | null) => void;
	setRoomToDelete: (room: Room | null) => void;
}

const AdminRoomTable: React.FC<AdminRoomTableProps> = ({
	rooms,
	onEditOpen,
	onDeleteOpen,
	setRoomToEdit,
	setRoomToDelete,
}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{rooms.map((room) => (
					<tr key={room.id}>
						<td>{room.id}</td>
						<td>{room.name}</td>
						<td>
							<button
								onClick={() => {
									setRoomToEdit(room);
									onEditOpen();
								}}
							>
								Edit
							</button>
							<button
								onClick={() => {
									setRoomToDelete(room);
									onDeleteOpen();
								}}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AdminRoomTable;
