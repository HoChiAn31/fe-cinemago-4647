'use client';

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Bell, NotepadText, TicketPercent, UserRound, Menu as MenuIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

type MenuItem = Required<MenuProps>['items'][number];

const SidebarUser: React.FC = () => {
	const [selectedKey, setSelectedKey] = useState<any>();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const router = useRouter();
	const locale = useLocale();
	const t = useTranslations('UserSideBar');

	const items: MenuItem[] = [
		{
			key: 'account',
			label: t('profile.user'),
			icon: <UserRound />,
			children: [
				{
					type: 'group',
					children: [
						{ key: 'personal', label: t('profile.profile'), className: 'pl-10' },
						{ key: 'resetpassword', label: t('profile.reset'), className: 'pl-10' },
					],
				},
			],
		},
		{
			key: 'cart',
			label: t('cart'),
			icon: <NotepadText />,
		},
		{
			key: 'notification',
			label: t('notif.notif'),
			icon: <Bell />,
			children: [
				{ key: 'update', label: t('notif.update'), className: 'pl-10' },
				{ key: 'discount', label: t('notif.promotion'), className: 'pl-10' },
			],
		},
		{
			key: 'voucher',
			label: t('voucher'),
			icon: <TicketPercent />,
		},
	];

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		const pathParts = window.location.pathname.split('/');
		const urlKey = pathParts[pathParts.length - 1];

		if (!urlKey || urlKey === 'profile') {
			setSelectedKey('personal');
		} else {
			setSelectedKey(urlKey);
		}

		localStorage.setItem('selectedMenuKey', urlKey || 'personal');

		if (['personal', 'resetpassword'].includes(selectedKey || urlKey)) {
			setOpenKeys(['account']);
		} else if (['update', 'discount'].includes(selectedKey || urlKey)) {
			setOpenKeys(['notification']);
		}
	}, []);

	useEffect(() => {
		const storedOpenKeys = localStorage.getItem('openMenuKeys');
		if (storedOpenKeys) {
			setOpenKeys(JSON.parse(storedOpenKeys));
		}
	}, []);

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e.key);
		setSelectedKey(e.key);
		localStorage.setItem('selectedMenuKey', e.key);

		if (e.key === 'personal') {
			router.push(`/${locale}/profile`);
		} else {
			router.push(`/${locale}/profile/${e.key}`);
		}

		setOpenKeys((prevKeys) => {
			if (prevKeys.includes(e.key)) {
				const newKeys = prevKeys.filter((key) => key !== e.key);
				localStorage.setItem('openMenuKeys', JSON.stringify(newKeys));
				return newKeys;
			} else {
				const newKeys = [...prevKeys, e.key];
				localStorage.setItem('openMenuKeys', JSON.stringify(newKeys));
				return newKeys;
			}
		});
	};

	const onOpenChange = (keys: string[]) => {
		setOpenKeys(keys);
		localStorage.setItem('openMenuKeys', JSON.stringify(keys));
	};

	return (
		<div>
			{/* Button to open/close the sidebar, visible only on mobile */}
			<button onClick={toggleMenu} className='p-2 md:hidden'>
				{isMenuOpen ? <X className='h-6 w-6' /> : <MenuIcon className='h-6 w-6' />}
			</button>

			{/* Sidebar Menu */}
			<div className={`relative ${isMenuOpen ? 'block' : 'hidden'} mr-0 md:block`}>
				<Menu
					onClick={onClick}
					style={{ width: '280px' }}
					defaultSelectedKeys={[selectedKey || 'personal']}
					openKeys={openKeys}
					mode='inline'
					items={items}
					className='overflow-hidden shadow-lg lg:w-[350px]'
					selectedKeys={[selectedKey]}
					onOpenChange={onOpenChange}
				/>
			</div>
		</div>
	);
};

export default SidebarUser;
