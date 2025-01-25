import React from 'react';
import { ArrowLeft } from './icon';

interface SampleNextArrowProps {
	className?: string;
	onClick?: () => void;
}

const SampleNextArrow = (props: SampleNextArrowProps) => {
	const { className, onClick } = props;
	return (
		<div
			className={`absolute -right-12 top-1/2 z-[40] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${className}`}
			onClick={onClick}
		>
			<ArrowLeft className='rotate-180' />
		</div>
	);
};

export default SampleNextArrow;
