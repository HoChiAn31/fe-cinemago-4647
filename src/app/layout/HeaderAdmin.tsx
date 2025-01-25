'use client';
import { Bell, ChevronDown, LogOut, Mail, Menu, UserRoundCog } from 'lucide-react';
import React, { FC } from 'react';
import { useTheme } from '../context/ThemeContext';
import LocaleSwitcher from '../components/local-switcher';
import { Button, Tooltip } from '@nextui-org/react';
import { useUser } from '../context/UserContext';
import { useTranslations } from 'next-intl';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const HeaderAdmin: FC = () => {
	const t = useTranslations('LayoutHeaderAdmin');
	const {
		isCollapsedAdmin,
		// setIsCollapsedAdmin,
		toggleCollapsedAdmin,
		isDarkMode,
		toggleDarkMode,
	} = useTheme();
	const { logout } = useUser();

	// const handleChangeCollapsedAdmin = () => {
	// 	if (setIsCollapsedAdmin) {
	// 		setIsCollapsedAdmin(!isCollapsedAdmin);
	// 	}
	// };
	// const handleLogOutAdmin = () => {
	// 	setRole('');
	// 	setIsLogin(false);
	// 	router.push(`/${locale}/`);
	// 	// window.location.reload();
	// };
	return (
		<div
			className={`fixed transition-all duration-500 ${isCollapsedAdmin ? 'left-[112px]' : 'left-[320px]'} right-0 top-0 z-[100] p-5 shadow ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
		>
			<div className='flex items-center justify-between'>
				<div onClick={toggleCollapsedAdmin} className='cursor-pointer'>
					<Menu />
				</div>
				<div className='flex gap-6'>
					<div className='relative'>
						<Mail />
						<div className='absolute -top-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white'>
							<p className=''>2</p>
						</div>
					</div>
					<div className='relative'>
						<Bell />
						<div className='absolute -top-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white'>
							<p className=''>10</p>
						</div>
					</div>

					<Tooltip
						closeDelay={100}
						content={
							<>
								<div className=''>
									<Button
										className='w-full bg-transparent'
										startContent={<LogOut />}
										onClick={logout}
									>
										{t('logout')}
									</Button>
								</div>
							</>
						}
					>
						<div className='flex cursor-pointer gap-2'>
							<strong>Admin</strong>
							<div className='flex items-center'>
								<UserRoundCog />
								<ChevronDown height={14} width={14} />
							</div>
						</div>
					</Tooltip>
					<LocaleSwitcher />
					<Tooltip closeDelay={100} content={t('darkMode')} showArrow>
						<div>
							<DarkModeSwitch onChange={toggleDarkMode} checked={isDarkMode ?? false} size={20} />
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default HeaderAdmin;
