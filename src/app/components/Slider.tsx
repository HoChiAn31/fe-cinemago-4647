import React, { useState } from 'react';
import Image from './Image';
import { useTheme } from '../context/ThemeContext';

interface SliderProps {
	images?: string[];
	titles?: string[];
	showNavigation?: boolean;
	children?: React.ReactNode;
	itemsPerPage?: number;
}

const Slider: React.FC<SliderProps> = ({ images, titles, showNavigation = true, children }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = children ? React.Children.toArray(children) : images || [];
	const { isDarkMode } = useTheme();

	const prevSlide = () => {
		setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : slides.length - 1);
	};

	const nextSlide = () => {
		setCurrentIndex(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
	};

	return (
		<div className='container relative mx-auto w-full'>
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
					<button
						onClick={prevSlide}
						className={`hover:hover-color absolute left-[-50px] top-1/2 -translate-y-1/2 transform p-2 text-4xl hover:text-primary ${isDarkMode ? 'text-white' : 'text-black'}`}
					>
						&lt;
					</button>
					<button
						onClick={nextSlide}
						className={`hover:hover-color absolute right-[-50px] top-1/2 -translate-y-1/2 transform p-2 text-4xl hover:text-primary ${isDarkMode ? 'text-white' : 'text-black'}`}
					>
						&gt;
					</button>
				</>
			)}
		</div>
	);
};

export default Slider;
