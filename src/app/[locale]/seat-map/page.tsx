'use client';

import React, { FC } from 'react';

// Usage
// const seatMapData = [
// 	{ row: 'A', count: 10, type: 'standard', seatmapid: 1 },
// 	{ row: 'B', count: 10, type: 'standard', seatmapid: 1 },
// 	{ row: 'C', count: 10, type: 'vip', seatmapid: 1 },
// 	{ row: 'D', count: 10, type: 'standard', seatmapid: 1 },
// 	{ row: 'E', count: 10, type: 'standard', seatmapid: 1 },
// ];

const App: FC = () => {
	return (
		<div className='container mx-auto my-5 flex flex-col items-center justify-center'>
			<div className='my-2 w-1/2 border-t-4'></div>
			<h3 className='text-center text-2xl'>Màn hình</h3>
			{/* <div>
				<SeatSelection seatMap={seatMapData} />
			</div> */}
			<div className='flex flex-wrap gap-6'>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 rounded bg-graySeatBlock'></div>
					<p>Đã đặt</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 rounded bg-pinkSeat'></div>
					<p>Ghế bạn chọn</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 rounded bg-purpleSeatStandard'></div>
					<p>Ghế thường</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 rounded bg-redSeatVip'></div>
					<p>Ghế Vip</p>
				</div>
				<div className='flex items-center gap-2'>
					<div className='h-8 w-8 rounded bg-yellowSeatPick'></div>
					<p>Ghế đã được chọn</p>
				</div>
			</div>
		</div>
	);
};

export default App;
