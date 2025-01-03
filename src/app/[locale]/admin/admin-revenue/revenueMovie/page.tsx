'use client';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartMovie, chartTicket } from '@/app/components/Charts/ChartConfig';

import axios from 'axios';
import { ChartConfiguration } from 'chart.js';
import { useLocale } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

	const [chartConfigMovie, setChartConfigMovie] = useState<ChartConfiguration<'bar'>>({
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: 'Doanh thu (VNĐ)',
					data: [],
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				x: {
					beginAtZero: true,
				},
				y: {
					beginAtZero: true,
				},
			},
			plugins: {
				legend: {
					display: true,
					position: 'top',
				},
				title: {
					display: true,
					text: 'Tổng doanh thu vé bán được',
				},
			},
		},
	});
	const [chartConfigMovieQuantity, setChartConfigMovieQuantity] = useState<
		ChartConfiguration<'bar'>
	>({
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: 'Doanh thu (VNĐ)',
					data: [],
					backgroundColor: 'rgba(153, 102, 255, 0.6)',
					borderColor: 'rgba(153, 102, 255, 1)',
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				x: {
					beginAtZero: true,
				},
				y: {
					beginAtZero: true,
				},
			},
			plugins: {
				legend: {
					display: true,
					position: 'top',
				},
				title: {
					display: true,
					text: 'Tổng doanh thu vé bán được',
				},
			},
		},
	});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5000/movies/findAllRevenue');
				const { data } = response.data;

				const labels = data.map((item: any) => item.name);
				const revenues = data.map((item: any) => item.totalRevenue);
				const quantity = data.map((item: any) => item.totalTicketsSold);
				setChartConfigMovie((prev) => ({
					...prev,
					data: {
						labels,
						datasets: [
							{
								...prev.data.datasets[0],
								data: revenues,
							},
						],
					},
				}));
				setChartConfigMovieQuantity((prev) => ({
					...prev,
					data: {
						labels,
						datasets: [
							{
								...prev.data.datasets[0],
								data: quantity,
							},
						],
					},
				}));
			} catch (error) {
				console.error('Lỗi khi lấy dữ liệu doanh thu: ', error);
			}
		};

		fetchData();
	}, []);

	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(movieData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh Thu Phim');

		// Xuất file
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});

		saveAs(data, `DoanhThuPhim_${new Date().toISOString()}.xlsx`);
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
					onClick={exportToExcel}
					className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'
				>
					Xuất báo cáo
				</button>
			</div>
			<div className='mb-4 grid grid-cols-2 gap-1'>
				<div>
					<BarCharts config={chartConfigMovie} />
				</div>
				<div>
					<BarCharts config={chartConfigMovieQuantity} />
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
