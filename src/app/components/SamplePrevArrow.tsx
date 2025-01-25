import { ArrowLeft } from './icon';
import React from 'react';
interface SamplePrevArrowProps {
	className?: string;
	onClick?: () => void;
}
const SamplePrevArrow = (props: SamplePrevArrowProps) => {
	const { className, onClick } = props;

	return (
		<div
			className={`absolute -left-12 top-1/2 z-[40] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${className}`}
			onClick={onClick}
		>
			<ArrowLeft />
		</div>
	);
};

export default SamplePrevArrow;
