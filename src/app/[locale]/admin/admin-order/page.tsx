'use client';
import { FC } from 'react';

const adminOderPage: FC = () => {
	const data = [
		{
			orderId: '9617515',
			movie: 'Monkey Man Báo Thù',
			time: '20:25 - 22:20',
			room: 'IMAX - HCinema Aeon Hà Đông',
			status: 'Đã thanh toán',
			total: '1,066,000',
			date: '06-05-2024',
		},
		{
			orderId: '45341960',
			movie: 'Quỷ Cái',
			time: '20:10 - 22:10',
			room: 'GOLD CLASS - HCinema Vincom Royal City',
			status: 'Đã thanh toán',
			total: '1,884,000',
			date: '24-04-2024',
		},
		{
			orderId: '81159823',
			movie: 'SUGA | Agust D TOUR "D-DAY" The Movie',
			time: '20:10 - 22:10',
			room: 'IMAX - HCinema Mac Plaza (Machinco)',
			status: 'Đã thanh toán',
			total: '454,300',
			date: '24-04-2024',
		},
		{
			orderId: '41709126',
			movie: 'Thanh Xuân 18+: Lộ Trình Hướng Về Em',
			time: '08:00 - 10:00',
			room: 'Cinema 1 - HCinema Aeon Hà Đông',
			status: 'Đã thanh toán',
			total: '1,346,800',
			date: '17-04-2024',
		},
		{
			orderId: '82640128',
			movie: 'Godzilla x Kong: Đế Chế Mới',
			time: '09:00 - 11:00',
			room: 'GOLD CLASS - HCinema Aeon Hà Đông',
			status: 'Đã thanh toán',
			total: '580,000',
			date: '17-04-2024',
		},
		{
			orderId: '12295234',
			movie: 'Godzilla x Kong: Đế Chế Mới',
			time: '10:25 - 12:30',
			room: 'Cinema 1 - HCinema Vincom Ocean Park',
			status: 'Đã thanh toán',
			total: '648,000',
			date: '16-04-2024',
		},
		{
			orderId: '10455716',
			movie: 'Quỷ Cái',
			time: '15:10 - 17:15',
			room: 'GOLD CLASS - HCinema Vincom Royal City',
			status: 'Đã hủy',
			total: '908,000',
			date: '15-04-2024',
		},
		{
			orderId: '29413239',
			movie: 'Điềm Báo Của Quỷ',
			time: '15:30 - 17:35',
			room: 'IMAX - HCinema Hà Nội Centerpoint',
			status: 'Đã thanh toán',
			total: '1,234,500',
			date: '15-04-2024',
		},
		{
			orderId: '91716386',
			movie: 'Người "Bạn" Trong Tưởng Tượng',
			time: '12:45 - 14:40',
			room: 'Cinema 2 - HCinema Ocean Park',
			status: 'Đã thanh toán',
			total: '1,003,000',
			date: '14-04-2024',
		},
		{
			orderId: '23390122',
			movie: 'Godzilla x Kong: Đế Chế Mới',
			time: '18:00 - 20:15',
			room: 'Cinema 2 - HCinema Aeon Hà Đông',
			status: 'Đã thanh toán',
			total: '1,015,000',
			date: '13-04-2024',
		},
	];
	return (
		<div className='bg-gray-100 min-h-screen p-4'>
			<div className='rounded-lg p-6 shadow-md'>
				<div className='mb-4 flex items-center justify-between'>
					<button className='rounded bg-blue-500 px-4 py-2 hover:bg-blue-600'>Refresh</button>
					<div className='flex space-x-4'>
						<input
							type='text'
							placeholder='Search...'
							className='border-gray-300 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>
				</div>

				<table className='border-gray-200 w-full table-auto border-collapse border text-left text-sm'>
					<thead className='bg-gray-200'>
						<tr>
							<th className='border-gray-300 border px-4 py-2'>Mã đơn hàng</th>
							<th className='border-gray-300 border px-4 py-2'>Tên phim</th>
							<th className='border-gray-300 border px-4 py-2'>Suất chiếu</th>
							<th className='border-gray-300 border px-4 py-2'>Phòng chiếu</th>
							<th className='border-gray-300 border px-4 py-2'>Trạng thái</th>
							<th className='border-gray-300 border px-4 py-2'>Tổng tiền</th>
							<th className='border-gray-300 border px-4 py-2'>Ngày đặt</th>
						</tr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<tr key={index} className='hover:bg-gray-100'>
								<td className='border-gray-300 border px-4 py-2'>{row.orderId}</td>
								<td className='border-gray-300 border px-4 py-2'>{row.movie}</td>
								<td className='border-gray-300 border px-4 py-2'>{row.time}</td>
								<td className='border-gray-300 border px-4 py-2'>{row.room}</td>
								<td className={`border-gray-300 border px-4 py-2`}>
									<span
										className={` ${
											row.status === 'Đã thanh toán'
												? 'border-green-500 bg-green-100 px-2 py-1 text-green-600'
												: 'border-red-500 bg-red-100 text-red-600'
										} rounded border px-2 py-1`}
									>
										{row.status}
									</span>
								</td>
								<td className='border-gray-300 border px-4 py-2'>{row.total}</td>
								<td className='border-gray-300 border px-4 py-2'>{row.date}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='mt-4 flex items-center justify-between'>
					<span>Showing 1-10 of 50</span>
					<div className='flex space-x-2'>
						<button className='bg-gray-200 hover:bg-gray-300 rounded px-3 py-1'>1</button>
						<button className='bg-gray-200 hover:bg-gray-300 rounded px-3 py-1'>2</button>
						<button className='bg-gray-200 hover:bg-gray-300 rounded px-3 py-1'>3</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default adminOderPage;
