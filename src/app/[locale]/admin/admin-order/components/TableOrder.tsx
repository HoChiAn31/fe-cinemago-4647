import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Pencil } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';
import { Order } from '@/app/types/Order';

// interface Order {
// 	orderId: string;
// 	movie: string;
// 	time: string;
// 	room: string;
// 	status: string;
// 	total: string;
// 	date: string;
// }

interface OrderTableProps {
	orders: Order[];
	isLoading: boolean;
	onEdit: (order: Order) => void;
	// onDelete: (order: Order) => void;
}
function getLocalTimeFromDateTime(dateTimeString: string) {
	const dateTime = new Date(dateTimeString);
	const hours = dateTime.getHours().toString().padStart(2, '0');
	const minutes = dateTime.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}
function getDateFromDateTime(dateTimeString: string) {
	const dateTime = new Date(dateTimeString);
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(dateTime);
}
const OrderTable: React.FC<OrderTableProps> = ({ orders, isLoading, onEdit }) => {
	const { isDarkMode } = useTheme();

	return (
		<>
			<div className='border-gray-200 overflow-hidden rounded-md border'>
				<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} border-collapse`}>
					<thead>
						<tr className='bg-gray-200 border-gray-300 border-b'>
							<th className='border-gray-300 border-r p-3'>Mã đơn hàng</th>
							<th className='border-gray-300 border-r p-3 text-left'>Tên phim</th>
							<th className='border-gray-300 border-r p-3'>Suất chiếu</th>
							<th className='border-gray-300 border-r p-3'>Phòng chiếu</th>
							<th className='border-gray-300 border-r p-3'>Trạng thái</th>
							<th className='border-gray-300 border-r p-3'>Tổng tiền</th>
							<th className='border-gray-300 border-r p-3'>Ngày đặt</th>
							<th className='p-3'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{!isLoading ? (
							<tr>
								<td colSpan={8} className='p-3 text-center'>
									<Loading />
								</td>
							</tr>
						) : (
							orders.map((order, index) => (
								<tr key={order.id} className='hover:bg-gray-100 border-gray-300 border-b'>
									<td className='border-gray-300 border-r p-3 text-center'>{order.id}</td>
									<td className='border-gray-300 border-r p-3'>
										{order.movie.translations.map((translation) => translation.name)}
									</td>
									<td className='border-gray-300 border-r p-3 text-center'>
										{getLocalTimeFromDateTime(order.showTimes.show_time_start)}-
										{getLocalTimeFromDateTime(order.showTimes.show_time_end)}
									</td>
									<td className='border-gray-300 border-r p-3 text-center'>
										{order.showTimes.room.name}
									</td>
									<td className='border-gray-300 border-r p-3'>
										<span
											className={`rounded border px-2 py-1 ${
												order.payment.paymentStatus === 'Đã thanh toán'
													? 'border-green-500 bg-green-100 text-green-600'
													: 'border-red-500 bg-red-100 text-red-600'
											}`}
										>
											{order.payment.paymentStatus}
										</span>
									</td>
									<td className='border-gray-300 border-r p-3 text-center'>{order.totalAmount}</td>
									<td className='border-gray-300 border-r p-3 text-center'>
										{getDateFromDateTime(order.createdAt)}
									</td>
									<td className='p-3'>
										<div className='flex items-center justify-center gap-2'>
											<Button
												color='warning'
												onPress={() => onEdit(order)}
												isIconOnly
												radius='sm'
												size='sm'
											>
												<Pencil className='text-white' height={20} width={20} />
											</Button>
											{/* <Button
    											color='danger'
    											onPress={() => onDelete(order)}
    											isIconOnly
    											radius='sm'
    											size='sm'
    										>
    											<Trash2 height={20} width={20} />
    										</Button> */}
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default OrderTable;
