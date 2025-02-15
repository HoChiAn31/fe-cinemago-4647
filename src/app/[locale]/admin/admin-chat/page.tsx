// pages/admin/chat.tsx
'use client';
// import { useContext } from 'react';
import AdminChat from '@/app/components/AdminChat';
import React from 'react';
// import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';
// import { useUser } from '@/app/context/UserContext';

const AdminChatPage: React.FC = () => {
	// const { user, role } = useUser();
	// const router = useRouter();

	// useEffect(() => {
	// 	if (!user || role !== 'admin') {
	// 		router.push('/login'); // Redirect nếu không phải admin
	// 	}
	// }, [user]);

	return (
		<div>
			<h1>Trang Quản lý Tin nhắn</h1>
			<AdminChat />
		</div>
	);
};

export default AdminChatPage;
