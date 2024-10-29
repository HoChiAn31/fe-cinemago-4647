'use client';
import { Clapperboard, Eye, ShoppingBag, Store } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import LineChart from '@/app/components/Charts/LineChart';
import BarChart from '@/app/components/Charts/BarChart';
import PieChart from '@/app/components/Charts/PieChart';
import { getStatistics } from '@/app/services/api';
// import { exportToExcel } from '@/app/utils/exportToExcel';
import '@/app/utils/chartSetup';
import Doughnut from '@/app/components/Charts/Doughnut';
import { useTheme } from '@/app/context/ThemeContext';

const AdminPage: FC = () => {
	const [topSellingDishes, setTopSellingDishes] = useState<any>(null);
	const [dishRatings, setDishRatings] = useState<any>(null);
	const [dishRevenue, setDishRevenue] = useState<any>(null);
	const [visitStats, setVisitStats] = useState<any>(null);
	const [interactionStats, setInteractionStats] = useState<any>(null);
	const { isDarkMode } = useTheme();
	useEffect(() => {
		const fetchStats = async () => {
			const topSellingData = await getStatistics('dishes/top-selling', {
				from: '2024-01-01',
				to: '2024-12-31',
			});
			const dishRatingsData = await getStatistics('dishes/ratings', {
				from: '2024-01-01',
				to: '2024-12-31',
			});
			const dishRevenueData = await getStatistics('dishes/revenue', {
				from: '2024-01-01',
				to: '2024-12-31',
			});
			const visitStatsData = await getStatistics('visits', {
				from: '2024-01-01',
				to: '2024-12-31',
			});
			const interactionStatsData = await getStatistics('interactions', {
				from: '2024-01-01',
				to: '2024-12-31',
			});

			setTopSellingDishes(topSellingData);
			setDishRatings(dishRatingsData);
			setDishRevenue(dishRevenueData);
			setVisitStats(visitStatsData);
			setInteractionStats(interactionStatsData);
		};

		fetchStats();
	}, []);
	// const handleExport = () => {
	// 	const dataSheets = [
	// 		{
	// 			sheetName: 'Đánh Giá Món Ăn',
	// 			data: dishRatings.data.datasets[0].data.map((value: number, index: number) => ({
	// 				'Đánh giá': dishRatings.data.labels[index],
	// 				'Số lượng': value,
	// 			})),
	// 		},
	// 	];
	// 	exportToExcel(dataSheets, 'Report');
	// };
	return (
		<div className={``}>
			<div className='mb-8'>
				{/* start: item parameter */}
				<div className='flex flex-col gap-4'>
					<div className='grid grid-cols-4 gap-4'>
						<div
							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Store className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between text-gray'>
									<strong className=''>Branch</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Clapperboard className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between text-gray'>
									<strong className=''>Movie</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<ShoppingBag className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between text-gray'>
									<strong className=''>Order</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? 'bg-dark text-white' : 'text-black'} flex items-center gap-x-6 rounded-md p-8`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Eye className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between text-gray'>
									<strong className=''>Total Revenue</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* end: item parameter */}
				{/* {dishRatings && (
					<div className='bg-darkGreen mb-8 flex h-96 w-[30%] flex-col items-center justify-center rounded-md'>
						<h3 className='mb-2 text-xl font-semibold'>Người sử dụng web</h3>
						<div style={{ width: '280px', height: '280px' }} className=''>
							<Doughnut data={dishRatings.data} options={dishRatings.options} />
						</div>
					</div>
				)} */}
			</div>
			<div className='flex items-center gap-4'>
				{dishRevenue && (
					<div className='mb-8'>
						<h3 className='mb-2 text-xl font-semibold'>Doanh Thu Từ Món Ăn</h3>
						<div
						// style={{ width: '400px', height: '400px' }}
						>
							<LineChart data={dishRevenue.data} options={dishRevenue.options} />
						</div>
					</div>
				)}
				{visitStats && (
					<div className='mb-8'>
						<h3 className='mb-2 text-xl font-semibold'>Thống Kê Lượt Truy Cập</h3>
						<div
						// style={{ width: '400px', height: '400px' }}
						>
							<LineChart data={visitStats.data} options={visitStats.options} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default AdminPage;
