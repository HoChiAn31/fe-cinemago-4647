import { Translation } from './Translation.type';
import { Comment } from './Comment.type';
import { Genres } from './Genres.type';
import { Showtime } from './Showtime.type';

export interface MovieData {
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
	createdAt: string;
	updatedAt: string;
	genres: Genres[];
	showTimes: Showtime[];
	translations: Translation[];
	comments: Comment[];
}
