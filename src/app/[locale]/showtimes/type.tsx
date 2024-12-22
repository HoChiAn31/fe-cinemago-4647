export interface Movie {
	id: string;
	director: string;
	releaseDate: string;
	duration: number;
	language: string;
	country: string;
	poster_url: string;
	createdAt: string;
	translations: Translation[];
	genres: Genre[];
	showTimes: ShowTime[];
}

interface Translation {
	id: string;
	name: string;
	categoryLanguage: CategoryLanguage;
}

interface CategoryLanguage {
	languageCode: string;
}

interface Genre {
	id: string;
	movieGenreTranslation: MovieGenreTranslation[];
}

interface MovieGenreTranslation {
	id: string;
	name: string;
	categoryLanguage: CategoryLanguage;
}

interface ShowTime {
	id: string;
	show_time_start: string;
	show_time_end: string;
	room: Room;
}

interface Room {
	id: string;
	name: string;
	branch: Branch;
}

interface Branch {
	id: string;
	translations: BranchTranslation[];
}

interface BranchTranslation {
	id: string;
	languageCode: string;
	name: string;
	address: string;
}
