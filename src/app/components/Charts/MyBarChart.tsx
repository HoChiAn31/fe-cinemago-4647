// components/MyBarChart.tsx
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyBarChart = () => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstanceRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			// Hủy biểu đồ cũ nếu đã tồn tại
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			// Tạo biểu đồ mới và lưu tham chiếu
			chartInstanceRef.current = new Chart(chartRef.current, {
				type: 'bar',
				data: {
					labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
					datasets: [
						{
							label: '# of Votes',
							data: [12, 19, 3, 5, 2, 3],
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
				},
			});
		}

		// Cleanup: Hủy biểu đồ khi component unmount
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, []);

	return <canvas ref={chartRef} />;
};

export default MyBarChart;
