import React from 'react'; // {{ edit_1 }}
import { ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<div className='fixed bottom-4 right-4'>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className='flex items-center justify-center rounded-full bg-primary p-2 text-white shadow-lg hover:opacity-80 focus:outline-none'
				>
					<ChevronUp />
				</button>
			)}
		</div>
	);
};

export default ScrollToTop;
