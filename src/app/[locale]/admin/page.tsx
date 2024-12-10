// 'use client';
// import { Clapperboard, Eye, ShoppingBag, Store } from 'lucide-react';
// import { FC, useEffect, useState } from 'react';

// import LineChart from '@/app/components/Charts/LineChart';
// import BarChart from '@/app/components/Charts/BarChart';
// import PieChart from '@/app/components/Charts/PieChart';
// import { getStatistics } from '@/app/services/api';
// // import { exportToExcel } from '@/app/utils/exportToExcel';
// import '@/app/utils/chartSetup';
// import Doughnut from '@/app/components/Charts/Doughnut';
// import { useTheme } from '@/app/context/ThemeContext';

// const AdminPage: FC = () => {
// 	const [topSellingDishes, setTopSellingDishes] = useState<any>(null);
// 	const [dishRatings, setDishRatings] = useState<any>(null);
// 	const [dishRevenue, setDishRevenue] = useState<any>(null);
// 	const [visitStats, setVisitStats] = useState<any>(null);
// 	const [interactionStats, setInteractionStats] = useState<any>(null);
// 	const { isDarkMode } = useTheme();
// 	useEffect(() => {
// 		const fetchStats = async () => {
// 			const topSellingData = await getStatistics('dishes/top-selling', {
// 				from: '2024-01-01',
// 				to: '2024-12-31',
// 			});
// 			const dishRatingsData = await getStatistics('dishes/ratings', {
// 				from: '2024-01-01',
// 				to: '2024-12-31',
// 			});
// 			const dishRevenueData = await getStatistics('dishes/revenue', {
// 				from: '2024-01-01',
// 				to: '2024-12-31',
// 			});
// 			const visitStatsData = await getStatistics('visits', {
// 				from: '2024-01-01',
// 				to: '2024-12-31',
// 			});
// 			const interactionStatsData = await getStatistics('interactions', {
// 				from: '2024-01-01',
// 				to: '2024-12-31',
// 			});

// 			setTopSellingDishes(topSellingData);
// 			setDishRatings(dishRatingsData);
// 			setDishRevenue(dishRevenueData);
// 			setVisitStats(visitStatsData);
// 			setInteractionStats(interactionStatsData);
// 		};

// 		fetchStats();
// 	}, []);
// 	// const handleExport = () => {
// 	// 	const dataSheets = [
// 	// 		{
// 	// 			sheetName: 'Đánh Giá Món Ăn',
// 	// 			data: dishRatings.data.datasets[0].data.map((value: number, index: number) => ({
// 	// 				'Đánh giá': dishRatings.data.labels[index],
// 	// 				'Số lượng': value,
// 	// 			})),
// 	// 		},
// 	// 	];
// 	// 	exportToExcel(dataSheets, 'Report');
// 	// };
// 	return (
// 		<div className={``}>
// 			<div className='mb-8'>
// 				{/* start: item parameter */}
// 				<div className='flex flex-col gap-4'>
// 					<div className='grid grid-cols-4 gap-4'>
// 						<div
// 							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
// 						>
// 							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
// 								<Store className='text-white' />
// 							</div>
// 							<div className='h-12'>
// 								<div className='flex items-center justify-between text-gray'>
// 									<strong className=''>Branch</strong>
// 								</div>
// 								<div className=''>
// 									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
// 								</div>
// 							</div>
// 						</div>
// 						<div
// 							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
// 						>
// 							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
// 								<Clapperboard className='text-white' />
// 							</div>
// 							<div className='h-12'>
// 								<div className='flex items-center justify-between text-gray'>
// 									<strong className=''>Movie</strong>
// 								</div>
// 								<div className=''>
// 									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
// 								</div>
// 							</div>
// 						</div>
// 						<div
// 							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
// 						>
// 							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
// 								<ShoppingBag className='text-white' />
// 							</div>
// 							<div className='h-12'>
// 								<div className='flex items-center justify-between text-gray'>
// 									<strong className=''>Order</strong>
// 								</div>
// 								<div className=''>
// 									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
// 								</div>
// 							</div>
// 						</div>
// 						<div
// 							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
// 						>
// 							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
// 								<Eye className='text-white' />
// 							</div>
// 							<div className='h-12'>
// 								<div className='flex items-center justify-between text-gray'>
// 									<strong className=''>Total Revenue</strong>
// 								</div>
// 								<div className=''>
// 									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				{/* end: item parameter */}
// 				{/* {dishRatings && (
// 					<div className='bg-darkGreen mb-8 flex h-96 w-[30%] flex-col items-center justify-center rounded-md'>
// 						<h3 className='mb-2 text-xl font-semibold'>Người sử dụng web</h3>
// 						<div style={{ width: '280px', height: '280px' }} className=''>
// 							<Doughnut data={dishRatings.data} options={dishRatings.options} />
// 						</div>
// 					</div>
// 				)} */}
// 			</div>
// 			<div className='flex items-center gap-4'>
// 				{dishRevenue && (
// 					<div className='mb-8'>
// 						<h3 className='mb-2 text-xl font-semibold'>Doanh Thu Từ Món Ăn</h3>
// 						<div
// 						// style={{ width: '400px', height: '400px' }}
// 						>
// 							<LineChart data={dishRevenue.data} options={dishRevenue.options} />
// 						</div>
// 					</div>
// 				)}
// 				{visitStats && (
// 					<div className='mb-8'>
// 						<h3 className='mb-2 text-xl font-semibold'>Thống Kê Lượt Truy Cập</h3>
// 						<div
// 						// style={{ width: '400px', height: '400px' }}
// 						>
// 							<LineChart data={visitStats.data} options={visitStats.options} />
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
// export default AdminPage;

'use client';
import LineChart, {
	monthlyRevenueData,
	monthlyRevenueOptions,
} from '@/app/components/Charts/LineChart';
import MyBarChart from '@/app/components/Charts/MyBarChart';
import Links from '@/app/components/Links';
import { useTheme } from '@/app/context/ThemeContext';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';

const AdminRevenuePage: FC = () => {
	const { isDarkMode } = useTheme();
	const locale = useLocale();

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
						<Links
							onClick={() => {
								localStorage.setItem('activeMainTab', 'admin-revenue');
								localStorage.setItem('activeSubTab', 'revenueMovie');
							}}
							href={`/admin/admin-revenue/revenueMovie`}
							className='text-primary hover:opacity-80'
						>
							Xem tất cả
						</Links>
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

						<Link
							onClick={() => {
								localStorage.setItem('activeMainTab', 'admin-revenue');
								localStorage.setItem('activeSubTab', 'revenueBranch');
							}}
							href={`/${locale}/admin/admin-revenue/revenueBranch`}
							className='text-primary hover:opacity-80'
						>
							Xem tất cả
						</Link>
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
