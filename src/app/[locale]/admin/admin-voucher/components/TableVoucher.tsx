import React from 'react';
import { Voucher } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface VoucherTableProps {
	vouchers: Voucher[]; // Adjust the prop type
	onDeleteOpen: () => void;
	setVoucherToDelete: React.Dispatch<React.SetStateAction<Voucher | null>>;
	isLoading: boolean;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
	vouchers,
	onDeleteOpen,
	setVoucherToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();
	return (
		<div className='bg-darkGreen overflow-hidden rounded-sm border-x border-t border-gray1'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>Order</th>
						<th className='border-r border-gray1 p-3'>Name</th>
						<th className='border-r border-gray1 p-3'>Discount</th>
						<th className='border-r border-gray1 p-3'>Expiration Date</th>
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<>
							{vouchers.map((voucher, index) => (
								<tr key={voucher.id} className='border-b border-gray1'>
									<td className='border-r border-gray1 p-3 text-center'>{index + 1}</td>
									<td className='border-r border-gray1 p-3 text-center'>
										{voucher.translations
											.filter((translation) => translation.categoryLanguage.languageCode === locale)
											.map((traslation) => traslation.name)}
									</td>
									<td className='border-r border-gray1 p-3 text-center'>{voucher.discountType}%</td>
									<td className='border-r border-gray1 p-3 text-center'>{voucher.discountValue}</td>
									<td className='grid grid-cols-2 gap-2 p-3'>
										<div className='flex items-center justify-center'>
											<Button
												color='warning'
												onPress={() => {
													router.push(`/${locale}/admin/admin-voucher/${voucher.id}`);
												}}
												isIconOnly
												radius='sm'
											>
												<Pencil className='text-white' />
											</Button>
										</div>
										<div className='flex items-center justify-center'>
											<Button
												color='danger'
												onPress={() => {
													setVoucherToDelete(voucher);
													onDeleteOpen();
												}}
												isIconOnly
												radius='sm'
											>
												<Trash2 />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan={5} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default VoucherTable;
