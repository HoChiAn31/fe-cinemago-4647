interface BranchTranslation {
	id: string;
	languageCode: string;
	name: string;
	address: string;
	categoryLanguage: {
		id: string;
	};
}

interface Branch {
	id: string;
	email: string;
	translations: BranchTranslation[];
}

interface Room {
	id: string;
	name: string;
	screeningType: string;
	totalSeats: number;
	branch: Branch;
	seatMaps: {
		id: string;
		row: string;
		count: number;
	}[];
}

export interface Showtime {
	id: string;
	show_time_start: string;
	show_time_end: string;
	price: number;
	room: Room;
}
