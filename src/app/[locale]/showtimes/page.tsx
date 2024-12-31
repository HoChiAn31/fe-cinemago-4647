'use client';

import ShowTimeItem from '@/app/components/ShowTimeItem';
import { useTheme } from '@/app/context/ThemeContext';
import { Image, Select, SelectItem, Spinner } from '@nextui-org/react';
import { CalendarIcon, ClapperboardIcon, MapPinIcon } from 'lucide-react';
import { Movie } from './type';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Branch } from '../admin/admin-branch/types';
import { useLocale } from 'next-intl';

const generateDateOptions = () => {
	const options = [];
	const today = new Date();

	for (let i = 0; i <= 5; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);

		const key = date.toISOString().split('T')[0]; // YYYY-MM-DD
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
	const [dataFilter, setDataFilter] = useState<Branch[]>([]);
	const [groupedByMovie, setGroupedByMovie] = useState<any[]>([]);
	const locale = useLocale();
	const [selectedShowTime, setSelectedShowTime] = useState<{
		branch: string;
		time: string;
		room: string;
	}>({
		branch: '',
		time: '',
		room: '',
	});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/movies/showtimes?languageCode=${locale}`, {
				params: {
					items_per_page: 100,
					// date: selectedDay,
					// movie_id: selectedMovie,
					// branch_id: selectedBranch,
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
				console.log(error);
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
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/movies/showtimes`, {
				params: {
					branchId: selectedBranch,
					movie_id: selectedMovie,
					// date: selectedDay,
				},
			})
			.then((response) => {
				const Data = response.data.data;

				setDataFilter(Data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [selectedMovie, selectedBranch]);

	useEffect(() => {
		if (isLoading && dataShowTime.length > 0) {
			const groupedByBranch = dataShowTime.map((movie) => {
				const branches = movie.showTimes.reduce((acc: any, showTime) => {
					const branchName = showTime.room.branch.translations.find(
						(t) => t.languageCode === 'vi',
					)?.name;
					const branchAddress = showTime.room.branch.translations.find(
						(t) => t.languageCode === 'vi',
					)?.address;
					if (!branchName) return acc;

					if (!acc[branchName]) acc[branchName] = [];

					acc[branchName].push({
						...movie,
						branchId: showTime.room.branch.id,
						movieId: movie.id,
						roomId: showTime.room.id,
						time: new Date(showTime.show_time_start).toLocaleTimeString('vi-VN', {
							hour: '2-digit',
							minute: '2-digit',
						}),
						room: showTime.room.name,
						address: branchAddress || 'Địa chỉ không xác định',
					});

					return acc;
				}, {});

				return {
					movie,
					branches,
				};
			});

			setGroupedByMovie(groupedByBranch);
		}
	}, [isLoading, dataShowTime]);

	if (!isLoading) {
		return <Spinner />;
	}
	console.log(groupedByMovie);

	const handleShowTimeSelection = (value: {
		branch: string;
		time: string;
		room: string;
		branchId: string;
		movieId: string;
		roomId: string;
		movie: Movie;
	}) => {
		const { branch, time, room, branchId, movieId, roomId, movie } = value;
		console.log(value);
		// setSelectedShowTime({ branch, time, room, branchId, movieId, roomId });
		console.log('Selected Show Time:', { branch, time, room });
	};
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
						onChange={setSelectedMovie}
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
					onChange={setSelectedMovie}
				/>
			</div>
			<div>
				{groupedByMovie.map(({ movie, branches }) => (
					<div key={movie.id} className='flex gap-10 border-t border-gray1 py-5'>
						<div className='w-[25%]'>
							<Image isZoomed alt='movie' src={movie?.poster_url} width={280} />
							<h3 className='py-3 text-xl font-bold uppercase'>
								{movie?.translations.find(
									(translation: any) => translation.categoryLanguage.languageCode === 'vi',
								)?.name || movie?.translations[0]?.name}
							</h3>
							<div className='space-y-2'>
								<div className='flex items-center gap-1'>
									<Image src='https://cinestar.com.vn/assets/images/icon-tag.svg' />
									<p>
										{movie.genres
											.map(
												(genre: any) =>
													genre.movieGenreTranslation.find(
														(translation: any) =>
															translation.categoryLanguage.languageCode === locale,
													)?.name || movie?.genres[0].movieGenreTranslation[0].name,
											)
											.join(', ')}
									</p>
								</div>
								<div className='flex items-center gap-1'>
									<Image src='https://cinestar.com.vn/assets/images/icon-clock.svg' />
									<p>{movie.duration}</p>
								</div>
								<div className='flex items-center gap-1'>
									<Image src='https://i.imgur.com/x2P1DNN.png' />
									<p>{movie.country}</p>
								</div>
								<div className='flex items-center gap-1'>
									<Image
										src='https://cinestar.com.vn/assets/images/subtitle.svg'
										width={17}
										height={21}
									/>
									<p>{movie.language}</p>
								</div>
							</div>
						</div>
						<div className='w-[70%]'>
							{Object.keys(branches).length === 0 ? (
								<div className='flex w-full items-center gap-2'>
									<ClapperboardIcon height={20} width={20} />
									<p className='text-gray-500 text-left text-lg'>Chưa có lịch chiếu</p>
								</div>
							) : (
								Object.keys(branches).map((branch) => (
									<div key={branch} className='flex w-full gap-4 border-b border-gray1 py-3'>
										<div className='w-1/3'>
											<h3 className='text-xl'>{branch}</h3>
											<p className='text-sm'>Địa chỉ: {branches[branch][0]?.address}</p>
										</div>

										<div className='flex flex-wrap gap-2 pb-2'>
											{branches[branch].map(
												(
													{
														time,
														room,
														branchId,
														movieId,
														roomId,
														...movie
													}: {
														time: string;
														room: string;
														branchId: string;
														movieId: string;
														roomId: string;
														movie: Movie;
													},
													index: number,
												) => (
													<button
														key={index}
														className='h-10 rounded border border-gray1 px-4 py-2 text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-300'
														onClick={() =>
															handleShowTimeSelection({
																branch,
																time,
																room,
																branchId,
																movieId,
																roomId,
																...movie,
															})
														}
													>
														{time}
													</button>
												),
											)}
										</div>
									</div>
								))
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ShowTimesPage;
