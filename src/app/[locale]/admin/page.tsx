'use client';
import { Eye, Store } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

import LineChart from '@/app/components/Charts/LineChart';
import BarChart from '@/app/components/Charts/BarChart';
import PieChart from '@/app/components/Charts/PieChart';
import { getStatistics } from '@/app/services/api';
// import { exportToExcel } from '@/app/utils/exportToExcel';
import '@/app/utils/chartSetup';
import Doughnut from '@/app/components/Charts/Doughnut';
import { useTheme } from '@/app/context/ThemeContext';
import PolarAreaChart from '@/app/components/Charts/PolarArea';
import BubbleChart from '@/app/components/Charts/Bubble';
import ScatterChart from '@/app/components/Charts/Scatter';
import { Image } from '@nextui-org/react';

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
							className={`${isDarkMode ? '' : ''} flex items-center gap-x-6 rounded-md bg-white p-8 text-gray`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Store className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between'>
									<strong className=''>Branch</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? '' : ''} flex items-center gap-x-6 rounded-md bg-white p-8 text-gray`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Eye className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between'>
									<strong className=''>Movie</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? '' : ''} flex items-center gap-x-6 rounded-md bg-white p-8 text-gray`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Eye className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between'>
									<strong className=''>Order</strong>
								</div>
								<div className=''>
									<strong className={` ${isDarkMode ? '' : 'text-black'}`}>1000</strong>
								</div>
							</div>
						</div>
						<div
							className={`${isDarkMode ? '' : ''} flex items-center gap-x-6 rounded-md bg-white p-8 text-gray`}
						>
							<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#9694FF] p-2'>
								<Eye className='text-white' />
							</div>
							<div className='h-12'>
								<div className='flex items-center justify-between'>
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
			</div>
			<div className='grid grid-cols-3 gap-8'>
				{visitStats && (
					<div className='mb-8 h-[44vh] rounded-md bg-white p-2'>
						<h3 className='mb-2 text-xl font-semibold'>Thống Kê Lượt Truy Cập</h3>
						<div className='h-full'>
							<BarChart data={visitStats.data} options={visitStats.options} />
						</div>
					</div>
				)}

				{dishRatings && (
					<div className='mb-8 flex h-[44vh] flex-col items-center justify-center rounded-md bg-white p-2'>
						<h3 className='mb-2 text-xl font-semibold'>Người sử dụng web</h3>
						<div style={{ width: '280px', height: '280px' }}>
							<Doughnut data={dishRatings.data} options={dishRatings.options} />
						</div>
					</div>
				)}

				<div className='h-[44vh] rounded-md bg-white p-4'>
					<p className='text-2xl font-bold'>Top user</p>
					<div className='py-2'>
						<div className='flex items-center gap-2'>
							<Image
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
								height={56}
								width={56}
								radius='full'
								className='shadow-md'
							/>
							<div>
								<strong className='text-xl'>User1</strong>
								<p className='text-xs text-gray'>@User 1</p>
							</div>
						</div>
					</div>
					<div className='py-2'>
						<div className='flex items-center gap-2'>
							<Image
								src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/hinh-nen-ronaldo-23.jpg'
								height={56}
								width={56}
								radius='full'
								className='shadow-md'
							/>
							<div>
								<strong className='text-xl'>User1</strong>
								<p>@User 1</p>
							</div>
						</div>
					</div>
					<div className='py-2'>
						<div className='flex items-center gap-2'>
							<Image
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
								height={56}
								width={56}
								radius='full'
								className='shadow-md'
							/>
							<div>
								<strong className='text-xl'>User1</strong>
								<p>@User 1</p>
							</div>
						</div>
					</div>
					<div className='py-2'>
						<div className='flex items-center gap-2'>
							<Image
								src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/hinh-nen-ronaldo-23.jpg'
								height={56}
								width={56}
								radius='full'
								className='shadow-md'
							/>
							<div>
								<strong className='text-xl'>User1</strong>
								<p>@User 1</p>
							</div>
						</div>
					</div>
				</div>
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
