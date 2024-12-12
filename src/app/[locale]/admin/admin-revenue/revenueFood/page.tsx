'use client';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartFoodRevenue, chartFoodQuantity } from '@/app/components/Charts/ChartConfig';
import { FC } from 'react';

const revenueFoodPage: FC = () => {
	return (
		<div className='container mx-auto rounded p-4 shadow'>
			<div className='mb-4 flex items-center gap-2'>
				<input
					type='date'
					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
				/>
				<input
					type='date'
					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
				/>
				<button className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'>
					Xuất báo cáo
				</button>
			</div>
			<div className='mb-4 grid grid-cols-2 gap-1'>
				<div>
					<BarCharts config={chartFoodRevenue} />
				</div>
				<div>
					<BarCharts config={chartFoodQuantity} />
				</div>
			</div>
			<table className='min-w-full'>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='px-4 py-2 text-left'>Món ăn</th>
						<th className='px-4 py-2'>Số lượng bán ra</th>
						<th className='px-4 py-2'>Tổng doanh thu</th>
					</tr>
				</thead>
				<tbody>
					<tr className='border-b border-gray1 text-primary'>
						<td className='px-4 py-2'>Pizza</td>
						<td className='px-4 py-2 text-center'>120</td>
						<td className='px-4 py-2 text-center'>75,000,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Burger</td>
						<td className='px-4 py-2 text-center'>100</td>
						<td className='px-4 py-2 text-center'>62,000,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Sushi</td>
						<td className='px-4 py-2 text-center'>95</td>
						<td className='px-4 py-2 text-center'>58,000,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Pasta</td>
						<td className='px-4 py-2 text-center'>80</td>
						<td className='px-4 py-2 text-center'>49,000,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Salad</td>
						<td className='px-4 py-2 text-center'>60</td>
						<td className='px-4 py-2 text-center'>32,000,000</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default revenueFoodPage;
