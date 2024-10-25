export interface MovieProps {
	movie: {
		image: string;
		title: string;
		tags: string[];
		rating: string;
		url: string;
		releaseDate?: string;
		onGoing: boolean;
	};
}
