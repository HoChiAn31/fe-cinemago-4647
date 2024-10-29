import { Spinner } from '@nextui-org/react';
import { FC } from 'react';

const Loading: FC<{}> = ({}) => {
	return (
		<div className='flex items-center justify-center'>
			<Spinner label='Loading...' />
		</div>
	);
};

export default Loading;
