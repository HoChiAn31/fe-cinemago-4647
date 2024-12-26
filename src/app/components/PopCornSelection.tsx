'use client';

import React, { FC } from 'react';
import { PopCornSelectionProps } from '../types/Beverage.type';
import { useLocale } from 'next-intl';
import Image from './Image';

const PopCornSelection: FC<PopCornSelectionProps> = ({ beverages, foods, setQuantities }) => {
	const locale = useLocale();

	const handleQuantityChange = (
		id: string,
		price: number,
		operation: 'increment' | 'decrement',
	) => {
		setQuantities((prevQuantities) => {
			const updatedQuantities = Array.isArray(prevQuantities) ? [...prevQuantities] : [];

			const existingItem = updatedQuantities.find((item) => item.id === id);

			if (existingItem) {
				const updatedQuantity =
					operation === 'increment'
						? existingItem.quantity + 1
						: Math.max(0, existingItem.quantity - 1);

				if (updatedQuantity === 0) {
					return updatedQuantities.filter((item) => item.id !== id);
				} else {
					return updatedQuantities.map((item) =>
						item.id === id ? { ...item, quantity: updatedQuantity } : item,
					);
				}
			} else if (operation === 'increment') {
				return [...updatedQuantities, { id, quantity: 1, price }];
			}

			return updatedQuantities;
		});
	};

	return (
		<div>
			<div className='grid w-full grid-cols-1 items-center gap-16 sm:grid-cols-2 md:grid-cols-3'>
				{beverages.map((item) => {
					const translation = item.translations.find(
						(t) => t.categoryLanguage.languageCode === locale,
					);
					const foodItem = Array.isArray(foods) ? foods.find((food) => food.id === item.id) : null;
					const quantity = foodItem?.quantity || 0;

					return (
						<div key={item.id} className='item-center flex justify-center'>
							<div className='group flex w-fit items-stretch gap-8 rounded-lg shadow-lg'>
								<Image
									src={item.image}
									alt={translation?.name}
									className='h-32 w-32 rounded border object-cover'
								/>
								<div className='flex flex-col items-start justify-between'>
									<div>
										<h3 className='text-lg font-semibold group-hover:text-primary'>
											{translation?.name}
										</h3>
										<p className='text-gray-500'>{item.price} VND</p>
									</div>
									<div className='flex items-center justify-center gap-5 rounded bg-slate-400'>
										<p
											onClick={() =>
												handleQuantityChange(item.id, parseFloat(item.price), 'decrement')
											}
											className='w-10 rounded py-3 text-center hover:text-primary'
										>
											-
										</p>
										<p className='text-lg'>{quantity}</p>
										<p
											onClick={() =>
												handleQuantityChange(item.id, parseFloat(item.price), 'increment')
											}
											className='w-10 rounded py-3 text-center hover:text-primary'
										>
											+
										</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PopCornSelection;
