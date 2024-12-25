export interface BeverageProps {
	id: string;
	price: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	translations: Translation[];
}

interface Translation {
	id: string;
	name: string;
	description: string;
	categoryLanguage: CategoryLanguage;
}

interface CategoryLanguage {
	id: string;
	languageCode: string;
}

export interface PopCornSelectionProps {
	beverages: BeverageProps[];
	foods: { id: string; quantity: number; price: number }[];
	setQuantities: React.Dispatch<
		React.SetStateAction<{ id: string; quantity: number; price: number }[]>
	>;
}
