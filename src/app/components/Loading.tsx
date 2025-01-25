import { Spinner } from '@nextui-org/react';

const Loading = () => {
	return (
		<div className='flex items-center justify-center'>
			<Spinner label='Loading...' />
		</div>
	);
};

export default Loading;
