import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface NavItemProps {
	type: 'sortingfilter' | 'navHeader';
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
	href?: string;
	isActive?: boolean;
	label?: string;
	onClick?: React.MouseEventHandler<HTMLParagraphElement>;
	className?: string;
}

const sizeClassMap = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
};

const NavItem: React.FC<NavItemProps> = ({
	href,
	isActive,
	label,
	type,
	onClick,
	size = 'base',
	className,
}) => {
	const sizeClass = sizeClassMap[size];
	const locale = useLocale();
	const localizedHref = `/${locale}/${href}`;
	return (
		<>
			{type === 'sortingfilter' ? (
				<p
					onClick={onClick}
					className={`${isActive ? 'border-primary text-primary' : 'border-transparent hover:border-primary hover:text-primary'} ${sizeClass} cursor-pointer border-b-2 px-4 pb-3 ${className}`}
				>
					{label}
				</p>
			) : type === 'navHeader' ? (
				<li>
					<Link href={localizedHref || '#'}>
						<p
							className={`${isActive ? 'cursor-default rounded-full text-primary' : 'hover:text-primary'} ${sizeClass} px-4 py-1 ${className}`}
						>
							{label}
						</p>
					</Link>
				</li>
			) : null}
		</>
	);
};

export default NavItem;
