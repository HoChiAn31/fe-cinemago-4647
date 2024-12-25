'use client';
import { Button, Input, Spacer, Spinner } from '@nextui-org/react';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShowTimeUpdate } from '../types';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import ManagementHeader from '@/app/components/ManagementHeader';

interface EditShowTimeScheduleProps {
	showTime: ShowTimeUpdate;
	onOpenChange?: () => void;
	onUpdateShowTime: (updatedShowTime: ShowTimeUpdate) => void;
	onFinishEditing: () => void;
	onReloadData: () => void;
}

const EditShowTimeSchedule: React.FC<EditShowTimeScheduleProps> = ({
	showTime,
	onOpenChange,
	onUpdateShowTime,
	onFinishEditing,
	onReloadData,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const locale = useLocale();
	const t = useTranslations('AdminShowTimeSchedule.edit');
	const toastT = useTranslations('AdminToast');
	const params = useParams();
	const id = params.id as string;
	const [updatedShowTime, setUpdatedShowTime] = useState({
		show_time_start: '',
		show_time_end: '',
	});
	const formatDateTimeLocal = (isoDate: string): string => {
		if (!isoDate) return '';
		const date = new Date(isoDate);
		return date.toISOString().slice(0, 16); // Lấy định dạng YYYY-MM-DDTHH:mm
	};
	useEffect(() => {
		const fetchShowTimeSchedules = async () => {
			const response = await fetch(`http://localhost:5000/show-time-schedules/${id}`);
			const data = await response.json();
			setUpdatedShowTime({
				show_time_start: formatDateTimeLocal(data.show_time_start) || '',
				show_time_end: formatDateTimeLocal(data.show_time_end) || '',
			});
		};
		fetchShowTimeSchedules();
	}, [id]);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUpdatedShowTime((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const handleEditShowTime = async () => {
		console.log('handleEditShowTime');
		console.log(updatedShowTime);
		setIsEditing(true);
		try {
			const response = await axios.patch(
				`http://localhost:5000/show-time-schedules/${id}`,
				updatedShowTime,
			);

			if (response.status === 200) {
				// onUpdateShowTime(response.data.data);
				// onFinishEditing();
				// onReloadData();
				// onOpenChange && onOpenChange();
				// toast.success('');
				toast.success(toastT('The showtime has been successfully updated.'));
				setTimeout(() => {
					router.push(`/${locale}/admin/admin-show-time-schedule/`);
				}, 3000);
			} else {
				toast.error('Failed to update the showtime. Please try again.');
			}
		} catch (error) {
			toast.error('An error occurred while updating the showtime. Please try again.');
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<div className='container mx-auto rounded-lg p-4'>
			<ManagementHeader isBack={true} onChangeBack={() => router.back()} />
			<h1 className='mb-4 text-2xl font-bold'>Edit Showtime</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleEditShowTime();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='datetime-local'
					name='show_time_start'
					value={updatedShowTime.show_time_start}
					onChange={handleInputChange}
					label={t('showTimeStart')}
					required
					variant='bordered'
					radius='sm'
				/>
				<Spacer y={4} />
				<Input
					fullWidth
					type='datetime-local'
					name='show_time_end'
					value={updatedShowTime.show_time_end}
					onChange={handleInputChange}
					label={t('showTimeEnd')}
					required
					variant='bordered'
					radius='sm'
				/>
				<Spacer y={2} />
				<Button
					onClick={handleEditShowTime}
					type='submit'
					color='primary'
					disabled={isEditing}
					fullWidth
					radius='sm'
				>
					{isEditing ? <Spinner size='sm' /> : t('submit')}
				</Button>
			</form>
		</div>
	);
};

export default EditShowTimeSchedule;
