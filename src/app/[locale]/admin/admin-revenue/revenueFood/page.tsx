// 'use client';
// import BarCharts from '@/app/components/Charts/BarCharts';
// import { chartFoodRevenue, chartFoodQuantity } from '@/app/components/Charts/ChartConfig';
// import axios from 'axios';
// import { useLocale } from 'next-intl';
// import React, { FC, use, useEffect, useState } from 'react';
// interface CategoryLanguage {
// 	id: string;
// 	languageCode: string;
// }

// interface Translation {
// 	id: string;
// 	name: string;
// 	description: string;
// 	categoryLanguage: CategoryLanguage;
// }

// interface FoodDrink {
// 	id: string;
// 	quantity: number;
// 	price: number;
// 	createdAt: string;
// 	updatedAt: string;
// }

// interface Item {
// 	id: string;
// 	price: string;
// 	image: string;
// 	type: string;
// 	soldQuantity: number;
// 	createdAt: string;
// 	updatedAt: string;
// 	translations: Translation[];
// 	foodDrink: FoodDrink[];
// }
// const revenueFoodPage: FC = () => {
// 	const [dataFoodDrink, setDataFoodDrink] = useState<Item[]>([]);
// 	const [startDate, setStartDate] = useState('');
// 	const [endDate, setEndDate] = useState('');
// 	const [foodData, setFoodData] = useState([
// 		{ name: 'Pizza', quantity: 120, revenue: 75000000 },
// 		{ name: 'Burger', quantity: 100, revenue: 62000000 },
// 		{ name: 'Sushi', quantity: 95, revenue: 58000000 },
// 		{ name: 'Pasta', quantity: 80, revenue: 49000000 },
// 		{ name: 'Salad', quantity: 60, revenue: 32000000 },
// 	]);
// 	const locale = useLocale();
// 	const fetchDataFoodDrink = () => {
// 		axios
// 			.get(`${process.env.NEXT_PUBLIC_API}/food-drinks/revenue`, {
// 				params: {
// 					languageCode: locale,
// 				},
// 			})
// 			.then((res) => {
// 				console.log(res.data.data);
// 				setDataFoodDrink(res.data.data);
// 			})
// 			.catch((error) => console.error('Error:', error));
// 	};
// 	useEffect(() => {
// 		fetchDataFoodDrink();
// 		console.log(dataFoodDrink);
// 	}, []);
// 	const handleGenerateReport = () => {
// 		// Giả lập lấy dữ liệu và tính toán (cần kết nối API thực tế)
// 		console.log('Fetching data for:', startDate, endDate);
// 		// Sau khi fetch API, cập nhật setFoodData(...)
// 	};

// 	return (
// 		<div className='container mx-auto rounded p-4 shadow'>
// 			<div className='mb-4 flex items-center gap-2'>
// 				<input
// 					type='date'
// 					value={startDate}
// 					onChange={(e) => setStartDate(e.target.value)}
// 					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
// 				/>
// 				<input
// 					type='date'
// 					value={endDate}
// 					onChange={(e) => setEndDate(e.target.value)}
// 					className='rounded p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none'
// 				/>
// 				<button
// 					onClick={handleGenerateReport}
// 					className='rounded bg-green-500 px-4 py-1 text-white hover:opacity-80'
// 				>
// 					Xuất báo cáo
// 				</button>
// 			</div>
// 			<div className='mb-4 grid grid-cols-2 gap-1'>
// 				<div>
// 					<BarCharts config={chartFoodRevenue} />
// 				</div>
// 				<div>
// 					<BarCharts config={chartFoodQuantity} />
// 				</div>
// 			</div>
// 			<table className='min-w-full'>
// 				<thead>
// 					<tr className='border-b border-gray1'>
// 						<th className='px-4 py-2 text-left'>Món ăn</th>
// 						<th className='px-4 py-2'>Số lượng bán ra</th>
// 						<th className='px-4 py-2'>Tổng doanh thu</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{foodData.map((food) => (
// 						<tr key={food.name} className='border-b border-gray1'>
// 							<td className='px-4 py-2'>{food.name}</td>
// 							<td className='px-4 py-2 text-center'>{food.quantity}</td>
// 							<td className='px-4 py-2 text-center'>{food.revenue.toLocaleString('vi-VN')}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

// export default revenueFoodPage;
'use client';
import BarCharts from '@/app/components/Charts/BarCharts';
import { chartFoodRevenue, chartFoodQuantity } from '@/app/components/Charts/ChartConfig';
import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

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

	const handleGenerateReport = () => {
		// Giả lập lấy dữ liệu và tính toán (cần kết nối API thực tế)
		console.log('Fetching data for:', startDate, endDate);
		// Sau khi fetch API, cập nhật setFoodData(...)
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
