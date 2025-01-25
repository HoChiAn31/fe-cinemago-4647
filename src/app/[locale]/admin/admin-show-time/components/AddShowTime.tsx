import { Button, Input, Select, SelectItem, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShowTime } from '../types';
import { useLocale, useTranslations } from 'next-intl';
import { Branch } from '../../admin-branch/types';
import { Room } from '../../admin-room/types';
import { Movie } from '../../admin-movie/types';

interface AddShowTimeProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddShowTime: (showTime: ShowTime) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddShowTime: React.FC<AddShowTimeProps> = ({
	isOpen,
	onOpenChange,
	onAddShowTime,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const [dataMovie, setDataMovie] = useState<Movie[]>([]);
	const [selectBranch, setSelectBranch] = useState<{ key: string; value: string }[]>([]);
	const [selectRoom, setSelectRoom] = useState<{ key: string; value: string }[]>([]);
	const [selectMovie, setSelectMovie] = useState<{ key: string; value: string }[]>([]);
	// const [isLoading, setIsLoading] = useState(false);
	const [duration, setDuration] = useState<number>();
	const [selected, setSelected] = useState('');
	const [selectedRoom, setSelectedRoom] = useState('');
	const t = useTranslations('AdminShowTime.add');
	const locale = useLocale();
	const [newShowTime, setNewShowTime] = useState({
		show_time_start: '',
		show_time_end: '',
		price: '100000',
		roomId: '',
		movieId: '',
	});

	//fetch movie
	useEffect(() => {
		const fetchBranchs = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API}/movies/findAllName?${locale}`,
					{
						params: {
							items_per_page: '1000',
						},
					},
				);
				const movies: Movie[] = response.data.data;

				// Xử lý dữ liệu để tạo selectBranch
				const movieSelect = movies.map((movie) => {
					const translation = movie.translations.find(
						(t) => t.categoryLanguage.languageCode === locale,
					);

					return {
						key: movie.id,
						value: translation ? translation.name : 'Unknown',
					};
				});
				// setIsLoading(true);
				console.log(movieSelect);
				setSelectMovie(movieSelect);
				setDataMovie(movies);
			} catch (error) {
				console.error('Error fetching branches:', error);
			}
		};
		fetchBranchs();
	}, []);

	useEffect(() => {
		console.log(newShowTime.movieId);
		console.log(dataMovie);
		if (dataMovie.length > 0 && newShowTime.movieId) {
			const movie = dataMovie
				.filter((data) => data.id === newShowTime.movieId)
				.map((data) => data.duration);
			setDuration(Number(movie[0]));
		}
	}, [newShowTime.movieId]);
	useEffect(() => {
		if (newShowTime.show_time_start && duration) {
			const startTime = new Date(newShowTime.show_time_start);

			// Thêm duration (phút) vào thời gian bắt đầu
			const endTime = new Date(startTime.getTime() + duration * 60000);

			// Lấy thời gian kết thúc theo múi giờ địa phương
			const offset = startTime.getTimezoneOffset() * 60000; // Múi giờ địa phương tính bằng mili giây
			const localEndTime = new Date(endTime.getTime() - offset); // Điều chỉnh thời gian về múi giờ địa phương

			// Chuyển thành định dạng 'YYYY-MM-DDTHH:mm' phù hợp với input
			const formattedDate = localEndTime.toISOString().slice(0, 16);

			setNewShowTime((prev) => ({
				...prev,
				show_time_end: formattedDate,
			}));
		}
	}, [newShowTime.show_time_start, duration]);
	// fetch branch
	useEffect(() => {
		const fetchBranchs = async () => {
			try {
				const response = await axios.get('http://localhost:5000/branch');
				const branches: Branch[] = response.data.data;

				// Xử lý dữ liệu để tạo selectBranch
				const roles = branches.map((branch) => {
					const translation = branch.translations.find((t) => t.languageCode === locale);

					return {
						key: branch.id,
						value: translation ? translation.name : 'Unknown',
					};
				});
				console.log(roles);
				setSelectBranch(roles);
			} catch (error) {
				console.error('Error fetching branches:', error);
			}
		};
		fetchBranchs();
	}, []);
	// fetch room
	useEffect(() => {
		if (selected) {
			const fetchShowRoom = async () => {
				try {
					const response = await axios.get(`http://localhost:5000/rooms/branch/${selected}`);
					const rooms: Room[] = response.data.data;

					// Xử lý dữ liệu để tạo selectBranch
					const room = rooms.map((room) => {
						return {
							key: room.id,
							value: room.name,
						};
					});
					setSelectRoom(room);
				} catch (error) {
					console.error('Error fetching branches:', error);
				}
			};
			fetchShowRoom();
		}
	}, [selected]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
			const { name, value } = e.target;
			setNewShowTime((prevState) => ({
				...prevState,
				[name]: value,
			}));
		},
		[],
	);
	// Make ID with Branch
	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(e.target.value);
	};
	const handleSelectionChangeRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setNewShowTime((prevState) => ({
			...prevState,
			roomId: value,
		}));
	};

	const handleAddShowTime = async () => {
		setIsAdding(true);

		try {
			const response = await axios.post('http://localhost:5000/show-times', newShowTime);
			if (response.status === 201) {
				onAddShowTime(response.data.data);
				onFinishAdding();
				onReloadData();
				setNewShowTime({
					show_time_start: '',
					show_time_end: '',
					price: '',
					roomId: '',
					movieId: '',
				});
				onOpenChange && onOpenChange();
				toast.success('The new showtime has been successfully added.');
			} else {
				toast.error('Failed to add showtime. Please try again.');
			}
		} catch (err) {
			console.error('Error adding showtime:', err);
			toast.error('An error occurred while adding the showtime. Please try again.');
		} finally {
			setIsAdding(false);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className='container mx-auto rounded-lg p-4'>
			{/* <h1 className='mb-4 text-2xl font-bold'>Add New Showtime</h1> */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddShowTime();
				}}
				className='space-y-8'
			>
				<Select
					name='movieId'
					label='Phim'
					value={newShowTime.movieId}
					labelPlacement='outside'
					placeholder={'Chọn phim'}
					onChange={handleInputChange}
					className='h-14 text-lg text-red-500'
					variant='bordered'
				>
					{selectMovie.map((item) => (
						<SelectItem key={item.key} value={item.key} className=''>
							{item.value}
						</SelectItem>
					))}
				</Select>

				<Select
					name='Rạp phim'
					label='Rạp phim'
					value={selected}
					labelPlacement='outside'
					placeholder={'Chọn rạp'}
					onChange={handleSelectionChange}
					className='h-14 text-lg text-red-500'
					variant='bordered'
				>
					{selectBranch.map((item) => (
						<SelectItem key={item.key} value={item.key} className=''>
							{item.value}
						</SelectItem>
					))}
				</Select>

				<Select
					name='Phòng chiếu'
					label='Phòng chiếu'
					value={selectedRoom}
					labelPlacement='outside'
					placeholder={'Chọn phòng chiếu'}
					onChange={handleSelectionChangeRoom}
					className='h-14 text-lg text-red-500'
					variant='bordered'
					disabled={selected === undefined}
				>
					{selectRoom.map((item) => (
						<SelectItem key={item.key} value={item.key} className=''>
							{item.value}
						</SelectItem>
					))}
				</Select>

				<Input
					fullWidth
					type='datetime-local'
					name='show_time_start'
					value={newShowTime.show_time_start}
					onChange={handleInputChange}
					label={t('showTimeStart')}
					labelPlacement='outside'
					placeholder={t('showTimeStart')}
					required
					variant='bordered'
				/>

				<Input
					fullWidth
					type='datetime-local'
					name='show_time_end'
					value={newShowTime.show_time_end}
					onChange={handleInputChange}
					label={t('showTimeEnd')}
					placeholder={t('showTimeEnd')}
					labelPlacement='outside'
					required
					variant='bordered'
				/>

				{/* <Spacer y={4} />
				<Input
					fullWidth
					type='text'
					name='movieId'
					value={newShowTime.movieId}
					onChange={handleInputChange}
					label={t('movieId')}
					labelPlacement='outside'
					placeholder={t('movieId')}
					required
					variant='bordered'
				/> */}

				<Input
					fullWidth
					type='number'
					name='price'
					value={newShowTime.price}
					onChange={handleInputChange}
					label={t('price')}
					labelPlacement='outside'
					placeholder={t('price')}
					required
					variant='bordered'
				/>

				<Spacer y={4} />

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

export default AddShowTime;
