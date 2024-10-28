export interface FoodDrink {
	id: string;
	price: string;
	image: string;
	translations: {
		id: string;
		name: string;
		description: string;
		categoryLanguage: {
			id: string;
			languageCode: string;
		};
	}[];
}

export interface FoodDrinkAdd {
	price: string;
	image: File | string;
	translations: {
		categoryLanguageId: string;
		name: string;
		description: string;
	}[];
}
