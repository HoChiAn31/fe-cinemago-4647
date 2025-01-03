export const generateDates = (
	locale: string,
): { date: string; weekday: string; fullDate: string }[] => {
	const today = new Date();
	const dates = [];

	for (let i = 0; i < 7; i++) {
		const futureDate = new Date(today);
		futureDate.setDate(today.getDate() + i);

		const date = futureDate.toLocaleDateString(locale, {
			month: '2-digit',
			day: '2-digit',
		});

		const weekday = futureDate.toLocaleDateString(locale, { weekday: 'long' });

		const fullDate = futureDate.toLocaleDateString(locale, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});

		dates.push({ date, weekday, fullDate });
	}

	return dates;
};
