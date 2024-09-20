// components/ClientOnly.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const locale = useLocale();

	return <>{children}</>;
};

export default ClientOnly;
