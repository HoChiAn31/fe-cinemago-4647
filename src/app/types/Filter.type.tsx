interface Genre {
	id: string;
	name: string;
}

export interface FilterProps {
	genres: Genre[];
	country: string[];
	rating: number[];
	duration: number[];
	onRatingChange: (value: number[]) => void;
	onDurationChange: (value: number[]) => void;
	onGenresChange: (value: string[]) => void;
	onCountriesChange: (value: string[]) => void;
}
