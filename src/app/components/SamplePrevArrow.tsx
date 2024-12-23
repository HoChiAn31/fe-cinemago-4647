import { ArrowLeft } from './icon';

interface SamplePrevArrowProps {
	className?: string;
	onClick?: () => void;
}
const SamplePrevArrow = (props: SamplePrevArrowProps) => {
	const { className, onClick } = props;

	return (
		<div
			className={`absolute -left-12 top-1/2 z-[40] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-white ${className}`}
			onClick={onClick}
		>
			<ArrowLeft />
		</div>
	);
};

export default SamplePrevArrow;
