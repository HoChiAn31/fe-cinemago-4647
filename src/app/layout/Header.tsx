'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { CircleUserRound, Search, Menu, X, LogOut } from 'lucide-react';
import {
	Tooltip,
	Modal,
	ModalContent,
	useDisclosure,
	Input,
	Image,
	Button,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Links from '../components/Links';
import NavItem from '../components/NavItem';
import MaxWidth from '../components/MaxWidth';
import { useUser } from '../context/UserContext';
import LocaleSwitcher from '../components/local-switcher';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import logo1 from '../Image/logo1.png';
import { useTheme } from '../context/ThemeContext';
import LinkUser from '../components/Header/LinkUser';

const Header: FC = () => {
	const pathname = usePathname();
	const { isLogin, setIsLogin, setRole, role, logout } = useUser();
	const locale = useLocale();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [valueSearch, setValueSearch] = useState<string>('');
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // New state for mobile menu
	const t = useTranslations('LayoutHeader');
	const router = useRouter();
	const { isDarkMode, toggleDarkMode } = useTheme();

	const handleLogout = () => {
		setIsLogin(false);
		setRole('');
		router.push(`/${locale}/`);
	};

	const toggleMenu = () => setIsMenuOpen((prev) => !prev); // Toggle menu on mobile
	const menuRef = useRef<HTMLDivElement | null>(null); // Create a ref for the mobile menu

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false); // Close the menu if clicked outside
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<header
			className={`fixed left-0 right-0 top-0 z-[48] overflow-hidden shadow ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
		>
			{/* Added overflow-hidden */}
			<MaxWidth className='px-2'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<Links className='text-xl font-bold' href={`/`}>
							<Image src='/images/logo1.png' width={80} height={60} alt='Logo' />
						</Links>
					</div>

					<div className='flex lg:hidden'>
						<Input
							className=''
							placeholder={t('searchPlaceholder')}
							value={valueSearch}
							onChange={(e) => {
								const value = e.target.value;
								if (value === ' ') {
									return;
								}
								setValueSearch(value);
							}}
							isClearable
							onClear={() => setValueSearch('')}
						/>
					</div>

					{/* Hamburger Icon for mobile */}
					<div className='flex lg:hidden'>
						<button onClick={toggleMenu}>
							{isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
						</button>
					</div>

					{/* Navigation Menu for larger screens */}
					<nav className={`hidden text-center lg:flex`}>
						<ul className='flex justify-center space-x-6'>
							<NavItem
								type='navHeader'
								href='/'
								label={t('home')}
								isActive={pathname === `/${locale}`}
							/>
							<NavItem
								type='navHeader'
								href={`/movies`}
								label={t('movies')}
								isActive={pathname === `/${locale}/movies`}
							/>
							<NavItem
								type='navHeader'
								href='/schedule'
								label={t('schedule')}
								isActive={pathname === `/${locale}/schedule`}
							/>
							<NavItem
								type='navHeader'
								href='/tickets'
								label={t('tickets')}
								isActive={pathname === `/${locale}/tickets`}
							/>
						</ul>
					</nav>

					{/* User Actions */}
					<div className='hidden items-center gap-4 lg:flex'>
						<button onClick={() => onOpen()}>
							<Tooltip closeDelay={100} content={t('tooltipSearch')} showArrow>
								<Search />
							</Tooltip>
						</button>

						<Tooltip
							closeDelay={100}
							content={
								<div className={`flex flex-col ${isDarkMode ? 'text-white' : 'text-black'}`}>
									{isLogin ? (
										<>
											<>
												{(role === 'admin' || role === 'staff') && (
													<>
														<Links
															href={`/admin`}
															className='w-[200px] border-b bg-transparent py-3 text-base hover:text-primary'
														>
															<p>{t('admin')}</p>
														</Links>
													</>
												)}
												<Links
													href={`/profile`}
													className='w-[200px] border-b bg-transparent py-3 text-base hover:text-primary'
												>
													<p>{t('profile')}</p>
												</Links>
												<Links
													href={`/profile/order`}
													className='w-[200px] border-b bg-transparent py-3 text-base hover:text-primary'
												>
													<p>{t('orderHistory')}</p>
												</Links>
												<button
													onClick={logout}
													className='flex w-[200px] items-center gap-2 bg-transparent py-3 text-left text-base hover:text-primary'
													// startContent={}
												>
													<LogOut height={16} width={16} />
													<p>{t('logout')}</p>
												</button>
											</>
										</>
									) : (
										<>
											<LinkUser href={`/login`}>
												<p>{t('login')}</p>
											</LinkUser>
											<LinkUser href={`/register`} isNotBorderBottom>
												<p>{t('register')}</p>
											</LinkUser>
										</>
									)}
								</div>
							}
							showArrow
						>
							<CircleUserRound className='cursor-pointer' />
						</Tooltip>
						<LocaleSwitcher />
						<Tooltip closeDelay={100} content={t('darkMode')} showArrow>
							<div>
								<DarkModeSwitch onChange={toggleDarkMode} checked={isDarkMode ?? false} size={20} />
							</div>
						</Tooltip>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<div ref={menuRef}>
						<nav className='lg:hidden'>
							<ul className='flex flex-col space-y-4'>
								<NavItem
									type='navHeader'
									href='/'
									label={t('home')}
									isActive={pathname === `/${locale}`}
								/>
								<NavItem
									type='navHeader'
									href={`/movies`}
									label={t('movies')}
									isActive={pathname === `/${locale}/movies`}
								/>
								<NavItem
									type='navHeader'
									href='/schedule'
									label={t('schedule')}
									isActive={pathname === `/${locale}/schedule`}
								/>
								<NavItem
									type='navHeader'
									href='/tickets'
									label={t('tickets')}
									isActive={pathname === `/${locale}/tickets`}
								/>
							</ul>
						</nav>
						<div className='mx-2 flex flex-col gap-4 py-2 lg:hidden'>
							{/* <Tooltip
								closeDelay={100}
								content={ */}
							<div className='flex flex-col px-2'>
								{isLogin ? (
									<>
										{(role === 'admin' || role === 'staff') && (
											<>
												<Links
													href={`/admin`}
													className='w-[200px] bg-transparent py-3 text-base text-black hover:text-primary'
												>
													<p>{t('admin')}</p>
												</Links>
											</>
										)}
										<Links
											href={`/profile`}
											className='w-[200px] border-b bg-transparent py-3 text-base hover:text-primary'
										>
											<p>{t('profile')}</p>
										</Links>
										<Links
											href={`/profile/order`}
											className='w-[200px] border-b bg-transparent py-3 text-base hover:text-primary'
										>
											<p>{t('orderHistory')}</p>
										</Links>
										<button
											onClick={logout}
											className='flex w-[200px] items-center gap-2 bg-transparent py-3 text-left text-base hover:text-primary'
											// startContent={}
										>
											<LogOut height={16} width={16} />
											<p>{t('logout')}</p>
										</button>
									</>
								) : (
									<>
										<>
											<LinkUser
												href={`/login`}
												isNotBorderBottom
												isActive={pathname === `/${locale}/login`}
											>
												<p>{t('login')}</p>
											</LinkUser>
											<LinkUser
												href={`/register`}
												isNotBorderBottom
												isActive={pathname === `/${locale}/register`}
											>
												<p>{t('register')}</p>
											</LinkUser>
										</>
									</>
								)}
							</div>
							{/* }
								showArrow
							>
								<CircleUserRound className='cursor-pointer' />
							</Tooltip> */}
							<div className='flex items-center gap-4 px-2'>
								<p>Ngôn ngữ:</p>
								<LocaleSwitcher />
							</div>
							<Tooltip closeDelay={100} content={t('darkMode')} showArrow>
								<div className='my-2 flex items-center gap-4 px-2'>
									<p>DarkMode:</p>
									<DarkModeSwitch
										onChange={toggleDarkMode}
										checked={isDarkMode ?? false}
										size={20}
									/>
								</div>
							</Tooltip>
						</div>
					</div>
				)}

				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					backdrop='blur'
					placement='top'
					size='4xl'
					motionProps={{
						variants: {
							enter: {
								y: 0,
								opacity: 1,
								transition: {
									duration: 0.3,
									ease: 'easeOut',
								},
							},
							exit: {
								y: -20,
								opacity: 0,
								transition: {
									duration: 0.2,
									ease: 'easeIn',
								},
							},
						},
					}}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<div>
									<Input
										className=''
										placeholder={t('searchPlaceholder')}
										value={valueSearch}
										onChange={(e) => {
											const value = e.target.value;
											if (value === ' ') {
												return;
											}
											setValueSearch(value);
										}}
										isClearable
										onClear={() => setValueSearch('')}
									/>
								</div>
								<>
									{valueSearch.length > 0 && (
										<div className='p-4'>
											<div className='flex items-start gap-3'>
												<Image
													src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi-l_mowzkoFwpvj7_vTdhsHp0ZuLd6LnpQ&s'
													alt=''
													height={60}
													width={60}
												/>
												<p>Marvel</p>
											</div>
										</div>
									)}
								</>
							</>
						)}
					</ModalContent>
				</Modal>
			</MaxWidth>
		</header>
	);
};

export default Header;
