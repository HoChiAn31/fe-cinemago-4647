import React, { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
	icon?: string;
	children?: ReactNode;
	href?: string;
	onClick?: () => void;
}

const Button: React.FC<LinkButtonProps> = ({
	icon,
	children,
	href,
	className,
	onClick,
	...props
}) => {
	return (
		<a
			{...props}
			className={`btn font-bold transition-all duration-300 ease-in-out ${className}`}
			href={href}
			onClick={onClick}
		>
			{icon && <img src={icon} className='h-auto w-5 font-bold transition-all duration-200' />}
			{children}
		</a>
	);
};

export default Button;
