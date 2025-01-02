export interface Order {
	id: string;
	totalTickets: number;
	totalAmount: number;
	createdAt: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	bookingDetails: {
		id: string;
		seatNumber: string[];
		tickets: {
			id: string;
			ticketType: string;
			quantity: number;
			ticketPrice: number;
		}[];
		foodDrinks: {
			id: string;
			quantity: number;
			price: number;
			foodDrinks: {
				id: string;
				translations: {
					name: string;
					categoryLanguage: {
						languageCode: string;
					};
				}[];
			};
		}[];
	};
	movie: {
		id: string;
		director: string;
		poster_url: string;
		trailer_url: string;
		translations: {
			name: string;
			categoryLanguage: {
				languageCode: string;
			};
		}[];
	};
	payment: {
		id: string;
		paymentMethod: string;
		paymentStatus: string;
		paymentAmount: string;
		createdAt: string;
		updatedAt: string;
	};
	showTimes: {
		id: string;
		show_time_start: string;
		show_time_end: string;
		room: {
			id: string;
			name: string;
			branch: {
				id: string;
				translations: {
					id: string;
					languageCode: string;
					name: string;
					address: string;
				}[];
			};
		};
	};
}
