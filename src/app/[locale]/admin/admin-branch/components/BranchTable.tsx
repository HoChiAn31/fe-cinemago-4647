import React from 'react';
import { Branch } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface BranchTableProps {
	branches: Branch[]; // Adjust the prop type
	selectedBranches?: Set<string>;
	setSelectedBranches?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setBranchToEdit: React.Dispatch<React.SetStateAction<Branch | null>>;
	setBranchToDelete: React.Dispatch<React.SetStateAction<Branch | null>>;
}

const BranchTable: React.FC<BranchTableProps> = ({
	branches,
	selectedBranches,
	setSelectedBranches,
	onEditOpen,
	onDeleteOpen,
	setBranchToEdit,
	setBranchToDelete,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	// const handleSelectBranch = (id: string) => {
	// 	const newSelectedBranches = new Set(selectedBranches);
	// 	if (newSelectedBranches.has(id)) {
	// 		newSelectedBranches.delete(id);
	// 	} else {
	// 		newSelectedBranches.add(id);
	// 	}
	// 	setSelectedBranches(newSelectedBranches);
	// };

	return (
		<div className='bg-darkGreen border-gray2 overflow-hidden rounded-md border-x border-t'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-gray2 border-b'>
						<th className='border-gray2 border-r p-3'>Order</th>
						{/* <th className='border-r border-gray p-3'>ID</th> */}
						<th className='border-gray2 border-r p-3'>Name</th>
						<th className='border-gray2 border-r p-3'>Location</th> {/* Adjust as needed */}
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{branches.map((branch, index) => (
						<tr key={branch.id} className='border-gray2 border-b'>
							<td className='border-gray2 border-r p-3 text-center'>{index + 1}</td>
							{/* <td className='border-r border-gray p-3 text-center'>{branch.id}</td> */}
							<td className='border-gray2 border-r p-3 text-center'>
								{branch.translations
									.filter((translation) => translation.languageCode === locale)
									.map((translation) => translation.name)}
							</td>

							<td className='border-gray2 border-r p-3 text-center'>
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
