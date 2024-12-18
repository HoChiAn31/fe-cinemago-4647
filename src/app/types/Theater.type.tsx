export interface Translation {
	id?: string;
	name?: string;
	address?: string;
	description?: string;
	languageCode?: string;
}

export interface Theater {
	id?: string;
	email?: string;
	phone?: string;
	image?: string;
	createdAt?: string;
	updatedAt?: string;
	translations?: Translation[];
}
