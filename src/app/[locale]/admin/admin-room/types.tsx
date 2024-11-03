export interface Room {
	id: string;
	name: string;
	screeningType: string;
	totalSeats: number;
	branch: {
		id: string;
		phone: string;
		translations: {
			id: string;
			languageCode: string;
			name: string;
		}[];
	};
}
export interface RoomAdd {
	name: string;
	screeningType: string;
	totalSeats: number;
	branch: string;
}

export interface RoomEdit {
	name: string;
	screeningType: string;
	totalSeats: number;
	branch: string;
}
