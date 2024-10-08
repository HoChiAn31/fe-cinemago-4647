import { Radar } from 'react-chartjs-2';

interface RadarChartProps {
	data: any;
	options: any;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, options }) => {
	return <Radar data={data} options={options} />;
};

export default RadarChart;
