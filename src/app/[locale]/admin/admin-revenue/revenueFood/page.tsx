'use client';
import axios from 'axios';
import { ChartConfiguration } from 'chart.js';
import { useLocale } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartFoodRevenue, chartFoodQuantity } from '@/app/components/Charts/ChartConfig';
interface CategoryLanguage {
	id: string;
	languageCode: string;
}

interface Translation {
	id: string;
	name: string;
	description: string;
	categoryLanguage: CategoryLanguage;
}

interface FoodDrink {
	id: string;
	quantity: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}

interface Item {
	id: string;
	price: string;
	image: string;
	type: string;
	soldQuantity: number;
	createdAt: string;
	updatedAt: string;
	translations: Translation[];
	foodDrink: FoodDrink[];
}

const RevenueFoodPage: FC = () => {
	const [dataFoodDrink, setDataFoodDrink] = useState<Item[]>([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [foodData, setFoodData] = useState([
		{ name: 'Pizza', quantity: 120, revenue: 75000000 },
		{ name: 'Burger', quantity: 100, revenue: 62000000 },
		{ name: 'Sushi', quantity: 95, revenue: 58000000 },
		{ name: 'Pasta', quantity: 80, revenue: 49000000 },
		{ name: 'Salad', quantity: 60, revenue: 32000000 },
	]);
	const locale = useLocale();

	const fetchDataFoodDrink = () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/food-drinks/revenue`, {
				params: {
					languageCode: locale,
				},
			})
			.then((res) => {
				setFoodData(res.data.data);
			})
			.catch((error) => console.error('Error:', error));
	};

	useEffect(() => {
		fetchDataFoodDrink();
	}, [locale]); // Fetch when locale changes

	const [chartConfig, setChartConfig] = useState<ChartConfiguration<'bar'>>({
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: 'Tổng doanh thu (VNĐ)',
					data: [],
					backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
					text: 'Tổng doanh thu theo món ăn',
				},
			},
		},
	});
	const [chartConfigQuantity, setChartConfigQuantity] = useState<ChartConfiguration<'bar'>>({
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: 'Số lượng bán ra',
					data: [120, 100, 95, 80, 60],
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
					text: 'Số lượng bán ra theo món ăn',
				},
			},
		},
	});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5000/food-drinks/revenue');
				const { data } = response.data;

				const labels = data.map((item: any) => item.name);
				const revenues = data.map((item: any) => item.revenue);
				const quantity = data.map((item: any) => item.quantity);
				setChartConfig((prev) => ({
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
				setChartConfigQuantity((prev) => ({
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
		const worksheet = XLSX.utils.json_to_sheet(foodData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh Thu Món Ăn');

		// Xuất file
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});

		saveAs(data, `DoanhThuMonAn_${new Date().toISOString()}.xlsx`);
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
					<BarCharts config={chartConfig} />
				</div>
				<div>
					<BarCharts config={chartConfigQuantity} />
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
					{foodData.map((food) => (
						<tr key={food.name} className='border-b border-gray1'>
							<td className='px-4 py-2'>{food.name}</td>
							<td className='px-4 py-2 text-center'>{food.quantity}</td>
							<td className='px-4 py-2 text-center'>{food.revenue.toLocaleString('vi-VN')}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RevenueFoodPage;
