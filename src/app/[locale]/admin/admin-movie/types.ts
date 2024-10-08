export interface Movie {
	id: string;
	cast: string;
	director: string;
	releaseDate: number;
	duration: string;
	language: string;
	country: string;
	rating: string;
	poster_url: string;
	trailer_url: string;
	createdAt: Date;
	updatedAt: Date;
	translations: [
		{
			id: string;
			name: string;
			description: string;
			categoryLanguage: {
				id: string;
				languageCode: string;
			};
		},
	];
	genres: [
		{
			id: string;
			name: string;
			description: string;
			categoryLanguage: {
				id: string;
				languageCode: string;
			};
		},
	];
}

export interface MovieData {
	director: string;
	cast: string;
	releaseDate: string;
	duration: number;
	language: string;
	country: string;
	rating: number;
	poster_url: string;
	trailer_url: string;
	is_showing: boolean;
	translations: Translation[];
	genres: Genre[];
}

export interface Translation {
	categoryLanguageId: string;
	name: string;
	description: string;
}

export interface Genre {
	id: string;
	name: string;
}

export interface Movies {
	id: string;
	cast: string;
	director: string;
	releaseDate: number;
	duration: string;
	language: string;
	country: string;
	rating: string;
	poster_url: string;
	trailer_url: string;
	createdAt: Date;
	updatedAt: Date;
	translations: Array<{
		id: string;
		name: string;
		description: string;
		categoryLanguage: { id: string; languageCode: string };
	}>;
	genres: [
		{
			id: string;
			name: string;
			description: string;
			categoryLanguage: {
				id: string;
				languageCode: string;
			};
		},
	];
}
