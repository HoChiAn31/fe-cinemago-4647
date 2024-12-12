export interface Translation {
	id: string;
	name: string;
	description: string;
	categoryLanguage: {
		id: string;
		languageCode: string;
	};
}
