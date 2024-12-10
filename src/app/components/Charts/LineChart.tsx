import { Line } from 'react-chartjs-2';

interface LineChartProps {
	data: any;
	options: any;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
	return <Line data={data} options={options} />;
};

export default LineChart;

export const monthlyRevenueData = {
	labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	], // Các tháng
	datasets: [
		{
			label: 'Monthly Revenue ($)',
			data: [5000, 7000, 8000, 5500, 9000, 12000, 15000, 13000, 14000, 10000, 11000, 17000], // Doanh thu từng tháng
			borderColor: '#C26F69', // Màu đường kẻ
			backgroundColor: '#c26f694d', // Màu nền mờ
			pointBackgroundColor: '#C26F69', // Màu điểm
			pointBorderColor: '#C26F69', // Màu viền điểm
			tension: 0.3, // Làm mềm đường kẻ
		},
	],
};

export const monthlyRevenueOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: true,
			position: 'top', // Vị trí của chú thích
			// labels: {
			// 	color: '#000', // Màu chữ của chú thích
			// },
		},
		tooltip: {
			enabled: true,
			callbacks: {
				label: (tooltipItem: any) => `Revenue: $${tooltipItem.raw.toLocaleString()}`,
			},
		},
	},
	scales: {
		x: {
			ticks: {
				// color: '#000', // Màu chữ của trục x
			},
		},
		y: {
			ticks: {
				// color: '#000', // Màu chữ của trục y
				callback: (value: any) => `$${value.toLocaleString()}`, // Hiển thị dạng tiền tệ
			},
			beginAtZero: true, // Bắt đầu từ 0
		},
	},
};
