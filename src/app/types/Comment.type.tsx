import { User } from './User.type';

export interface Comment {
	id: string;
	rating: number;
	comment: string;
	createdAt: string;
	user: User;
}
