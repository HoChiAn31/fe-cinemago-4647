import React from 'react';
import { FoodDrink } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface FoodDrinkTableProps {
	foodDrinks: FoodDrink[]; // Adjust the prop type
	selectedFoodDrinks?: Set<string>;
	setSelectedFoodDrinks?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setFoodDrinkToEdit: React.Dispatch<React.SetStateAction<FoodDrink | null>>;
	setFoodDrinkToDelete: React.Dispatch<React.SetStateAction<FoodDrink | null>>;
	isLoading: boolean;
}

const FoodDrinkTable: React.FC<FoodDrinkTableProps> = ({
	foodDrinks,
	selectedFoodDrinks,
	setSelectedFoodDrinks,
	onEditOpen,
	onDeleteOpen,
	setFoodDrinkToEdit,
	setFoodDrinkToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} border-collapse`}>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>Order</th>
						<th className='border-r border-gray1 p-3 text-left'>Name</th>
						<th className='border-r border-gray1 p-3'>Price</th>
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<>
							{foodDrinks.map((foodDrink, index) => (
								<tr key={foodDrink.id} className='border-b border-gray1'>
									<td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td>
									<td className='border-r border-gray1 p-3'>
										{foodDrink.translations // Access translations from foodDrink
											.filter((translation) => translation.categoryLanguage.languageCode === locale)
											.map((translation) => translation.name)}
									</td>
									<td className='border-r border-gray1 p-3 text-center'>{foodDrink.price}</td>
									<td className=''>
										<div className='flex items-center justify-center gap-2'>
											<div className='flex items-center justify-center'>
												<Button
													color='warning'
													onPress={() => {
														router.push(`/${locale}/admin/admin-food-drink/${foodDrink.id}`);
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
														setFoodDrinkToDelete(foodDrink);
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
							))}
						</>
					) : (
						<tr>
							<td colSpan={4} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default FoodDrinkTable;
