import React from 'react';
import { Doughnut as ChartDoughnut } from 'react-chartjs-2';

interface DoughnutProps {
	data: any;
	options: any;
}

const Doughnut: React.FC<DoughnutProps> = ({ data, options }) => {
	return <ChartDoughnut data={data} options={options} />;
};

export default Doughnut;
