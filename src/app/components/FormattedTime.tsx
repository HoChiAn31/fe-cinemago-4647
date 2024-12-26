import React from 'react';

interface FormattedTimeProps {
	isoString: string; // Chuỗi thời gian ISO
	format?: 'time' | 'datetime'; // Loại định dạng: chỉ giờ hoặc ngày và giờ
}

const FormattedTime: React.FC<FormattedTimeProps> = ({ isoString, format = 'time' }) => {
	const formatDateTime = (isoString: string): string => {
		const options: Intl.DateTimeFormatOptions = {
			timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ Việt Nam
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		};

		if (format === 'datetime') {
			options.day = '2-digit';
			options.month = '2-digit';
			options.year = 'numeric';
		}

		return new Date(isoString).toLocaleString('vi-VN', options);
	};

	return <span>{formatDateTime(isoString)}</span>;
};

export default FormattedTime;
