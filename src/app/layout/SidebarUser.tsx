'use client';

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Bell, NotepadText, TicketPercent, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		key: 'account',
		label: 'Tài Khoản Của Tôi',
		icon: <UserRound />,
		children: [
			{
				type: 'group',
				children: [
					{ key: 'personal', label: 'Hồ Sơ Cá Nhân', className: 'pl-10' },
					{ key: 'resetpassword', label: 'Đổi Mật Khẩu', className: 'pl-10' },
				],
			},
		],
	},
	{
		key: 'cart',
		label: 'Đơn Mua',
		icon: <NotepadText />,
	},
	{
		key: 'notification',
		label: 'Thông báo',
		icon: <Bell />,
		children: [
			{ key: 'update', label: 'Cập Nhật Đơn Hàng', className: 'pl-10' },
			{ key: 'discount', label: 'Khuyến Mãi', className: 'pl-10' },
		],
	},
	{
		key: 'voucher',
		label: 'Kho Voucher',
		icon: <TicketPercent />,
	},
];

const SidebarUser: React.FC = () => {
	const [selectedKey, setSelectedKey] = useState<any>();
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const router = useRouter();
	const locale = useLocale();

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
		<div className='relative'>
			<Menu
				onClick={onClick}
				style={{ width: '350px' }}
				defaultSelectedKeys={[selectedKey || 'personal']}
				openKeys={openKeys}
				mode='inline'
				items={items}
				className='overflow-hidden shadow-lg'
				selectedKeys={[selectedKey]}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
};

export default SidebarUser;
