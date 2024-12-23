// import React, { FC, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// interface SeatMaps {
// 	row: string;
// 	count: number;
// 	type: string;
// 	seatmapid: number;
// }

// interface SeatMapProps {
// 	seatMap: SeatMaps[];
// }

// const socket: Socket = io('http://localhost:5000', {
// 	// withCredentials: true, // Send cookies along with WebSocket connection requests
// });

// const SeatSelection: FC<SeatMapProps> = ({ seatMap }) => {
// 	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
// 	const [bookedSeats, setBookedSeats] = useState<string[]>([]);
// 	const [userSelectedSeats, setUserSelectedSeats] = useState<string[]>([]); // Seats selected by the current user

// 	useEffect(() => {
// 		// Lắng nghe ghế đã được chọn từ server
// 		socket.on('initialSeats', (seats: string[]) => {
// 			setBookedSeats(seats);
// 		});

// 		socket.on('seatSelected', (seatLabel: string) => {
// 			setBookedSeats((prev) => [...prev, seatLabel]);
// 		});

// 		socket.on('seatUnselected', (seatLabel: string) => {
// 			setBookedSeats((prev) => prev.filter((seat) => seat !== seatLabel));
// 		});

// 		socket.on('userSeatSelected', (seatLabel: string) => {
// 			// Track seats selected by other users (User A in this case)
// 			setUserSelectedSeats((prev) => [...prev, seatLabel]);
// 		});

// 		return () => {
// 			socket.off('initialSeats');
// 			socket.off('seatSelected');
// 			socket.off('seatUnselected');
// 			socket.off('userSeatSelected');
// 		};
// 	}, []);

// 	const handleSeatClick = (seatLabel: string) => {
// 		if (bookedSeats.includes(seatLabel)) return; // Ngăn không cho chọn ghế đã đặt

// 		if (selectedSeats.includes(seatLabel)) {
// 			setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
// 			socket.emit('unselectSeat', seatLabel); // Gửi yêu cầu hủy chọn ghế
// 		} else {
// 			setSelectedSeats([...selectedSeats, seatLabel]);
// 			socket.emit('selectSeat', seatLabel); // Gửi yêu cầu chọn ghế
// 		}
// 	};

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
// 							const isUserSelected = userSelectedSeats.includes(seatLabel); // Check if this seat is selected by another user

// 							return (
// 								<button
// 									key={seatLabel}
// 									className={`h-12 w-12 rounded p-2 ${
// 										isBooked
// 											? 'bg-graySeatBlock cursor-not-allowed text-white'
// 											: isUserSelected
// 												? 'bg-yellowSeatPick text-white' // Blue color for seats selected by other users
// 												: isSelected
// 													? 'bg-pinkSeat text-white'
// 													: `${
// 															type === 'vip' ? 'bg-redSeatVip' : 'bg-purpleSeatStandard'
// 														} hover:bg-gray-400`
// 									} transition-colors`}
// 									onClick={() => handleSeatClick(seatLabel)}
// 									disabled={isBooked}
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

// export default SeatSelection;
import React, { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SeatMaps {
	row: string;
	count: number;
	id: number | string | null;
}

interface SeatMapProps {
	seatMap: SeatMaps[];
	selectedSeats: string[]; // Update the interface to include selectedSeats
	setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>; // Add setter for selected seats
}

const socket: Socket = io('http://localhost:5000', {
	// You can add authentication or other options here if needed
});

const SeatSelection: FC<SeatMapProps> = ({ seatMap, selectedSeats, setSelectedSeats }) => {
	const [bookedSeats, setBookedSeats] = useState<string[]>([]); // Seats booked by anyone
	const [userSelectedSeats, setUserSelectedSeats] = useState<Map<string, string[]>>(new Map()); // Track selected seats for other users

	useEffect(() => {
		// Listen to the server for the initial list of booked seats
		socket.on('initialSeats', (seats: string[]) => {
			setBookedSeats(seats);
		});

		// Update the list of booked seats when someone selects a seat
		socket.on('seatSelected', ({ seatLabel, userId }: { seatLabel: string; userId: string }) => {
			// Store the seat selection for other users
			setUserSelectedSeats((prev) => {
				const newUserSelections = new Map(prev);
				if (!newUserSelections.has(userId)) {
					newUserSelections.set(userId, []);
				}
				newUserSelections.get(userId)?.push(seatLabel);
				return newUserSelections;
			});
		});

		// Remove the seat from booked seats when someone unselects it
		socket.on('seatUnselected', ({ seatLabel, userId }: { seatLabel: string; userId: string }) => {
			setUserSelectedSeats((prev) => {
				const newUserSelections = new Map(prev);
				if (newUserSelections.has(userId)) {
					const updatedSeats =
						newUserSelections.get(userId)?.filter((seat) => seat !== seatLabel) || [];
					newUserSelections.set(userId, updatedSeats);
				}
				return newUserSelections;
			});
		});

		// Cleanup listeners when component unmounts
		return () => {
			socket.off('initialSeats');
			socket.off('seatSelected');
			socket.off('seatUnselected');
		};
	}, []);

	const handleSeatClick = (seatLabel: string) => {
		// Prevent selecting already booked seats
		if (bookedSeats.includes(seatLabel)) return;

		if (selectedSeats.includes(seatLabel)) {
			// Unselect the seat and notify the server
			setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
			socket.emit('unselectSeat', seatLabel);
		} else {
			// Select the seat and notify the server
			setSelectedSeats([...selectedSeats, seatLabel]);
			socket.emit('selectSeat', seatLabel);
		}
	};

	return (
		<div className='p-4'>
			{seatMap.map(({ row, count }) => (
				<div key={row} className='mb-4 flex items-center justify-center gap-2'>
					<p className='mb-2 text-lg font-bold'>{row}</p>
					<div className='flex items-center gap-4'>
						{Array.from({ length: count }).map((_, index) => {
							const seatLabel = `${row}${index + 1}`;
							const isSelected = selectedSeats.includes(seatLabel);
							const isBooked = bookedSeats.includes(seatLabel);
							const isUserSelected = Array.from(userSelectedSeats.values()).some((seats) =>
								seats.includes(seatLabel),
							);

							return (
								<button
									key={seatLabel}
									className={`h-12 w-12 rounded p-2 ${
										isBooked
											? 'cursor-not-allowed bg-graySeatBlock text-white' // Seat is booked, cannot be selected
											: isSelected
												? 'bg-pinkSeat text-white' // Pink for the current user's selection
												: isUserSelected
													? 'bg-yellowSeatPick text-white' // Yellow for other users' selections (non-clickable)
													: `hover:bg-gray-400`
									} transition-colors`}
									onClick={() => {
										// Only allow the user to select/unselect their own seat (no action for yellow seats)
										if (!isUserSelected || isSelected) {
											// Allow user to click their own pink seat to unselect
											handleSeatClick(seatLabel);
										}
									}}
									disabled={isUserSelected && !isSelected} // Disable the seat if it's selected by another user, but allow unselect for the current user
								>
									{seatLabel}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

export default SeatSelection;
