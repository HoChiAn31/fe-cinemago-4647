import React from 'react';
import Links from '../Links';
import { useTheme } from '@/app/context/ThemeContext';

interface LinkUserProps {
	href: string;
	className?: string;
	children: React.ReactNode;
	isNotBorderBottom?: boolean;
	isActive?: boolean;
}

const LinkUser: React.FC<LinkUserProps> = ({
	href,
	className = '',
	children,
	isNotBorderBottom,
	isActive,
}) => {
	const { isDarkMode } = useTheme();
	console.log(isActive);
	return (
		<Links
			href={href}
			className={`w-[200px] bg-transparent py-3 text-base hover:text-primary ${isNotBorderBottom ? '' : 'border-b'} ${isDarkMode ? (isActive ? 'text-primary' : 'text-white') : isActive ? 'text-primary' : 'text-black'} ${className}`}
		>
			{children}
		</Links>
	);
};

export default LinkUser;
