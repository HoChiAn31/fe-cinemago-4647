export interface SliderProps {
	images?: string[];
	titles?: string[];
	showNavigation?: boolean;
	children?: React.ReactNode;
	itemsPerPage?: number;
	autoSlideInterval?: number;
}
