// 'use client';
// import { Button } from '@nextui-org/react';
// import {
// 	Bell,
// 	ChartBarStacked,
// 	CirclePercent,
// 	Clapperboard,
// 	ClipboardList,
// 	FileQuestion,
// 	House,
// 	LogOut,
// 	MessageCircleMore,
// 	NotebookTabs,
// 	NotepadText,
// 	Phone,
// 	Star,
// 	Store,
// 	Ticket,
// 	UserRound,
// } from 'lucide-react';
// import Link from 'next/link';
// import { FC, useEffect, useRef, useState } from 'react';
// import { Panel } from 'react-resizable-panels';
// import { useUser } from '../context/UserContext';
// import { useRouter } from 'next/navigation';
// import { useLocale } from 'next-intl';
// import TabItem from '../components/TabItem';
// import { useTheme } from '../context/ThemeContext';

// const SidebarAdmin: FC = () => {
// 	const [activeMainTab, setActiveMainTab] = useState<string>('');
// 	const [activeSubTab, setActiveSubTab] = useState<string>('');
// 	const [isLoaded, setIsLoaded] = useState<boolean>(false);
// 	const { isLogin, setIsLogin, setRole } = useUser();
// 	const { isCollapsedAdmin, setIsCollapsedAdmin } = useTheme();

// 	const divWidth = useRef<HTMLDivElement>(null);

// 	const [clientWidth, setClientWidth] = useState<number>(0);
// 	console.log('clientWidth', clientWidth);
// 	useEffect(() => {
// 		const resizeObserver = new ResizeObserver((entries) => {
// 			for (let entry of entries) {
// 				setClientWidth(entry.contentRect.width);
// 			}
// 		});

// 		if (divWidth.current) {
// 			resizeObserver.observe(divWidth.current);
// 			setClientWidth(divWidth.current.clientWidth);
// 		}

// 		return () => {
// 			if (divWidth.current) {
// 				resizeObserver.unobserve(divWidth.current);
// 			}
// 		};
// 	}, []);

// 	const router = useRouter();
// 	const locale = useLocale();
// 	useEffect(() => {
// 		// Load active tabs from local storage
// 		const storedMainTab = localStorage.getItem('activeMainTab');
// 		const storedSubTab = localStorage.getItem('activeSubTab');
// 		if (storedMainTab) setActiveMainTab(storedMainTab);
// 		if (storedSubTab) setActiveSubTab(storedSubTab);
// 		setIsLoaded(true); // Mark as loaded after state is initialized
// 	}, []);

// 	useEffect(() => {
// 		if (isLoaded) {
// 			// Save active tabs to local storage
// 			localStorage.setItem('activeMainTab', activeMainTab);
// 			localStorage.setItem('activeSubTab', activeSubTab);
// 		}
// 	}, [activeMainTab, activeSubTab, isLoaded]);

// 	if (!isLoaded) {
// 		return null;
// 	}
// 	const handleLogOutAdmin = () => {
// 		setRole('dXNlcg');
// 		setIsLogin(false);
// 		router.push(`/${locale}/`);
// 		// window.location.reload();
// 	};
// 	return (
// 		<div ref={divWidth} className={`bg-darkGreen min-h-screen ${isCollapsedAdmin ? 'w-12' : ''}`}>
// 			<div>
// 				<div ref={divWidth} className='px-3 py-3 text-3xl font-bold text-primary'>
// 					MOVIE
// 				</div>

// 				<ul className='space-y-2 py-3'>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='/'
// 						title='Trang chủ'
// 						// icon={<House height={20} width={20} />}
// 						icon={House}
// 					/>

// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='AdminCustomerCare'
// 						title='Chăm sóc khách hàng'
// 						icon={NotebookTabs}
// 						subItems={[
// 							{
// 								name: 'chat',
// 								label: 'Trò chuyện',
// 								icon: <MessageCircleMore height={20} width={20} />,
// 							},
// 							{
// 								name: 'tickets',
// 								label: 'Yêu cầu hỗ trợ',
// 								icon: <Phone height={20} width={20} />,
// 							},
// 							{
// 								name: 'faq',
// 								label: 'Câu hỏi thường gặp',
// 								icon: <FileQuestion height={20} width={20} />,
// 							},
// 						]}
// 					/>

// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='admin-movie'
// 						title='Quản lý phim'
// 						icon={Clapperboard}
// 					/>

// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='adminReport'
// 						title='Thống kê và báo cáo'
// 						icon={NotepadText}
// 					/>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='adminRestaurant'
// 						title='Quản lý thể loại'
// 						icon={ChartBarStacked}
// 					/>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='admin-branch'
// 						title='Quản lý rạp'
// 						icon={Store}
// 					/>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='AdminUserPage'
// 						title='Quản lý người dùng'
// 						icon={UserRound}
// 					/>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='adminInteract'
// 						title='Quản lý bình luận và đánh giá'
// 						icon={Star}
// 					/>
// 					<TabItem
// 						activeMainTab={activeMainTab}
// 						setActiveMainTab={setActiveMainTab}
// 						activeSubTab={activeSubTab}
// 						setActiveSubTab={setActiveSubTab}
// 						tabName='adminVoucher'
// 						title='Quản lý khuyến mãi'
// 						icon={CirclePercent}
// 					/>
// 				</ul>
// 				{/* <div className='w-full'>
// 					<Button
// 						color='danger'
// 						className='w-full'
// 						startContent={<LogOut />}
// 						onClick={handleLogOutAdmin}
// 					>
// 						Đăng xuất
// 					</Button>
// 				</div> */}
// 			</div>
// 		</div>
// 	);
// };

// export default SidebarAdmin;
'use client';
import { Button, Image } from '@nextui-org/react';
import {
	Bell,
	ChartBarStacked,
	CirclePercent,
	Clapperboard,
	ClipboardList,
	FileQuestion,
	House,
	LogOut,
	MessageCircleMore,
	NotebookTabs,
	NotepadText,
	Phone,
	ShoppingBag,
	Star,
	Store,
	Ticket,
	UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { Panel } from 'react-resizable-panels';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import TabItem from '../components/TabItem';
import { useTheme } from '../context/ThemeContext';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
const SidebarAdmin: FC = () => {
	const t = useTranslations('LayoutSideBarAdmin'); // Initialize translations
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const { isLogin, setIsLogin, setRole } = useUser();
	const { isCollapsedAdmin, setIsCollapsedAdmin } = useTheme();
	const router = useRouter();
	const locale = useLocale();
	const divWidth = useRef<HTMLDivElement>(null);
	const [clientWidth, setClientWidth] = useState<number>(0);
	console.log('clientWidth', clientWidth);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setClientWidth(entry.contentRect.width);
			}
		});

		if (divWidth.current) {
			resizeObserver.observe(divWidth.current);
			setClientWidth(divWidth.current.clientWidth);
		}

		return () => {
			if (divWidth.current) {
				resizeObserver.unobserve(divWidth.current);
			}
		};
	}, []);

	useEffect(() => {
		const storedMainTab = localStorage.getItem('activeMainTab');
		const storedSubTab = localStorage.getItem('activeSubTab');
		if (storedMainTab) setActiveMainTab(storedMainTab);
		if (storedSubTab) setActiveSubTab(storedSubTab);
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem('activeMainTab', activeMainTab);
			localStorage.setItem('activeSubTab', activeSubTab);
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	if (!isLoaded) {
		return null;
	}

	const handleLogOutAdmin = () => {
		setRole('dXNlcg');
		setIsLogin(false);
		router.push(`/${locale}/`);
	};

	return (
		<div
			ref={divWidth}
			className={`fixed bottom-0 left-0 top-0 min-h-screen bg-white shadow ${isCollapsedAdmin ? 'w-[112px]' : 'w-[320px]'}`}
		>
			<div>
				<div className='flex items-center justify-center'>
					{/* {t('title')}  */}
					<Image src='/images/logo1.png' width={80} height={60} alt='Logo' />
				</div>

				<ul className='space-y-2 py-3'>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/'
						title={t('home')}
						icon={House}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='AdminCustomerCare'
						title={t('customerCare')}
						icon={NotebookTabs}
						subItems={[
							{
								name: 'chat',
								label: t('chat'), // Use translation for chat
								icon: <MessageCircleMore height={20} width={20} />,
							},
							{
								name: 'tickets',
								label: t('supportRequests'), // Use translation for support requests
								icon: <Phone height={20} width={20} />,
							},
							{
								name: 'faq',
								label: t('faq'), // Use translation for FAQ
								icon: <FileQuestion height={20} width={20} />,
							},
						]}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-movie'
						title={t('movieManagement')}
						icon={Clapperboard}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminReport'
						title={t('statisticsReports')}
						icon={NotepadText}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminOrder'
						title={t('revenueManagement')}
						icon={ShoppingBag}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminRestaurant'
						title={t('categoryManagement')}
						icon={ChartBarStacked}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-branch'
						title={t('branchManagement')}
						icon={Store}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='AdminUserPage'
						title={t('userManagement')}
						icon={UserRound}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminInteract'
						title={t('commentsReviews')}
						icon={Star}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminVoucher'
						title={t('promotionManagement')}
						icon={CirclePercent}
					/>
				</ul>
				{/* Uncomment the logout button if needed */}
				{/* <div className='w-full'>
		            <Button
		                color='danger'
		                className='w-full'
		                startContent={<LogOut />}
		                onClick={handleLogOutAdmin}
		            >
		                {t('logout')} {/* Use translation for logout */}
				{/* </Button>
		        </div> */}
			</div>
		</div>
		// <div>
		// 	{' '}
		// 	<div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
		// 		<Sidebar collapsed={collapsed}>
		// 			<Menu>
		// 				<MenuItem> Documentation</MenuItem>
		// 				<MenuItem> Calendar</MenuItem>
		// 				<MenuItem> E-commerce</MenuItem>
		// 				<MenuItem> Examples</MenuItem>
		// 			</Menu>
		// 		</Sidebar>
		// 		<main style={{ padding: 10 }}>
		// 			<div>
		// 				<button className='sb-button' onClick={() => setCollapsed(!collapsed)}>
		// 					Collapse
		// 				</button>
		// 			</div>
		// 		</main>
		// 	</div>
		// </div>
	);
};

export default SidebarAdmin;
