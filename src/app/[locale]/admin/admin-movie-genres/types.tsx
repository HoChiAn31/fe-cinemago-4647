export interface MovieGenre {
	id: string;

	numberCategory: number;

	movieGenreTranslation: {
		id: string;
		name: string;
		description: string;
		categoryLanguage: {
			id: string;
			languageCode: string;
		};
	}[];
}

export interface MovieGenreAdd {
	numberCategory: number;

	movieGenreTranslation: {
		name: string;
		description: string;
		categoryLanguageId: string;
	}[];
}
