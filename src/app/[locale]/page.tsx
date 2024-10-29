'use client';
import { FC } from 'react';
import MaxWidth from '../components/MaxWidth';
import Banner from '../components/Banner';
import OnGoing from '../components/OnGoing';
import UpComing from '../components/UpComing';

const HomePage: FC = () => {
	return (
		<MaxWidth>
			<div className='mb-8'>
				<Banner />
				<OnGoing />
				<UpComing />
			</div>
		</MaxWidth>
	);
};

export default HomePage;
