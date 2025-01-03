// 'use client';

// import BarCharts from '@/app/components/Charts/BarCharts';
// import { chartMovie, chartTicket } from '@/app/components/Charts/ChartConfig';
// import { FC } from 'react';

// const revenueMoviePage: FC = () => {
// 	return (
// 		<div className='container mx-auto rounded p-4 shadow'>
// 			<div className='mb-4 flex items-center gap-2'>
// 				<input
// 					type='date'
// 					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
// 				/>
// 				<input
// 					type='date'
// 					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
// 				/>
// 				{/* <button className='rounded bg-blue-500 px-4 py-2 text-white'>Load dữ liệu</button> */}
// 				<button className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'>
// 					Xuất báo cáo
// 				</button>
// 			</div>
// 			<div className='mb-4 grid grid-cols-2 gap-1'>
// 				<div>
// 					<BarCharts config={chartTicket} />
// 				</div>
// 				<div>
// 					<BarCharts config={chartMovie} />
// 				</div>
// 			</div>
// 			<table className='min-w-full'>
// 				<thead>
// 					<tr className='border-b border-gray1'>
// 						<th className='px-4 py-2 text-left'>Tên phim</th>
// 						<th className='px-4 py-2'>Tổng vé bán ra</th>
// 						<th className='px-4 py-2'>Tổng doanh thu</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					<tr className='border-b border-gray1 text-primary'>
// 						<td className='px-4 py-2'>SUGA | Agust D TOUR "D-DAY" The Movie</td>
// 						<td className='px-4 py-2 text-center'>32</td>
// 						<td className='px-4 py-2 text-center'>8,677,300</td>
// 					</tr>
// 					<tr className='border-b border-gray1'>
// 						<td className='px-4 py-2'>Kung Fu Panda 4</td>
// 						<td className='px-4 py-2 text-center'>11</td>
// 						<td className='px-4 py-2 text-center'>4,282,000</td>
// 					</tr>
// 					<tr className='border-b border-gray1'>
// 						<td className='px-4 py-2'>Quỷ Cái</td>
// 						<td className='px-4 py-2 text-center'>26</td>
// 						<td className='px-4 py-2 text-center'>7,791,000</td>
// 					</tr>
// 					<tr className='border-b border-gray1'>
// 						<td className='px-4 py-2'>Quỷ Mộ Trừng Ma</td>
// 						<td className='px-4 py-2 text-center'>8</td>
// 						<td className='px-4 py-2 text-center'>2,671,000</td>
// 					</tr>
// 					<tr className='border-b border-gray1'>
// 						<td className='px-4 py-2'>Monkey Man Báo Thù</td>
// 						<td className='px-4 py-2 text-center'>23</td>
// 						<td className='px-4 py-2 text-center'>8,118,000</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

// export default revenueMoviePage;
'use client';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartMovie, chartTicket } from '@/app/components/Charts/ChartConfig';

import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

interface Movie {
	id: string;
	name: string;
	totalTicketsSold: number;
	totalRevenue: number;
	createdAt: string;
	updatedAt: string;
}

const RevenueMoviePage: FC = () => {
	const [movieData, setMovieData] = useState<Movie[]>([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const locale = useLocale();

	const fetchMovieData = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/movies/findAllRevenue`, {
				params: {
					languageCode: locale,
					startDate,
					endDate,
				},
			})
			.then((res) => {
				setMovieData(res.data.data);
				console.log(res.data.data);
			})
			.catch((error) => console.error('Error:', error));
	};

	useEffect(() => {
		fetchMovieData();
	}, [startDate, endDate, locale]); // Fetch data when date range or locale changes

	const handleGenerateReport = () => {
		console.log('Fetching data for:', startDate, endDate);
		// Fetch the movie data from the API based on the selected dates
		fetchMovieData();
	};

	return (
		<div className='container mx-auto rounded p-4 shadow'>
			<div className='mb-4 flex items-center gap-2'>
				<input
					type='date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
				/>
				<input
					type='date'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
				/>
				<button
					onClick={handleGenerateReport}
					className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'
				>
					Xuất báo cáo
				</button>
			</div>
			<div className='mb-4 grid grid-cols-2 gap-1'>
				<div>
					<BarCharts config={chartMovie} />
				</div>
				<div>
					<BarCharts config={chartMovie} />
				</div>
			</div>
			<table className='min-w-full'>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='px-4 py-2 text-left'>Tên phim</th>
						<th className='px-4 py-2'>Số lượng vé bán ra</th>
						<th className='px-4 py-2'>Tổng doanh thu</th>
					</tr>
				</thead>
				<tbody>
					{movieData.map((movie) => (
						<tr key={movie.id} className='border-b border-gray1'>
							<td className='px-4 py-2'>{movie.name}</td>
							<td className='px-4 py-2 text-center'>{movie.totalTicketsSold}</td>
							<td className='px-4 py-2 text-center'>
								{movie.totalRevenue.toLocaleString('vi-VN')}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RevenueMoviePage;
