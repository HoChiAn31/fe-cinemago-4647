import React from 'react';
import { Scatter } from 'react-chartjs-2';

interface ScatterChartProps {
	data: any;
	options: any;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data, options }) => {
	return <Scatter data={data} options={options} />;
};

export default ScatterChart;
