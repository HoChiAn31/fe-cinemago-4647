// components/AdminGuard.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useUser } from '../context/UserContext';
import { useLocale } from 'next-intl';
import { Spinner } from '@nextui-org/react';

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// const { isLogin, role, isLoading } = useUser();
	const router = useRouter();
	const locale = useLocale();
	const [isAuthorized, setIsAuthorized] = useState(false);

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		if (isLogin && role === 'admin') {
	// 			setIsAuthorized(true);
	// 		} else {
	// 			router.push(`/${locale}/not-authorized`);
	// 		}
	// 	}
	// }, [isLogin, role, isLoading, router, locale]);

	// if (isLoading) {
	// 	return <Spinner className='text-white' label='Checking authorization...' />;
	// }

	// if (!isAuthorized) {
	// 	return null;
	// }

	return <>{children}</>;
};

export default AdminGuard;
