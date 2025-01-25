import { Button, Input, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShowTime } from '../types';
import { useLocale, useTranslations } from 'next-intl';
import { Movie } from '../../admin-movie/types';

import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface AddShowTimeScheduleProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddShowTime: (showTime: ShowTime) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddShowTimeSchedule: React.FC<AddShowTimeScheduleProps> = ({
	isOpen,
	onOpenChange,
	onAddShowTime,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const locale = useLocale();
	const { isDarkMode } = useTheme();
	const t = useTranslations('AdminShowTimeSchedule.add');
	const [newShowTime, setNewShowTime] = useState({
		show_time_start: '',
		show_time_end: '',
		movieId: '',
	});
	const [dataMovie, setDataMovie] = useState<Movie[]>([]);
	const [movieOptions, setMovieOptions] = useState<{ key: string; label: string }[]>([]);
	const [movieId, setMovieId] = useState<string>();
	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewShowTime((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/movies/findAllName?languageCode=${locale}`, {
				params: {
					items_per_page: '1000',
				},
			})
			.then((response) => {
				const Data = response.data.data;
				setDataMovie(response.data.data);

				const convertDataToSelect = Data.map((data: Movie) => {
					return {
						key: data.id,
						label: data.translations[0].name,
					};
				});

				setMovieOptions(convertDataToSelect);
				setIsLoading(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	useEffect(() => {
		if (movieId) {
			const dateArray = dataMovie
				.filter((data) => data.id === movieId)
				.map((data) => data.releaseDate); // Trả về mảng
			if (dateArray.length > 0) {
				const date = dateArray[0]; // Lấy phần tử đầu tiên

				if (typeof date === 'string' || typeof date === 'number') {
					// Chuyển đổi `date` thành định dạng hợp lệ
					const formattedDate = new Date(date).toISOString().slice(0, 16); // Định dạng `YYYY-MM-DDTHH:mm`
					setNewShowTime((prevState) => ({
						...prevState,
						show_time_start: formattedDate,
					}));
				} else {
					console.error('Invalid date format:', date);
				}
			}
		}
	}, [movieId]);
	const handleAddShowTime = async () => {
		setIsAdding(true);
		// console.log(newShowTime);
		const data = {
			...newShowTime,
			movieId: movieId,
		};
		// console.log(data);
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/show-time-schedules`, data);
			if (response.status === 201) {
				onAddShowTime(response.data.data);
				onFinishAdding();
				onReloadData();
				setNewShowTime({
					show_time_start: '',
					show_time_end: '',
					movieId: '',
				});
				onOpenChange && onOpenChange();
				toast.success('The new showtime has been successfully added.');
			} else {
				toast.error('Failed to add showtime. Please try again.');
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while adding the showtime. Please try again.');
		} finally {
			setIsAdding(false);
		}
	};

	if (!isOpen) {
		return null;
	}
	const handleChange = (key: string) => {
		// Call the passed onChange function if it's provided
		setMovieId(key);
	};

	return (
		<div className='container mx-auto rounded-lg p-4'>
			{/* <h1 className='mb-4 text-2xl font-bold'>Add New Showtime</h1> */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddShowTime();
				}}
				className='space-y-2'
			>
				{isLoading ? (
					<Select
						className='text-lg'
						variant='bordered'
						radius='sm'
						label={t('movieId')}
						placeholder={t('placeholderMovie')}
						onChange={(e) => handleChange(e.target.value)}
					>
						{movieOptions.map((option) => (
							<SelectItem
								className={`${isDarkMode ? 'text-white' : 'text-black'}`}
								key={option.key}
							>
								{option.label}
							</SelectItem>
						))}
					</Select>
				) : (
					<Loading />
				)}
				<Input
					fullWidth
					type='datetime-local'
					name='show_time_start'
					min={newShowTime.show_time_start}
					defaultValue={newShowTime.show_time_start}
					value={newShowTime.show_time_start}
					onChange={handleInputChange}
					label={t('showTimeStart')}
					placeholder={t('placeholderShowTimeStart')}
					required
					variant='bordered'
					disabled
				/>
				<Spacer y={4} />

				<Input
					fullWidth
					type='datetime-local'
					name='show_time_end'
					min={newShowTime.show_time_start}
					value={newShowTime.show_time_end}
					onChange={handleInputChange}
					label={t('showTimeEnd')}
					placeholder={t('placeholderShowTimeEnd')}
					required
					variant='bordered'
				/>

				<Spacer y={2} />
				<Button
					onClick={handleAddShowTime}
					type='submit'
					color='primary'
					disabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('add')}
				</Button>
			</form>
		</div>
	);
};

export default AddShowTimeSchedule;
