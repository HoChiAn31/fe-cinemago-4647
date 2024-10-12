export interface Branch {
	id: string;
	email: string;
	phone: string;
	translations: {
		id: string;
		languageCode: string;
		name: string;
		address: string;
		description: string;
	}[];
}

export interface BranchAdd {
	email: string;
	phone: string;
	translations: {
		languageCode: string;
		name: string;
		address: string;
		description: string;
	}[];
}
