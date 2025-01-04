interface BranchTranslation {
	id: string;
	languageCode: string;
	name: string;
	address: string;
	categoryLanguage: {
		id: string;
	} | null;
}

interface Branch {
	id: string;
	email: string;
	translations: BranchTranslation[];
}

interface SeatMap {
	id: string;
	row: string;
	count: number;
}
interface Room {
	id: string;
	name: string;
	screeningType: string;
	totalSeats: number;
	branch: Branch;
	seatMaps: SeatMap[] | [];
}

export interface Showtime {
	id: string;
	show_time_start: string;
	show_time_end: string;
	price: number;
	room: Room;
}

export interface Showtimes {
	id: string;
	show_time_start: string;
	show_time_end: string;
	price?: number;
	room: Room;
}
