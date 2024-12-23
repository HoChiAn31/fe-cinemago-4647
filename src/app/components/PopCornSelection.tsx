'use client';

import React, { FC, useState } from 'react';
import { PopCornSelectionProps } from '../types/Beverage.type';
import { useLocale } from 'next-intl';
import Image from './Image';

const PopCornSelection: FC<PopCornSelectionProps> = ({ beverages, quantities, setQuantities }) => {
	const locale = useLocale();

	const handleQuantityChange = (id: string, operation: 'increment' | 'decrement') => {
		setQuantities((prevQuantities: { [key: string]: number }) => {
			const currentQuantity = prevQuantities[id] || 0;
			const updatedQuantity =
				operation === 'increment' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);

			return {
				...prevQuantities,
				[id]: updatedQuantity,
			};
		});
	};

	return (
		<div>
			<div className='grid w-full grid-cols-1 items-center gap-16 sm:grid-cols-2 md:grid-cols-3'>
				{beverages.map((item) => {
					const translation = item.translations.find(
						(t) => t.categoryLanguage.languageCode === locale,
					);
					const quantity = quantities[item.id] || 0;

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
											onClick={() => handleQuantityChange(item.id, 'decrement')}
											className='w-10 rounded py-3 text-center hover:text-primary'
										>
											-
										</p>
										<p className='text-lg'>{quantity}</p>
										<p
											onClick={() => handleQuantityChange(item.id, 'increment')}
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
