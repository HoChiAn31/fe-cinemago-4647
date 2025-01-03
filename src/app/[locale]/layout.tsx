import { Inter } from 'next/font/google';
import './globals.css';
import { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from '../context/ThemeContext';
import MainLayout from '../layout/MainLayout'; // Import MainLayout
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import { UserProvider } from '../context/UserContext';
import { icons } from 'lucide-react';
// import faviocon from '../../../public/images/icon-movie.png';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'CinemaGO',

	description: 'Generated by create next app',
	icons: {
		icon: [
			{
				url: '../../../public/images/icon-movie.png', // /public path
				href: '../../../public/images/icon-movie.png', // /public path
			},
		],
	},
};
interface RootLayoutProps {
	children: ReactNode;
	params: {
		locale: string;
	};
}

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<RootLayoutProps>) {
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<head>
				<link rel='shortcut icon' href='/favicon.ico' />
				<script src='https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'></script>
				{/* <script src='https://js.stripe.com/v3/'></script> */}
			</head>
			<body className={inter.className}>
				<>
					<df-messenger
						intent='WELCOME'
						chat-title='Chăm sóc khách hàng	'
						agent-id='1afc3b5c-44b8-49ac-9acc-3f838090507d'
						language-code='en'
					></df-messenger>

					<NextIntlClientProvider messages={messages}>
						<NextUIProvider>
							<UserProvider>
								<ThemeProvider>
									<MainLayout>{children}</MainLayout>
								</ThemeProvider>
							</UserProvider>
						</NextUIProvider>
					</NextIntlClientProvider>
				</>
			</body>
		</html>
	);
}
