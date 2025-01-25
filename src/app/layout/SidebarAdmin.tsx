'use client';
import { Image } from '@nextui-org/react';
import {
	ChartBarStacked,
	CirclePercent,
	Clapperboard,
	House,
	MessageCircleMore,
	NotebookTabs,
	NotepadText,
	Phone,
	Popcorn,
	Store,
	UserRound,
} from 'lucide-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import TabItem from '../components/TabItem';
import { useTheme } from '../context/ThemeContext';
const SidebarAdmin: FC = () => {
	const t = useTranslations('LayoutSideBarAdmin'); // Initialize translations
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const { isCollapsedAdmin, isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();
	const divWidth = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const storedMainTab = localStorage.getItem('activeMainTab');
		const storedSubTab = localStorage.getItem('activeSubTab');
		if (storedMainTab) {
			setActiveMainTab(storedMainTab);
			if (storedSubTab) {
				setActiveSubTab(storedSubTab);
				router.push(`/${locale}/admin/${storedMainTab}/${storedSubTab}`);
			} else {
				router.push(`/${locale}/admin/${storedMainTab}`);
			}
		}
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem('activeMainTab', activeMainTab);
			localStorage.setItem('activeSubTab', activeSubTab);
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	useEffect(() => {
		if (isLoaded) {
			// Use a timeout to ensure the states are fully updated before storing in localStorage
			const timeoutId = setTimeout(() => {
				localStorage.setItem('activeMainTab', activeMainTab);
				localStorage.setItem('activeSubTab', activeSubTab);
			}); // You can adjust the delay if needed

			return () => clearTimeout(timeoutId); // Clean up the timeout
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	if (!isLoaded) {
		return null;
	}

	return (
		<div
			ref={divWidth}
			// className={`fixed bottom-0 left-0 top-0 min-h-screen bg-white shadow ${isCollapsedAdmin ? 'w-[112px]' : 'w-[320px]'}`}
			className={`fixed bottom-0 left-0 top-0 min-h-screen shadow transition-all duration-500 ${isCollapsedAdmin ? 'w-[112px]' : 'w-[320px]'} ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
		>
			<div className=''>
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
							// {
							// 	name: 'faq',
							// 	label: t('faq'), // Use translation for FAQ
							// 	icon: <FileQuestion height={20} width={20} />,
							// },
						]}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-order'
						title={t('orderManagement')}
						icon={NotepadText}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-revenue'
						title={t('revenueManagement')}
						icon={NotepadText}
						subItems={[
							{
								name: 'revenueBranch',
								label: t('revenueBranch'), // Use translation for chat
								icon: <Store height={20} width={20} />,
							},
							{
								name: 'revenueMovie',
								label: t('revenueMovie'), // Use translation for support requests
								icon: <Clapperboard height={20} width={20} />,
							},
							{
								name: 'revenueFood',
								label: t('revenueFood'), // Use translation for FAQ
								icon: <Popcorn height={20} width={20} />,
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
						tabName='admin-movie-genres'
						title={t('categoryManagement')}
						icon={Popcorn}
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
						tabName='admin-room'
						title={t('roomManagement')}
						icon={ChartBarStacked}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-show-time-schedule'
						title={t('roomShowTime')}
						icon={ChartBarStacked}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-show-time'
						title={'Quản lý suất chiếu'}
						icon={ChartBarStacked}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-food-drink'
						title={t('foodDrinkManagement')}
						icon={Popcorn}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-user'
						title={t('userManagement')}
						icon={UserRound}
					/>

					{/* <TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminInteract'
						title={t('commentsReviews')}
						icon={Star}
					/> */}

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-voucher'
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
