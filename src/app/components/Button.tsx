import React, { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    icon?: string;
    children?: ReactNode;
    href: string;
}

const Button: React.FC<LinkButtonProps> = ({ icon, children, href, className, ...props }) => {
  return (
    <a {...props} className={`btn relative transition-all duration-300 ease-in-out z-10 font-bold ${className}`} href={href}>
      {icon && <img src={icon} className="w-5 h-auto transition-all duration-200 font-bold" />}
      {children}
    </a>
  );
};

export default Button;
