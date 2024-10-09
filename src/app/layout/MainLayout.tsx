// layout/MainLayout.tsx
'use client';
import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import SidebarProfile from './SidebarProfile';
import ScrollToTop from '../components/ScrollToTop';
import ClientOnly from '../components/ClientOnly'; // Import thành phần client-only
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import AdminGuard from '../components/AdminGuard';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useTheme } from '../context/ThemeContext';
import SidebarAdmin from './SidebarAdmin';
import HeaderAdmin from './HeaderAdmin';
// import SidebarAdmin from './SidebarAdmin';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const locale = useLocale();
	const { isDarkMode, isCollapsedAdmin } = useTheme();
	return (
		<div
			className={`flex min-h-screen flex-col overflow-hidden ${pathname.startsWith(`/${locale}/admin`) ? 'bg-[#F2F7FF]' : ``} `}
		>
			{pathname.startsWith(`/${locale}/admin`) ? (
				<AdminGuard>
					<div className=''>
						{/* <PanelGroup direction='horizontal'> */}
						{/* <Panel
								defaultSize={15}
								className={`shadow-md ${isDarkMode ? '' : 'bg-white'} ${isCollapsedAdmin && 'w-[20%]'}`}
								minSize={6}
								collapsedSize={isCollapsedAdmin ? 5 : 15}
								maxSize={20}
							> */}
						<SidebarAdmin />

						{/* </Panel> */}
						{/* <PanelResizeHandle /> */}
						{/* <Panel defaultSize={70} className={`${isCollapsedAdmin && 'w-[80%]'}`}> */}
						{/* <main className=''> */}
						<div className={`${isCollapsedAdmin ? 'pl-[112px]' : 'pl-[320px]'} w-full`}>
							<HeaderAdmin />
							<div className='pt-16'>
								<div className='p-5'>{children}</div>
							</div>
						</div>
						{/* </main> */}
						{/* </Panel>
							<PanelResizeHandle /> */}
						{/* </PanelGroup> */}
					</div>
				</AdminGuard>
			) : (
				<>
					<Header />
					<main
						className={`flex-grow ${
							pathname.startsWith(`/${locale}/login`) ||
							pathname.startsWith(`/${locale}/register`) ||
							pathname.startsWith(`/${locale}/forgot-password`) ||
							pathname.startsWith(`/${locale}/otp`) ||
							pathname.startsWith(`/${locale}/reset-password`)
								? 'flex items-center justify-center'
								: 'pt-16'
						} ${isDarkMode ? 'bg-bgDark text-white' : ``}`}
					>
						<ClientOnly>
							{pathname.startsWith(`/${locale}/profile`) ? (
								<div className='mx-auto my-5 flex max-w-[1200px] gap-4'>
									{/* <SidebarProfile /> */}
									<div className='w-[80%]'>{children}</div>
								</div>
							) : (
								<main className={`flex-grow overflow-hidden`}>
									<ScrollToTop />
									{children}
								</main>
							)}
						</ClientOnly>
					</main>
					{!(
						pathname.startsWith(`/${locale}/login`) ||
						pathname.startsWith(`/${locale}/register`) ||
						pathname.startsWith(`/${locale}/forgot-password`) ||
						pathname.startsWith(`/${locale}/otp`) ||
						pathname.startsWith(`/${locale}/reset-password`)
					) && <Footer />}
				</>
			)}
		</div>
	);
};

export default MainLayout;
