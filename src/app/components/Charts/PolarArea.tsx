import { PolarArea } from 'react-chartjs-2';

interface PolarAreaChartProps {
	data: any;
	options: any;
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, options }) => {
	return <PolarArea data={data} options={options} />;
};

export default PolarAreaChart;
