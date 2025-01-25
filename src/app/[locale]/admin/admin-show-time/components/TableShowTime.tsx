import React from 'react';
import { ShowTime } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';
import FormattedTime from '@/app/components/FormattedTime';
import { useRouter } from 'next/navigation';

interface TableShowTimeProps {
	showTimes: ShowTime[]; // Adjust the prop type
	selectedShowTimes?: Set<string>;
	setSelectedShowTimes?: React.Dispatch<React.SetStateAction<Set<string>>>;

	onDeleteOpen: () => void;
	setShowTimeToDelete: React.Dispatch<React.SetStateAction<ShowTime | null>>;
	isLoading: boolean;
}

const TableShowTime: React.FC<TableShowTimeProps> = ({
	showTimes,
	// selectedShowTimes,
	// setSelectedShowTimes,

	onDeleteOpen,

	setShowTimeToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const locale = useLocale();
	const router = useRouter();
	console.log(showTimes);
	return (
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} border-collapse`}>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>STT</th>
						<th className='border-r border-gray1 p-3 text-left'>Phim</th>
						<th className='border-r border-gray1 p-3 text-center'>Phòng</th>
						<th className='border-r border-gray1 p-3 text-center'>Chi nhánh</th>

						<th className='border-r border-gray1 p-3 text-center'>Thời gian bắt đầu</th>
						<th className='border-r border-gray1 p-3 text-center'>Giá</th>
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
						showTimes.map((showTime, index) => (
							<tr key={showTime.id} className='border-b border-gray1'>
								<td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td>
								<td className='border-r border-gray1 p-3'>
									{showTime.movie.translations
										.filter((translation) => translation.categoryLanguage.languageCode === locale)
										.map((translation) => translation.name)}
								</td>
								<td className='border-r border-gray1 p-3'>
									{showTime.room.branch.translations
										.filter((translation) => translation.languageCode === locale)
										.map((translation) => translation.name)}
								</td>
								<td className='border-r border-gray1 p-3 text-center'>{showTime.room.name}</td>
								<td className='border-r border-gray1 p-3 text-center'>
									<FormattedTime isoString={showTime.show_time_start} format='datetime' />
								</td>

								<td className='border-r border-gray1 p-3 text-center'>{showTime.price}</td>
								<td className=''>
									<div className='flex items-center justify-center gap-2'>
										<div className='flex items-center justify-center'>
											<Button
												color='warning'
												onPress={() => {
													router.push(`/${locale}/admin/admin-show-time/${showTime.id}`);
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
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableShowTime;
