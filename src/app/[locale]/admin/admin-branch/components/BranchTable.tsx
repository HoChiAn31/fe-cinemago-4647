import React from 'react';
import { Branch } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface BranchTableProps {
	branches: Branch[]; // Adjust the prop type
	selectedBranches?: Set<string>;
	setSelectedBranches?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setBranchToEdit: React.Dispatch<React.SetStateAction<Branch | null>>;
	setBranchToDelete: React.Dispatch<React.SetStateAction<Branch | null>>;
	isLoading: boolean;
}

const BranchTable: React.FC<BranchTableProps> = ({
	branches,
	selectedBranches,
	setSelectedBranches,
	onEditOpen,
	onDeleteOpen,
	setBranchToEdit,
	setBranchToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table
				className={`w-full ${isDarkMode ? 'text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>Order</th>
						<th className='border-r border-gray1 p-3'>Name</th>
						<th className='border-r border-gray1 p-3'>Location</th> {/* Adjust as needed */}
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{branches.map((branch, index) => (
						<tr key={branch.id} className='border-b border-gray1'>
							<td className='border-r border-gray1 p-3 text-center'>{index + 1}</td>
							<td className='border-r border-gray1 p-3 text-center'>
								{branch.translations
									.filter((translation) => translation.languageCode === locale)
									.map((translation) => translation.name)}
							</td>

							<td className='border-r border-gray1 p-3 text-center'>
								{branch.translations
									.filter((translation) => translation.languageCode === locale)
									.map((translation) => translation.address)}
							</td>
							{/* Adjust as needed */}
							<td className='grid grid-cols-2 gap-2 p-3'>
								<div className='flex items-center justify-center'>
									<Button
										color='warning'
										onPress={() => {
											router.push(`/${locale}/admin/admin-branch/${branch.id}`);
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
											setBranchToDelete(branch);
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
				</tbody>
			</table>
		</div>
	);
};

export default BranchTable;
