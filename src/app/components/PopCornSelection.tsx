'use client';

import React, { FC } from 'react';
import { PopCornSelectionProps } from '../types/Beverage.type';
import { useLocale } from 'next-intl';
import Image from './Image';

const PopCornSelection: FC<PopCornSelectionProps> = ({ beverages, foods, setQuantities }) => {
	const locale = useLocale();

	const handleQuantityChange = (
		foodDrinksId: string,
		price: number,
		operation: 'increment' | 'decrement',
	) => {
		setQuantities((prevQuantities) => {
			const updatedQuantities = Array.isArray(prevQuantities) ? [...prevQuantities] : [];

			const existingItem = updatedQuantities.find((item) => item.foodDrinksId === foodDrinksId);

			if (existingItem) {
				const updatedQuantity =
					operation === 'increment'
						? existingItem.quantity + 1
						: Math.max(0, existingItem.quantity - 1);

				if (updatedQuantity === 0) {
					return updatedQuantities.filter((item) => item.foodDrinksId !== foodDrinksId);
				} else {
					return updatedQuantities.map((item) =>
						item.foodDrinksId === foodDrinksId ? { ...item, quantity: updatedQuantity } : item,
					);
				}
			} else if (operation === 'increment') {
				return [...updatedQuantities, { foodDrinksId, quantity: 1, price }];
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
					const foodItem = Array.isArray(foods)
						? foods.find((food) => food.foodDrinksId === item.id)
						: null;
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
									<div className='flex flex-col gap-2'>
										<h3 className='text-lg font-semibold group-hover:text-primary'>
											{translation?.name}
										</h3>
										<p className='text-gray-500'>{translation?.description}</p>
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
