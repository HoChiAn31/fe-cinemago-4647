// components/BarChart.tsx
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ChartConfiguration } from 'chart.js/auto';

interface BarChartProps {
	config: ChartConfiguration;
}

const BarCharts = ({ config }: BarChartProps) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstanceRef = useRef<ChartJS | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			// Hủy biểu đồ cũ nếu đã tồn tại
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			// Tạo biểu đồ mới
			chartInstanceRef.current = new ChartJS(chartRef.current, config);
		}

		// Cleanup: Hủy biểu đồ khi component unmount
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [config]);

	return <canvas ref={chartRef} />;
};

export default BarCharts;
