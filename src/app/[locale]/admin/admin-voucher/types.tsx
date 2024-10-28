export interface Voucher {
	id: string;
	discountType: string;
	discountValue: string;
	startDate: Date;
	endDate: Date;
	minimumPurchase: number;
	applicableMovies: object;
	usageLimit: number;
	usageCount: number;
	isActive: boolean;
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

export interface VoucherAdd {
	discountType: string;
	discountValue: string;
	startDate: Date;
	endDate: Date;
	minimumPurchase: number;
	applicableMovies: {
		movieIds: [];
	};
	usageLimit: number;
	usageCount: number;
	isActive: boolean;
	translations: {
		categoryLanguageId: string;
		name: string;
		description: string;
	}[];
}
