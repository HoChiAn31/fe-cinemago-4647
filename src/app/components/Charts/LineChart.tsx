import { Line } from 'react-chartjs-2';

interface LineChartProps {
	data: any;
	options: any;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
	return <Line data={data} options={options} />;
};

export default LineChart;
