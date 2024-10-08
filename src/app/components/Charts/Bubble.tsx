import { Bubble } from 'react-chartjs-2';

interface BubbleChartProps {
	data: any;
	options: any;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data, options }) => {
	return <Bubble data={data} options={options} />;
};

export default BubbleChart;
