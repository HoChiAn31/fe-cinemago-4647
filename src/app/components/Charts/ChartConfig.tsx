// components/ChartConfig.ts
import { ChartConfiguration } from 'chart.js';

export const chartTicket: ChartConfiguration<'bar'> = {
	type: 'bar',

	data: {
		labels: [
			'Kung Fu Panda 4',
			'Quỷ Cái',
			'Quỷ Mộ Trừng Ma',
			'Monkey Man Báo Thù',
			'Hành Quang',
			'Diễn Hoa',
			'Mộc Cầm',
			'Gác Kiếm',
			'Bí Ẩn',
			'Ngày Tàn',
			'Cửu Diễm',
			'Bão Cát',
			'Thanh Xuân',
		],
		datasets: [
			{
				label: 'Số vé bán ra',
				data: [11, 26, 8, 23, 15, 20, 18, 25, 10, 30, 22, 17, 19],
				backgroundColor: 'rgba(54, 162, 235, 0.5)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
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
				text: 'Tổng vé bán ra ',
			},
		},
	},
};

export const chartMovie: ChartConfiguration<'bar'> = {
	type: 'bar',

	data: {
		labels: [
			'Kung Fu Panda 4',
			'Quỷ Cái',
			'Quỷ Mộ Trừng Ma',
			'Monkey Man Báo Thù',
			'Hành Quang',
			'Diễn Hoa',
			'Mộc Cầm',
			'Gác Kiếm',
			'Bí Ẩn',
			'Ngày Tàn',
			'Cửu Diễm',
			'Bão Cát',
			'Thanh Xuân',
		],
		datasets: [
			{
				label: 'Doanh thu (VNĐ)',
				data: [
					4282000, 7791000, 2671000, 8118000, 5000000, 6000000, 5500000, 7000000, 3000000, 9000000,
					6600000, 5100000, 5700000,
				],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
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
};

export const chartTicketCinema: ChartConfiguration<'bar'> = {
	type: 'bar',
	data: {
		labels: [
			'Rạp BHD Star Bitexco',
			'Rạp CGV Vincom Đồng Khởi',
			'Rạp Galaxy Nguyễn Du',
			'Rạp Lotte Cinema Nam Sài Gòn',
			'Rạp Mega GS Cao Thắng',
		],
		datasets: [
			{
				label: 'Tổng vé bán ra',
				data: [140, 120, 95, 80, 50],
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
				borderColor: 'rgba(54, 162, 235, 1)',
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
				text: 'Tổng vé bán ra theo rạp',
			},
		},
	},
};

export const chartCinemaRevenue: ChartConfiguration<'bar'> = {
	type: 'bar',
	data: {
		labels: [
			'Rạp BHD Star Bitexco',
			'Rạp CGV Vincom Đồng Khởi',
			'Rạp Galaxy Nguyễn Du',
			'Rạp Lotte Cinema Nam Sài Gòn',
			'Rạp Mega GS Cao Thắng',
		],
		datasets: [
			{
				label: 'Tổng doanh thu (VNĐ)',
				data: [50200000, 42800000, 32400000, 27200000, 18500000],
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
				borderColor: 'rgba(75, 192, 192, 1)',
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
				text: 'Tổng doanh thu theo rạp',
			},
		},
	},
};

export const chartFoodRevenue: ChartConfiguration<'bar'> = {
	type: 'bar',
	data: {
		labels: ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad'],
		datasets: [
			{
				label: 'Tổng doanh thu (VNĐ)',
				data: [75000000, 62000000, 58000000, 49000000, 32000000],
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
};

export const chartFoodQuantity: ChartConfiguration<'bar'> = {
	type: 'bar',
	data: {
		labels: ['Pizza', 'Burger', 'Sushi', 'Pasta', 'Salad'],
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
};
