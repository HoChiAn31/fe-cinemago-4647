'use client';
import SeatSelection from '@/app/components/SeatSelection';
import { Button } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react';

// interface seatMaps {
// 	row: string;
// 	count: number;
// 	type: string;
// 	seatmapid: number;
// }

// interface seatMapProps {
// 	seatMap: seatMaps[];
// }

// const SeatSelection: FC<seatMapProps> = ({ seatMap }) => {
// 	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
// 	const [bookedSeats, setBookedSeats] = useState<string[]>([]);

// 	useEffect(() => {
// 		setBookedSeats(['A1', 'B2', 'C5', 'C6', 'C7', 'D8', 'E10']);
// 	}, []);
// 	const handleSeatClick = (seatLabel: string) => {
// 		if (selectedSeats.includes(seatLabel)) {
// 			setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
// 		} else {
// 			setSelectedSeats([...selectedSeats, seatLabel]);
// 		}
// 	};
// 	console.log(selectedSeats);
// 	return (
// 		<div className='p-4'>
// 			{seatMap.map(({ row, count, type }) => (
// 				<div key={row} className='mb-4 flex items-center justify-center gap-2'>
// 					<p className='mb-2 text-lg font-bold'>{row}</p>
// 					<div className='flex items-center gap-4'>
// 						{Array.from({ length: count }).map((_, index) => {
// 							const seatLabel = `${row}${index + 1}`;
// 							const isSelected = selectedSeats.includes(seatLabel);
// 							const isBooked = bookedSeats.includes(seatLabel);

// 							return (
// 								<button
// 									key={seatLabel}
// 									className={`h-12 w-12 rounded p-2 ${
// 										isBooked
// 											? 'bg-graySeatBlock cursor-not-allowed text-white' // Booked seat style
// 											: isSelected
// 												? 'bg-pinkSeat text-white'
// 												: `${type === 'vip' ? 'bg-redSeatVip' : 'bg-purpleSeatStandard'} hover:bg-gray-400`
// 									} transition-colors`}
// 									onClick={() => handleSeatClick(seatLabel)}
// 									disabled={isBooked} // Disable interaction for booked seats
// 								>
// 									{seatLabel}
// 								</button>
// 							);
// 						})}
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// Usage
const seatMapData = [
	{ row: 'A', count: 10, type: 'standard', seatmapid: 1 },
	{ row: 'B', count: 10, type: 'standard', seatmapid: 1 },
	{ row: 'C', count: 10, type: 'vip', seatmapid: 1 },
	{ row: 'D', count: 10, type: 'standard', seatmapid: 1 },
	{ row: 'E', count: 10, type: 'standard', seatmapid: 1 },
];

const App: FC = () => {
	return (
		<div className='container mx-auto my-5 flex flex-col items-center justify-center'>
			<div className='my-2 w-1/2 border-t-4'></div>
			<h3 className='text-center text-2xl'>Màn hình</h3>
			<div>
				<SeatSelection seatMap={seatMapData} />
			</div>
			<div className='flex flex-wrap gap-6'>
				<div className='flex items-center gap-2'>
					<div className='bg-graySeatBlock h-8 w-8 rounded'></div>
					<p>Đã đặt</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='bg-pinkSeat h-8 w-8 rounded'></div>
					<p>Ghế bạn chọn</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='bg-purpleSeatStandard h-8 w-8 rounded'></div>
					<p>Ghế thường</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='bg-redSeatVip h-8 w-8 rounded'></div>
					<p>Ghế Vip</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='bg-yellowSeatPick h-8 w-8 rounded'></div>
					<p>Ghế đã được chọn</p>
				</div>
			</div>
		</div>
	);
};

export default App;
