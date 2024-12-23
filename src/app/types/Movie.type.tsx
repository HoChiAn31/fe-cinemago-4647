import { Translation } from './Translation.type';
import { Genres } from './Genres.type';

export interface MovieProps {
	movie: {
		id: string;
		director: string;
		cast: string;
		releaseDate: string;
		duration: number;
		language: string;
		country: string;
		rating: number;
		poster_url: string;
		trailer_url: string;
		genres: Genres[];
		translations: Translation[];
	};
}
