'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input, Button, Spacer, Spinner } from '@nextui-org/react';
import ManagementHeader from '@/app/components/ManagementHeader';
import Loading from '@/app/components/Loading';
import { ShowTime } from '../types';
import axios from 'axios';

const ShowTimeEditPage = () => {
	const params = useParams();
	const id = params.id as string;
	const [showTime, setShowTime] = useState<ShowTime | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const fetchShowTime = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/show-times/${id}`);
				const data = response.data;
				console.log(data);
				setShowTime(data);
			} catch (error) {
				console.error('Error fetching showtime:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchShowTime();
	}, [id]);
	console.log(showTime?.show_time_start);
	useEffect(() => {
		if (showTime?.show_time_start && showTime?.movie.duration) {
			const startTime = new Date(showTime?.show_time_start);

			// Thêm duration (phút) vào thời gian bắt đầu
			const endTime = new Date(startTime.getTime() + showTime?.movie.duration * 60000);

			// Lấy thời gian kết thúc theo múi giờ địa phương
			const offset = startTime.getTimezoneOffset() * 60000; // Múi giờ địa phương tính bằng mili giây
			const localEndTime = new Date(endTime.getTime() - offset); // Điều chỉnh thời gian về múi giờ địa phương

			// Chuyển thành định dạng 'YYYY-MM-DDTHH:mm' phù hợp với input
			const formattedDate = localEndTime.toISOString().slice(0, 16);

			setShowTime((prev) => {
				if (prev) {
					return {
						...prev,
						show_time_end: formattedDate, // Set the show_time_end with the formatted date
					};
				}
				return prev; // Return prev as is if it's null
			});
		}
	}, [showTime?.show_time_start]);
	const handleSave = async () => {
		if (!showTime) return;

		try {
			setIsSaving(true);
			await axios.patch(`${process.env.NEXT_PUBLIC_API}/show-times/${id}`, {
				show_time_start: showTime.show_time_start,
				show_time_end: showTime.show_time_end,
				price: showTime.price,
			});
			router.back();
		} catch (error) {
			console.error('Error saving showtime:', error);
		} finally {
			setIsSaving(false);
		}
	};
	if (isLoading) {
		return (
			<div
				style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<Loading />
			</div>
		);
	}

	return (
		<div>
			<ManagementHeader title='Chỉnh sửa suất chiếu' isBack onChangeBack={() => router.back()} />

			{showTime && (
				<div className='space-y-3'>
					<Input
						label='Thời gian bắt đầu'
						type='datetime-local'
						fullWidth
						value={
							showTime.show_time_start
								? new Date(showTime.show_time_start).toLocaleString('sv-SE').slice(0, 16)
								: ''
						}
						onChange={(e) => setShowTime({ ...showTime, show_time_start: e.target.value })}
					/>
					<Spacer y={1} />

					<Input
						label='Thời gian kết thúc'
						type='datetime-local'
						fullWidth
						value={showTime.show_time_end || ''}
						onChange={(e) => setShowTime({ ...showTime, show_time_end: e.target.value })}
					/>
					<Spacer y={1} />

					<Input
						label='Giá vé'
						type='number'
						fullWidth
						value={showTime?.price?.toString() || '0'}
						onChange={(e) => setShowTime({ ...showTime, price: Number(e.target.value) })}
					/>
					<Spacer y={2} />

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button
							onClick={handleSave}
							type='submit'
							color='primary'
							disabled={isSaving}
							fullWidth
						>
							{isSaving ? <Spinner size='sm' /> : 'Lưu'}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowTimeEditPage;
