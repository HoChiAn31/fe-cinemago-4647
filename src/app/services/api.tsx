// services/api.ts (Thay thế API call bằng dữ liệu giả)
export const getStatistics = async (endpoint: string) => {
	switch (endpoint) {
		case 'dishes/top-selling':
			return {
				data: {
					labels: ['Món 1', 'Món 2', 'Món 3', 'Món 4', 'Món 5'],
					datasets: [
						{
							label: 'Số lượng bán',
							data: [150, 200, 180, 220, 170],
							backgroundColor: '#54C6E8',
						},
					],
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			};
		case 'dishes/ratings':
			return {
				data: {
					labels: ['Khách hàng mới', 'Đã sử dụng', 'Hàng ngày truy cập', 'Truy cập mới'],
					datasets: [
						{
							label: 'Số lượng đánh giá',
							data: [10, 20, 30, 25],
							backgroundColor: ['#545E75', '#E20E02', '#F68A04', '#007AFF'],
						},
					],
				},
				options: {
					responsive: true,
				},
			};
		case 'dishes/revenue':
			return {
				data: {
					labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
					datasets: [
						{
							label: 'Doanh thu (VND)',
							data: [3000000, 3500000, 4000000, 4500000, 5000000, 6000000],
							fill: false,
							backgroundColor: 'rgba(75, 192, 192, 0.6)',
							borderColor: 'rgba(75, 192, 192, 1)',
						},
					],
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			};
		case 'visits':
			return {
				data: {
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
					],
					datasets: [
						{
							label: 'Lượt truy cập',
							data: [1000, 1200, 1300, 900, 1500, 1700, 2000, 2099, 3000, 3100, 0, 0],
							fill: false,
							backgroundColor: '#54C6E8',
							borderColor: 'rgba(54, 162, 235, 1)',
						},
					],
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			};
		case 'interactions':
			return {
				data: {
					labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
					datasets: [
						{
							label: 'Lượt tương tác',
							data: [200, 220, 300, 280, 250, 320],
							fill: false,
							backgroundColor: 'rgba(255, 206, 86, 0.6)',
							borderColor: 'rgba(255, 206, 86, 1)',
						},
					],
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			};
		default:
			return {};
	}
};
