import React from 'react';
import { Branch } from '../../admin-branch/types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface AdminBranchTableProps {
	branches: Branch[];
	onEditOpen?: () => void;
	onDeleteOpen?: () => void;
	setBranchToEdit?: React.Dispatch<React.SetStateAction<Branch | null>>;
	isLoading: boolean;
}

const BranchTable: React.FC<AdminBranchTableProps> = ({ branches, isLoading }) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='overflow-hidden rounded-sm border-x border-t border-gray1'>
			<table
				className={`w-full ${isDarkMode ? 'text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='w-[5%] border-r border-gray1 p-3'>Order</th>
						<th className='border-r border-gray1 p-3 text-left'>Name</th>
						<th className='border-r border-gray1 p-3 text-left'>Phone</th>
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						<tr>
							<td colSpan={4} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					) : (
						branches?.map((branch, index) => (
							<tr key={branch.id} className='border-b border-gray1'>
								<td className='border-r border-gray1 p-3 text-center'>{index + 1}</td>
								<td className='border-r border-gray1 p-3'>
									{branch.translations
										.filter((translation) => translation.languageCode === locale)
										.map((translation) => translation.name)}
								</td>
								<td className='border-r border-gray1 p-3'>{branch.phone}</td>
								<td className='grid grid-cols-1 gap-2 p-3'>
									<div className='flex items-center justify-center'>
										<Button
											color='warning'
											onPress={() => {
												// console.log(branch.id);
												router.push(`/${locale}/admin/admin-room/${branch.id}`);
											}}
											isIconOnly
											radius='sm'
											size='sm'
										>
											<Eye className='text-white' height={20} width={20} />
										</Button>
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

export default BranchTable;
