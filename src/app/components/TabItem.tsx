'use client';
import Link from 'next/link';
import { ElementType, FC, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TabItemProps {
	activeMainTab: string;
	setActiveMainTab: (tabName: string) => void;
	activeSubTab: string;
	setActiveSubTab: (subTabName: string) => void;
	tabName: string;
	title: string;
	// icon: React.ReactNode;

	subItems?: { name: string; label: string; icon: React.ReactNode }[];
	icon?: ElementType;
}

const TabItem: FC<TabItemProps> = ({
	activeMainTab,
	setActiveMainTab,
	activeSubTab,
	setActiveSubTab,
	tabName,
	title,
	icon,
	subItems,
	icon: Icon,
}) => {
	const [isMobileView, setIsMobileView] = useState(false);
	const [isExpanded, setIsExpanded] = useState(true);
	const locale = useLocale();
	const isActive = activeMainTab === tabName;
	const hasSubItems = subItems && subItems.length > 0;
	const { isCollapsedAdmin } = useTheme();

	useEffect(() => {
		if (isCollapsedAdmin) {
			setIsMobileView(true);
		} else {
			setIsMobileView(false);
		}
	}, [isCollapsedAdmin]);
	const handleClick = () => {
		setActiveMainTab(tabName);
		if (hasSubItems) {
			setIsExpanded(!isExpanded);
			setActiveSubTab(subItems[0].name);
		} else {
			setActiveSubTab('');
		}
	};

	return (
		<div className={`${isCollapsedAdmin && 'w-28'}`}>
			<li
				className={`flex cursor-pointer items-center gap-3 rounded-lg ${
					// isActive ? 'text-second bg-[#e250502b]' : 'hover:text-orange hover:opacity-80'
					isActive ? 'bg-[#e250502b] text-primary' : 'hover:text-primary hover:opacity-80'
				} `}
			>
				{hasSubItems ? (
					<div
						onClick={handleClick}
						className={`relative flex w-full items-center gap-2 p-3 text-sm ${isMobileView && 'justify-center'}`}
					>
						{Icon && <Icon height={20} width={20} />}
						{!isMobileView && <span>{title}</span>}
						{!isMobileView && (
							<span className='ml-auto'>
								{isExpanded ? (
									<ChevronDown height={16} width={16} />
								) : (
									<ChevronUp height={16} width={16} />
								)}
							</span>
						)}
					</div>
				) : (
					<Link
						href={`/${locale}/admin/${tabName}`}
						onClick={handleClick}
						className={`flex w-full items-center gap-2 p-3 text-sm ${isMobileView && 'justify-center'}`}
					>
						{Icon && <Icon height={20} width={20} />}
						{!isMobileView && <span>{title}</span>}
					</Link>
				)}
			</li>
			{isActive && isExpanded && hasSubItems && (
				<>
					{!isMobileView ? (
						<ul className='ml-10 mt-2 space-y-2'>
							{subItems.map((subItem) => (
								<li
									key={subItem.name}
									className={`cursor-pointer ${
										activeSubTab === subItem.name
											? 'text-primary'
											: 'text-gray-700 hover:text-primary'
									}`}
								>
									<Link
										href={`/${locale}/admin/${tabName}/${subItem.name}`}
										onClick={() => setActiveSubTab(subItem.name)}
										className='flex items-center gap-2 px-2 py-1 text-sm'
									>
										{subItem.icon}
										{!isMobileView && subItem.label}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<div className='absolute left-[64%] top-[16.5%]'>
							<ul className='ml-10 mt-2 space-y-2 rounded-lg bg-white py-2 shadow-md'>
								{subItems.map((subItem) => (
									<li
										key={subItem.name}
										className={`cursor-pointer ${
											activeSubTab === subItem.name
												? 'text-primary'
												: 'text-gray-700 hover:text-primary'
										}`}
									>
										<Link
											href={`/${locale}/admin/${tabName}/${subItem.name}`}
											onClick={() => setActiveSubTab(subItem.name)}
											className='flex items-center gap-2 px-2 py-2 text-sm'
										>
											{subItem.icon}
											{!isMobileView && subItem.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TabItem;
