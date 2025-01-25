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
import SidebarUser from './SidebarUser';
import DFmessenger from './DFmessenger';
// import SidebarAdmin from './SidebarAdmin';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const locale = useLocale();
	const { isDarkMode, isCollapsedAdmin } = useTheme();
	return (
		<div
			className={`flex min-h-screen flex-col overflow-hidden ${pathname.startsWith(`/${locale}/admin`) ? '' : ``} ${isDarkMode ? 'bg-[#18191A] text-white' : 'bg-white text-black'} `}
		>
			<DFmessenger />
			{pathname.startsWith(`/${locale}/admin`) ? (
				<AdminGuard>
					<div className={``}>
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
						<div
							className={`transition-all duration-500 ${isCollapsedAdmin ? 'pl-[112px]' : 'pl-[320px]'} w-full`}
						>
							<HeaderAdmin />
							<div className={`pt-16`}>
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
								: 'pt-[60px]'
						} ${isDarkMode ? 'bg-bgDark text-white' : ``}`}
					>
						<ClientOnly>
							{pathname.startsWith(`/${locale}/profile`) ? (
								<div className='mx-auto flex flex-col gap-4 md:flex-row'>
									{/* Sidebar User */}
									<div className='w-full md:w-[35%] lg:w-fit'>
										<SidebarUser />
									</div>
									{/* Nội dung chính */}
									<div className='w-full overflow-hidden md:w-3/4'>{children}</div>
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
