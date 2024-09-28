'use client';
import { FC } from 'react';
import Link, { LinkProps } from 'next/link';
import { useLocale } from 'next-intl';

interface LinksProps extends LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	hover?: string;
}

const Links: FC<LinksProps> = ({ href, hover, className, children, ...props }) => {
	const locale = useLocale();

	// Ensure the path is correctly formatted, avoiding double slashes
	const localizedHref = `/${locale}/${href}`;

	return (
		<Link
			href={localizedHref}
			{...props}
			className={`${hover ? `hover:text-${hover}` : ''} ${className} `}
		>
			{children}
		</Link>
	);
};

export default Links;
