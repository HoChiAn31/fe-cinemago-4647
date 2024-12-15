'use client';
import { FC } from 'react';
import MaxWidth from '../components/MaxWidth';
import Banner from '../components/Banner';
import OnGoing from '../components/OnGoing';
import UpComing from '../components/UpComing';
import TrailerModal from '../components/TrailerModal';

const HomePage: FC = () => {
	return (
		<MaxWidth>
			<div className='mb-8'>
				<Banner />
				<OnGoing />
				<UpComing />
				<TrailerModal />
			</div>
		</MaxWidth>
	);
};

export default HomePage;
