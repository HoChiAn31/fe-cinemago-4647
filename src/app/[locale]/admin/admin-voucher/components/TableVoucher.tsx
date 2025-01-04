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
	console.log(vouchers);
	return (
		<div className='bg-darkGreen overflow-hidden rounded-sm border-x border-t border-gray1'>
			<table className={`w-full border-collapse`}>
				<thead className=''>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>STT</th>
						<th className='border-r border-gray1 p-3 text-left'>Tên</th>
						<th className='border-r border-gray1 p-3 text-left'>Loại</th>
						<th className='border-r border-gray1 p-3 text-left'>Giá trị</th>
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<>
							{vouchers.map((voucher, index) => (
								<tr key={voucher.id} className='border-b border-gray1'>
									<td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td>
									<td className='border-r border-gray1 p-3'>
										{voucher.translations
											.filter((translation) => translation.categoryLanguage.languageCode === locale)
											.map((traslation) => traslation.name)}
									</td>
									<td className='border-r border-gray1 p-3'>{voucher.discountType}</td>
									<td className='border-r border-gray1 p-3'>{voucher.discountValue}</td>
									<td className=''>
										<div className='flex items-center justify-center gap-2'>
											<div className='flex items-center justify-center'>
												<Button
													color='warning'
													onPress={() => {
														router.push(`/${locale}/admin/admin-voucher/${voucher.id}`);
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
														setVoucherToDelete(voucher);
														onDeleteOpen();
													}}
													isIconOnly
													radius='sm'
													size='sm'
													variant='bordered'
													className='border'
												>
													<Trash2 height={20} width={20} />
												</Button>
											</div>
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
