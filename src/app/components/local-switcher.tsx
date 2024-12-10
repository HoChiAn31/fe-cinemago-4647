'use client';

import { Image, Tooltip } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function LocaleSwitcher() {
	const [isPending, startTransition] = useTransition();
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const localeActive = useLocale();
	const pathname = usePathname();
	const [selectedLocale, setSelectedLocale] = useState<string>(localeActive);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const onSelectChange = (nextLocale: string) => {
		setSelectedLocale(nextLocale);
		startTransition(() => {
			const newPathname = pathname.replace(`/${localeActive}`, `/${nextLocale}`);
			router.replace(newPathname);
		});
		setIsDropdownOpen(false);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	// Determine if the screen size is mobile
	const isMobile: boolean = typeof window !== 'undefined' && window.innerWidth <= 768;

	return (
		<div className='relative'>
			<div ref={dropdownRef}>
				<Tooltip
					closeDelay={100}
					content={
						<div className='rounded text-black'>
							<div
								onClick={() => onSelectChange('vi')}
								className='flex cursor-pointer items-center gap-2 border-b px-4 py-2'
							>
								<Image
									src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMF-Ly3Re3LxcOi4Bz61Rqj9iR2_DAX4EanQ&s'
									alt='Vietnam flag'
									width={20}
									height={15}
									className='mr-5'
									radius='none'
								/>
								<p
									className={`${selectedLocale === 'vi' ? `text-primary` : isDarkMode ? `text-white` : `text-black`} hover:text-primary`}
								>
									VietNam
								</p>
							</div>
							<div
								onClick={() => onSelectChange('en')}
								className='flex cursor-pointer items-center gap-2 px-4 py-2'
							>
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png'
									alt='English flag'
									width={20}
									height={15}
									radius='none'
									className='mr-2'
								/>
								<p
									className={`${selectedLocale === 'en' ? `text-primary` : isDarkMode ? `text-white` : `text-black`} hover:text-primary`}
								>
									English
								</p>
							</div>
						</div>
					}
					showArrow={true}
				>
					<Image
						src={
							selectedLocale === 'vi'
								? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMF-Ly3Re3LxcOi4Bz61Rqj9iR2_DAX4EanQ&s'
								: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png'
						}
						alt='flag'
						width={36}
						height={24}
						radius='none'
						className='mr-10 cursor-pointer'
						onClick={isMobile ? toggleDropdown : undefined} // Toggle dropdown on click for mobile
					/>
				</Tooltip>
				{isMobile &&
					isDropdownOpen && ( // Render dropdown if mobile and open
						<div
							className={`absolute z-50 -mt-28 rounded shadow-lg ${isDarkMode ? `bg-black` : `bg-white`}`}
						>
							<div
								onClick={() => onSelectChange('vi')}
								className='flex cursor-pointer items-center gap-2 border-b px-4 py-2'
							>
								<Image
									src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMF-Ly3Re3LxcOi4Bz61Rqj9iR2_DAX4EanQ&s'
									alt='Vietnam flag'
									width={20}
									height={15}
									className='mr-5'
									radius='none'
								/>
								<p
									className={`${selectedLocale === 'vi' ? `text-primary` : isDarkMode ? `text-white` : `text-black`} hover:text-primary`}
								>
									VietNam
								</p>
							</div>
							<div
								onClick={() => onSelectChange('en')}
								className='flex cursor-pointer items-center gap-2 px-4 py-2'
							>
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png'
									alt='English flag'
									width={20}
									height={15}
									radius='none'
									className='mr-2'
								/>
								<p
									className={`${selectedLocale === 'en' ? `text-primary` : isDarkMode ? `text-white` : `text-black`} hover:text-primary`}
								>
									English
								</p>
							</div>
						</div>
					)}
			</div>
		</div>
	);
}
