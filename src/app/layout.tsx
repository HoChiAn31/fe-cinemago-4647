'use client';
import React from 'react';
import { ModalProvider } from '@/app/context/ModalContext';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>;
}
