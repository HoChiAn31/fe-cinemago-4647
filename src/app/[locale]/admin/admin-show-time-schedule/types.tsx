export interface ShowTime {
	id: string;
	show_time_start: string;
	show_time_end: string;
	movie: {
		id: string;
		translations: {
			name: string;
			categoryLanguage: {
				languageCode: string;
			};
		}[];
	};
	createdAt: string;
	updatedAt: string;
}

export interface ShowTimeUpdate {
	id: string;
	show_time_start: string;
	show_time_end: string;
}
