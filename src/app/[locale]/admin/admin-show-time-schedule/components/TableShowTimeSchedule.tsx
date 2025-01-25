import React from 'react';
import { ShowTime } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale, useTranslations } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';
import { useRouter } from 'next/navigation';

interface TableShowTimeScheduleProps {
	showTimes: ShowTime[]; // Adjust the prop type
	selectedShowTimes?: Set<string>;
	setSelectedShowTimes?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen?: () => void;
	onDeleteOpen: () => void;
	setShowTimeToEdit?: React.Dispatch<React.SetStateAction<ShowTime | null>>;
	setShowTimeToDelete: React.Dispatch<React.SetStateAction<ShowTime | null>>;
	isLoading: boolean;
}

const TableShowTimeSchedule: React.FC<TableShowTimeScheduleProps> = ({
	showTimes,
	// selectedShowTimes,
	// setSelectedShowTimes,
	// onEditOpen,
	onDeleteOpen,
	// setShowTimeToEdit,
	setShowTimeToDelete,
	isLoading,
}) => {
	const t = useTranslations('AdminShowTimeSchedule.table');
	const { isDarkMode } = useTheme();
	const locale = useLocale();
	const router = useRouter();
	// Function to determine the "type" and its corresponding color class
	const getTypeAndColor = (startTime: string, endTime: string) => {
		const currentTime = new Date();
		const start = new Date(startTime);
		const end = new Date(endTime);

		if (currentTime < start) {
			return { type: 'Sắp chiếu', color: 'text-blue-500', bgColor: 'bg-[#3b82e940]' }; // Blue for upcoming
		} else if (currentTime >= start && currentTime <= end) {
			return { type: 'Đang chiếu', color: 'text-green-500', bgColor: 'bg-[#22c5542b]' }; // Green for currently showing
		} else {
			return { type: 'Đã chiếu', color: 'text-red-500', bgColor: 'bg-[#f35f4421]' }; // Red for finished
		}
	};

	return (
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} border-collapse`}>
				<thead>
					<tr className='border-b border-gray1'>
						{/* <th className='border-r border-gray1 p-3'>Thứ tự</th> */}
						<th className='border-r border-gray1 p-3 text-left'>{t('movie')}</th>
						<th className='border-r border-gray1 p-3 text-center'>{t('startTime')}</th>
						<th className='border-r border-gray1 p-3 text-center'>{t('endTime')}</th>
						<th className='border-r border-gray1 p-3 text-center'>{t('type')}</th>
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan={7} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					) : (
						showTimes.map((showTime, index) => {
							const { type, color, bgColor } = getTypeAndColor(
								showTime.show_time_start,
								showTime.show_time_end,
							);
							return (
								<tr key={showTime.id} className='border-b border-gray1'>
									{/* <td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td> */}
									<td className='border-r border-gray1 p-3'>
										{showTime.movie.translations
											.filter((translation) => translation.categoryLanguage.languageCode === locale)
											.map((translation) => translation.name)}
									</td>
									<td className='border-r border-gray1 p-3 text-center'>
										{showTime.show_time_start}
									</td>
									<td className='border-r border-gray1 p-3 text-center'>
										{showTime.show_time_end}
									</td>
									<td className={`border-r border-gray1 p-3 text-center`}>
										<p className={`${color} ${bgColor} rounded`}> {type}</p>
									</td>
									<td>
										<div className='flex items-center justify-center gap-2'>
											<div className='flex items-center justify-center'>
												<Button
													color='warning'
													onPress={() => {
														router.push(`/${locale}/admin/admin-show-time-schedule/${showTime.id}`);
														// onEditOpen();
													}}
													isIconOnly
													radius='sm'
													size='sm'
												>
													<Pencil className='text-white' height={20} width={20} />
												</Button>
											</div>
											<div className='flex items-center justify-center'>
												<Button
													color='danger'
													onPress={() => {
														setShowTimeToDelete(showTime);
														onDeleteOpen();
													}}
													isIconOnly
													radius='sm'
													variant='bordered'
													className='border'
												>
													<Trash2 height={20} width={20} />
												</Button>
											</div>
										</div>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableShowTimeSchedule;
