interface CategoryLanguage {
	languageCode: string;
}

interface MovieGenreTranslation {
	id: string;
	name: string;
	categoryLanguage: CategoryLanguage;
}

export interface Genres {
	id: string;
	movieGenreTranslation: MovieGenreTranslation[];
}
