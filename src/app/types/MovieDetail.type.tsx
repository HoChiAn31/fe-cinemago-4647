import { Translation } from './Translation.type';
import { Comment } from './Comment.type';

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
	translations: Translation[];
	comment: Comment[];
}
