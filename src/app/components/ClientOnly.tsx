// components/ClientOnly.tsx
'use client';
import React from 'react';
// import { usePathname } from 'next/navigation';
// import { useLocale } from 'next-intl';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// const pathname = usePathname();
	// const locale = useLocale();

	return <>{children}</>;
};

export default ClientOnly;
