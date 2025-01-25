'use client';
import React from 'react';
import ShowTimeItem from '@/app/components/ShowTimeItem';
import { useTheme } from '@/app/context/ThemeContext';
import { Image, Spinner } from '@nextui-org/react';
import { CalendarIcon, ClapperboardIcon, MapPinIcon } from 'lucide-react';
import { Movie } from './type';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Branch } from '../admin/admin-branch/types';
import { useLocale } from 'next-intl';
import Links from '@/app/components/Links';
import { Showtimes } from '@/app/types/Showtime.type';

const generateDateOptions = () => {
	const options = [];
	const today = new Date();

	for (let i = 0; i <= 5; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);

		const key = date.toISOString().split('T')[0];
		const label = date.toLocaleDateString('vi-VN', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});

		options.push({ key, label });
	}

	return options;
};

interface MovieWithFilteredShowTimes extends Movie {
	filteredShowTimes: Showtimes[];
}

const optionsDay = generateDateOptions();
const todayKey = optionsDay[0].key;

const ShowTimesPage = () => {
	const { isDarkMode } = useTheme();
	const [dataShowTime, setDataShowTime] = useState<Movie[]>([]);
	const [dataBranch, setDataBranch] = useState<Branch[]>([]);
	const [selectedDay, setSelectedDay] = useState<string>(todayKey);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedMovie, setSelectedMovie] = useState<string>('');
	const [selectedBranch, setSelectedBranch] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [movieOptions, setMovieOptions] = useState<{ key: string; label: string }[]>([]);
	const [branchOptions, setBranchOptions] = useState<{ key: string; label: string }[]>([]);
	const [groupedByMovie, setGroupedByMovie] = useState<any[]>([]);
	const locale = useLocale();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/movies/showtimes?languageCode=${locale}`, {
				params: {
					items_per_page: 100,
				},
			})
			.then((response) => {
				const Data = response.data.data;
				const convertDataToSelect = Data?.map((movie: Branch) => ({
					key: movie.id,
					label:
						movie.translations.find((translation) => translation.languageCode === 'vi')?.name ||
						movie.translations[0]?.name,
				}));
				setDataBranch(Data);
				setMovieOptions(convertDataToSelect);
				setDataShowTime(Data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.error(error);
			});

		axios
			.get(`http://localhost:5000/branch`)
			.then((response) => {
				const Data = response.data.data;
				const convertDataToSelect = Data.map((data: Branch) => {
					return {
						key: data.id,
						label:
							data.translations.find((translation) => translation.languageCode === 'vi')?.name ||
							data.translations[0]?.name,
					};
				});
				setBranchOptions(convertDataToSelect);
				setIsLoading(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/movies/showtimes`, {
				params: {
					branchId: selectedBranch,
					movie_id: selectedMovie,
					date: selectedDay,
				},
			})
			.then((response) => {
				const Data = response.data.data;
				setGroupedByMovie(Data); // Directly set the filtered data
				setIsLoading(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [selectedMovie, selectedBranch, selectedDay]);

	if (!isLoading) {
		return <Spinner />;
	}

	// Nhóm suất chiếu theo từng rạp
	const groupShowtimesByBranch = (showTimes: Showtimes[]): Record<string, Showtimes[]> => {
		const grouped: Record<string, Showtimes[]> = {};
		showTimes.forEach((showTime) => {
			const branchId = showTime.room.branch.id;
			if (!grouped[branchId]) {
				grouped[branchId] = [];
			}
			grouped[branchId].push(showTime);
		});
		return grouped;
	};

	const filteredMovies = dataShowTime
		.map((movie) => {
			if (!selectedBranch) {
				const showTimesForDay = movie.showTimes.filter((showTime) => {
					const showDate = new Date(showTime.show_time_start).toISOString().split('T')[0];
					return showDate === selectedDay;
				});
				return { ...movie, filteredShowTimes: showTimesForDay };
			}

			const showTimesForBranchAndDay = movie.showTimes.filter((showTime) => {
				const showDate = new Date(showTime.show_time_start).toISOString().split('T')[0];
				const isSameDay = showDate === selectedDay;
				const isSameBranch = showTime.room.branch.id === selectedBranch;
				return isSameDay && isSameBranch;
			});

			if (showTimesForBranchAndDay.length === 0) {
				return null;
			}

			return { ...movie, filteredShowTimes: showTimesForBranchAndDay };
		})
		.filter((movie): movie is MovieWithFilteredShowTimes => movie !== null);

	return (
		<div className='container mx-auto px-3'>
			<div className='py-5'>
				<div className='grid grid-cols-2 gap-4 pb-3 lg:grid-cols-4'>
					<ShowTimeItem
						title='1. Thời gian'
						options={optionsDay}
						Icon={CalendarIcon}
						defaultSelectedKeys={[selectedDay]}
						onChange={setSelectedDay}
					/>
					<ShowTimeItem
						className='none col-span-2 hidden lg:block'
						title='2. Phim'
						options={movieOptions}
						Icon={ClapperboardIcon}
						onChange={(value) => {
							setSelectedMovie(value);
						}}
					/>
					<ShowTimeItem
						title='3. Rạp'
						options={branchOptions}
						Icon={MapPinIcon}
						onChange={setSelectedBranch}
					/>
				</div>

				<ShowTimeItem
					className='none col-span-2 lg:hidden'
					title='2. Phim'
					options={movieOptions}
					Icon={ClapperboardIcon}
					onChange={(value) => {
						setSelectedMovie(value);
					}}
				/>
			</div>
			{selectedBranch && filteredMovies.length === 0 ? (
				<div className='flex w-full items-center justify-center gap-2'>
					<p className='text-gray-500 text-center text-lg font-semibold uppercase'>
						Rạp chưa có lịch chiếu trong ngày{' '}
						{new Date(selectedDay).toLocaleDateString('vi-VN', {
							weekday: 'long',
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						})}
					</p>
				</div>
			) : (
				<div>
					{/* Hiển thị tất cả các bộ phim */}
					{filteredMovies.map((movie) => {
						// Lọc các suất chiếu cho ngày đã chọn
						const { filteredShowTimes } = movie;

						// Nhóm các suất chiếu theo rạp
						const groupedShowTimes = groupShowtimesByBranch(filteredShowTimes);

						return (
							<div key={movie.id} className='flex gap-10 border-t border-gray1 py-5'>
								<div className='w-[25%]'>
									<Links href={`movies/${movie.id}`}>
										<Image isZoomed alt='movie' src={movie?.poster_url} width={280} />
									</Links>
									<h3 className='py-3 text-xl font-bold uppercase'>
										{movie?.translations.find(
											(translation: any) => translation.categoryLanguage.languageCode === 'vi',
										)?.name || movie?.translations[0]?.name}
									</h3>
									{/* Chi tiết phim */}
									<div className='space-y-2'>
										<div className='flex items-center gap-2'>
											<Image src='https://cinestar.com.vn/assets/images/icon-tag.svg' />
											<p>
												{movie.genres
													.map(
														(genre) =>
															genre.movieGenreTranslation.find(
																(translation: any) =>
																	translation.categoryLanguage.languageCode === locale,
															)?.name || movie?.genres[0].movieGenreTranslation[0].name,
													)
													.join(', ')}
											</p>
										</div>
										<div className='flex items-center gap-2'>
											<Image src='https://cinestar.com.vn/assets/images/icon-clock.svg' />
											<p>{movie.duration}'</p>
										</div>
										<div className='flex items-center gap-2'>
											<Image src='https://i.imgur.com/x2P1DNN.png' />
											<p>{movie.country}</p>
										</div>
										<div className='flex items-center gap-2'>
											<Image
												src='https://cinestar.com.vn/assets/images/subtitle.svg'
												width={17}
												height={21}
											/>
											<p>{movie.language}</p>
										</div>
									</div>
								</div>
								<div className='flex w-[70%] flex-col gap-2'>
									{/* Nếu không có suất chiếu nào */}
									{Object.keys(groupedShowTimes).length === 0 ? (
										<div className='flex w-full items-center gap-2'>
											<ClapperboardIcon height={20} width={20} />
											<p className='text-gray-500 text-left text-lg'>Chưa có lịch chiếu</p>
										</div>
									) : (
										// Hiển thị các suất chiếu của từng rạp
										Object.entries(groupedShowTimes).map(([branchId, showTimesForBranch]) => {
											const branchName = showTimesForBranch[0].room.branch.translations.find(
												(t) => t.languageCode === locale,
											)?.name;

											const branchAddress = showTimesForBranch[0].room.branch.translations.find(
												(t) => t.languageCode === locale,
											)?.address;
											return (
												<div
													key={branchId}
													className='flex w-full gap-4 border-b border-gray1 py-3'
												>
													<div className='w-80'>
														<div className='text-xl'>{branchName}</div>
														<div className='text-sm'>Địa chỉ: {branchAddress}</div>
													</div>
													<div className='flex w-full flex-wrap items-start justify-start gap-2 pb-2'>
														{showTimesForBranch.map((showTime) => (
															<div key={showTime.id}>
																<button className='h-10 w-24 rounded border border-gray1 px-4 py-2 text-white hover:bg-primary'>
																	{new Date(showTime.show_time_start).toLocaleTimeString('vi-VN', {
																		hour: '2-digit',
																		minute: '2-digit',
																	})}
																</button>
															</div>
														))}
													</div>
												</div>
											);
										})
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ShowTimesPage;
