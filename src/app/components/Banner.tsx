'use client';

import React, { useEffect, useState } from 'react';
import Slider from './Slider';

const Banner: React.FC = () => {
	const imageData = [
		{ url: '/images/banners/bap-nuoc-onl.webp' },
		{ url: '/images/banners/bay.webp' },
		{ url: '/images/banners/chang-nu-phi-cong.webp' },
		{ url: '/images/banners/da-nu-bao-thu-homepage.png' },
		{ url: '/images/banners/hai-muoi-web-banner.webp' },
		{ url: '/images/banners/ma-da-sneakshow.jpeg' },
		{ url: '/images/banners/shin.webp' },
	];

	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		const imageUrls = imageData.map((item) => item.url);
		setImages(imageUrls);
	}, []);

	return (
		<div className='pt-5'>
			<Slider images={images} autoSlideInterval={3000} />
		</div>
	);
};

export default Banner;
