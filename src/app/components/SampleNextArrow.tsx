import { ArrowLeft } from './icon';

interface SampleNextArrowProps {
	className?: string;
	onClick?: () => void;
}

const SampleNextArrow = (props: SampleNextArrowProps) => {
	const { className, onClick } = props;
	return (
		<div
			className={`absolute -right-12 top-1/2 z-[40] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-white ${className}`}
			onClick={onClick}
		>
			<ArrowLeft className='rotate-180' />
		</div>
	);
};

export default SampleNextArrow;
