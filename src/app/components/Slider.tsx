import React, { useEffect, useRef, useState } from 'react';
import Image from './Image';
import SampleNextArrow from './SampleNextArrow';
import SamplePrevArrow from './SamplePrevArrow';
import { SliderProps } from '../types/Slider.type';

const Slider: React.FC<SliderProps> = ({
	images,
	titles,
	showNavigation = true,
	children,
	autoSlideInterval = 0,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = children ? React.Children.toArray(children) : images || [];
	const sliderRef = useRef<HTMLDivElement>(null);
	const [startX, setStartX] = useState(0);
	const [isSwiping, setIsSwiping] = useState(false);

	const prevSlide = () => {
		setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : slides.length - 1);
	};

	const nextSlide = () => {
		setCurrentIndex(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
	};

	useEffect(() => {
		if (autoSlideInterval > 0) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
			}, autoSlideInterval);
			return () => clearInterval(interval);
		}
	}, [autoSlideInterval, slides.length]);

	// Swipe handlers
	const handleTouchStart = (e: React.TouchEvent) => {
		setStartX(e.touches[0].clientX);
		setIsSwiping(true);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isSwiping) return;
		const touchX = e.touches[0].clientX;
		const diff = startX - touchX;

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
			setIsSwiping(false);
		}
	};

	const handleTouchEnd = () => {
		setIsSwiping(false);
	};

	return (
		<div
			className='container relative mx-auto w-full px-5 lg:px-0'
			ref={sliderRef}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className='relative overflow-hidden'>
				<div
					className='flex transition-transform duration-500'
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{slides.map((slide, index) => (
						<div key={index} className='w-full flex-shrink-0'>
							{children ? (
								slide
							) : (
								<>
									<Image
										src={slide as string}
										alt={`Slide ${index + 1}`}
										className='h-auto w-full rounded-lg object-cover'
									/>
									{titles && (
										<div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center text-white'>
											{titles[index]}
										</div>
									)}
								</>
							)}
						</div>
					))}
				</div>
			</div>
			{showNavigation && (
				<>
					<SamplePrevArrow onClick={prevSlide} />
					<SampleNextArrow onClick={nextSlide} />
				</>
			)}
		</div>
	);
};

export default Slider;
