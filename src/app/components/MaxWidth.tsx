import { FC, ReactNode } from 'react';

const MaxWidth: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
	return <div className={`container mx-auto ${className}`}>{children}</div>;
};
export default MaxWidth;
