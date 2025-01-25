'use client';
import React from 'react';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartCinemaRevenue, chartTicketCinema } from '@/app/components/Charts/ChartConfig';
import { FC } from 'react';

const revenueCinemaPage: FC = () => {
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
				{/* <button className='rounded bg-blue-500 px-4 py-2 text-white'>Load dữ liệu</button> */}
				<button className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'>
					Xuất báo cáo
				</button>
			</div>
			<div className='mb-4 grid grid-cols-2 gap-1'>
				<div>
					{/* <canvas id='chart1'></canvas> */}
					<BarCharts config={chartTicketCinema} />
				</div>
				<div>
					<BarCharts config={chartCinemaRevenue} />
				</div>
			</div>
			<table className='min-w-full'>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='px-4 py-2 text-left'>Tên rạp</th>
						<th className='px-4 py-2'>Tổng vé bán ra</th>
						<th className='px-4 py-2'>Tổng doanh thu</th>
					</tr>
				</thead>
				<tbody>
					<tr className='border-b border-gray1 text-primary'>
						<td className='px-4 py-2'>Rạp BHD Star Bitexco</td>
						<td className='px-4 py-2 text-center'>140</td>
						<td className='px-4 py-2 text-center'>50,200,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Rạp CGV Vincom Đồng Khởi</td>
						<td className='px-4 py-2 text-center'>120</td>
						<td className='px-4 py-2 text-center'>42,800,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Rạp Galaxy Nguyễn Du</td>
						<td className='px-4 py-2 text-center'>95</td>
						<td className='px-4 py-2 text-center'>32,400,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Rạp Lotte Cinema Nam Sài Gòn</td>
						<td className='px-4 py-2 text-center'>80</td>
						<td className='px-4 py-2 text-center'>27,200,000</td>
					</tr>
					<tr className='border-b border-gray1'>
						<td className='px-4 py-2'>Rạp Mega GS Cao Thắng</td>
						<td className='px-4 py-2 text-center'>50</td>
						<td className='px-4 py-2 text-center'>18,500,000</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default revenueCinemaPage;
