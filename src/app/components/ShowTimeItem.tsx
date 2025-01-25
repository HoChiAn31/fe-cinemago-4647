'use client';
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { Select, SelectItem } from '@nextui-org/react';

// ShowTimeItem component
interface ShowTimeItemProps {
	title: string;
	options: { key: string; label: string }[];
	Icon: React.ElementType;
	className?: string;
	defaultSelectedKeys?: string[];
	onChange?: (selectedKey: string) => void;
}

const ShowTimeItem: React.FC<ShowTimeItemProps> = ({
	title,
	options,
	Icon,
	className,
	defaultSelectedKeys,
	onChange, // Destructure onChange from props
}) => {
	const { isDarkMode } = useTheme();
	const handleChange = (key: string) => {
		// Call the passed onChange function if it's provided
		if (onChange) {
			onChange(key);
		}
	};
	return (
		<div className={`${className} rounded-md border border-gray1 p-2`}>
			<div className='flex items-center justify-between text-primary'>
				<p>{title}</p> <Icon />
			</div>
			<div className='pt-2'>
				<Select
					className='text-lg'
					variant='bordered'
					radius='sm'
					placeholder='Select an option'
					defaultSelectedKeys={defaultSelectedKeys}
					onChange={(e) => handleChange(e.target.value)}
				>
					{options.map((option) => (
						<SelectItem className={`${isDarkMode ? 'text-white' : 'text-black'}`} key={option.key}>
							{option.label}
						</SelectItem>
					))}
				</Select>
			</div>
		</div>
	);
};
export default ShowTimeItem;
