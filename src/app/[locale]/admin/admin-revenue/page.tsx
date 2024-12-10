'use client';
import LineChart, {
	monthlyRevenueData,
	monthlyRevenueOptions,
} from '@/app/components/Charts/LineChart';
import MyBarChart from '@/app/components/Charts/MyBarChart';
import { useTheme } from '@/app/context/ThemeContext';
import { FC } from 'react';

const AdminRevenuePage: FC = () => {
	const { isDarkMode } = useTheme();

	return (
		<div className='p-4'>
			<div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-4'>
				<div className={`rounded border border-[#5F86A5] p-4 shadow`}>
					<h2>Doanh thu trong ngày (15/5/2024)</h2>
					<p className='text-2xl font-bold'>760,000</p>
				</div>
				<div className='rounded border border-[#52B473] p-4 shadow'>
					<h2 className='text-gray-600'>Khách hàng mới (T5/2024)</h2>
					<p className='text-2xl font-bold'>0</p>
				</div>
				<div className={`rounded border border-[#CBA362] p-4 shadow`}>
					<h2 className='text-gray-600'>Tổng vé bán ra (T5/2024)</h2>
					<p className='text-2xl font-bold'>9</p>
				</div>
				<div className={`rounded border border-primary p-4 shadow`}>
					<h2 className='text-gray-600'>Tổng doanh thu (T5/2024)</h2>
					<p className='text-2xl font-bold'>1,826,000</p>
				</div>
			</div>
			<div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div className='rounded p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
					<h2 className='text-gray-600'>Top bài viết được xem nhiều nhất</h2>
					<MyBarChart />
				</div>
				<div className='rounded p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
					<h2 className='text-gray-600'>Doanh thu theo tháng</h2>
					<LineChart data={monthlyRevenueData} options={monthlyRevenueOptions} />
				</div>
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div className='rounded p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-gray-600'>Doanh thu theo phim</h2>
						<a href='#' className='text-primary hover:opacity-80'>
							Xem tất cả
						</a>
					</div>
					<table className='w-full text-left'>
						<thead>
							<tr>
								<th className='border-b border-gray1 p-2'>Tên phim</th>
								<th className='border-b border-gray1 p-2'>Tổng vé bán ra</th>
								<th className='border-b border-gray1 p-2'>Tổng doanh thu</th>
							</tr>
						</thead>
						<tbody>
							<tr className=''>
								<td className='border-b border-gray1 p-2'>
									<span className=''>Monkey Man Báo Thù</span>
								</td>
								<td className='border-b border-gray1 p-2'>5</td>
								<td className='border-b border-gray1 p-2'>1,066,000</td>
							</tr>
							<tr>
								<td className='border-b border-gray1 p-2'>Cái Giá Của Hạnh Phúc</td>
								<td className='border-b border-gray1 p-2'>4</td>
								<td className='border-b border-gray1 p-2'>760,000</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='rounded p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-gray-600'>Doanh thu theo rạp</h2>
						<a href='#' className='text-primary hover:opacity-80'>
							Xem tất cả
						</a>
					</div>
					<table className='w-full text-left'>
						<thead>
							<tr>
								<th className='border-b border-gray1 p-2'>Rạp chiếu</th>
								<th className='border-b border-gray1 p-2'>Tổng vé bán ra</th>
								<th className='border-b border-gray1 p-2'>Tổng doanh thu</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border-b border-gray1 p-2'>HCinema Aeon Hà Đông</td>
								<td className='border-b border-gray1 p-2'>9</td>
								<td className='border-b border-gray1 p-2'>1,826,000</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminRevenuePage;
