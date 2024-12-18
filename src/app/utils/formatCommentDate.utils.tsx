export const formatCommentDate = (createdAt: string, locale: string, t: Function) => {
	const createdDate = new Date(createdAt);
	const now = new Date();

	createdDate.setHours(0, 0, 0, 0);
	now.setHours(0, 0, 0, 0);

	const diffTime = now.getTime() - createdDate.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return t('labels.today');
	}

	if (diffDays <= 14) {
		return `${diffDays} ${t('labels.dayAgo')}`;
	} else {
		return createdDate.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		});
	}
};
