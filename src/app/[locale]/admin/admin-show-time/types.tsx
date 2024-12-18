export interface ShowTime {
	id: string;
	show_time_start: string;
	show_time_end: string;
	price: number;
	room: {
		id: string;
		name: string;
	};
	movie: {
		id: string;
		translations: {
			name: string;
			categoryLanguage: {
				languageCode: string;
			};
		}[];
	};
	created_at: string;
	updated_at: string;
}
