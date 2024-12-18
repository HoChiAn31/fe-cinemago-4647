import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShowTime } from '../types';
import { useTranslations } from 'next-intl';

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
	const t = useTranslations('AdminShowTimeAdd');
	const [newShowTime, setNewShowTime] = useState({
		show_time_start: '',
		show_time_end: '',
		movieId: '',
	});

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewShowTime((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

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
					movieId: '',
				});
				onOpenChange && onOpenChange();
				toast.success('The new showtime has been successfully added.');
			} else {
				toast.error('Failed to add showtime. Please try again.');
			}
		} catch (error) {
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
			<h1 className='mb-4 text-2xl font-bold'>Add New Showtime</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddShowTime();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='datetime-local'
					name='show_time_start'
					value={newShowTime.show_time_start}
					onChange={handleInputChange}
					label={t('showTimeStart')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='datetime-local'
					name='show_time_end'
					value={newShowTime.show_time_end}
					onChange={handleInputChange}
					label={t('showTimeEnd')}
					required
					variant='bordered'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='text'
					name='movieId'
					value={newShowTime.movieId}
					onChange={handleInputChange}
					label={t('movieId')}
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
					{isAdding ? <Spinner size='sm' /> : t('addShowTime')}
				</Button>
			</form>
		</div>
	);
};

export default AddShowTimeSchedule;
