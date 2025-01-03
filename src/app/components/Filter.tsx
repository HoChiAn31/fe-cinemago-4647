'use client';

import React, { FC, useState } from 'react';
import {
	Checkbox,
	Divider,
	Row,
	Col,
	CheckboxChangeEvent,
	Slider,
	Tag,
	Tooltip,
	Input,
} from 'antd';
import { FilterProps } from '../types/Filter.type';
import { useTranslations } from 'next-intl';
import { useTheme } from '../context/ThemeContext';
import '@/app/styles/Filter.css';

const CheckboxGroup = Checkbox.Group;

const Filter: FC<FilterProps> = ({
	genres,
	country,
	rating,
	duration,
	onRatingChange,
	onDurationChange,
	onGenresChange,
	onCountriesChange,
}) => {
	const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
	const [checkedCountries, setCheckedCountries] = useState<string[]>(country);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [ratingRange, setRatingRange] = useState<number[]>(rating);
	const [durationRange, setDurationRange] = useState<number[]>(duration);
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchCountry, setSearchCountry] = useState<string>('');

	const t = useTranslations('Filter');
	const { isDarkMode } = useTheme();

	const filteredGenres = genres.filter((genre) =>
		genre.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

	const filteredCountries = country.filter((c) =>
		c.toLowerCase().includes(searchCountry.toLowerCase()),
	);

	// Genres checkbox logic
	const allGenresChecked =
		filteredGenres.length > 0 && filteredGenres.every((genre) => checkedGenres.includes(genre.id));

	const genresIndeterminate =
		checkedGenres.some((id) => filteredGenres.some((genre) => genre.id === id)) &&
		!allGenresChecked;

	const handleGenreToggle = (id: string) => {
		const updatedCheckedGenres = checkedGenres.includes(id)
			? checkedGenres.filter((genreId) => genreId !== id)
			: [...checkedGenres, id];
		setCheckedGenres(updatedCheckedGenres);
		onGenresChange(updatedCheckedGenres);
	};

	const onCheckAllGenresChange = (e: CheckboxChangeEvent) => {
		const newCheckedGenres = e.target.checked ? filteredGenres.map((genre) => genre.id) : [];
		setCheckedGenres(newCheckedGenres);
		onGenresChange(newCheckedGenres);
	};

	// Country checkbox logic
	const allCountriesChecked = checkedCountries.length === filteredCountries.length;
	const countriesIndeterminate =
		checkedCountries.length > 0 && checkedCountries.length < filteredCountries.length;

	const onCountryToggle = (value: string) => {
		const updatedCheckedCountries = checkedCountries.includes(value)
			? checkedCountries.filter((country) => country !== value)
			: [...checkedCountries, value];
		setCheckedCountries(updatedCheckedCountries);
		onCountriesChange(updatedCheckedCountries);
	};

	const onCheckAllCountriesChange = (e: CheckboxChangeEvent) => {
		const newCheckedCountries = e.target.checked ? filteredCountries : [];
		setCheckedCountries(newCheckedCountries);
		onCountriesChange(newCheckedCountries);
	};

	// Rating slider logic
	const handleRatingChange = (value: number[]) => {
		setRatingRange(value);
		onRatingChange(value);
	};

	// Duration slider logic
	const handleDurationChange = (value: number[]) => {
		setDurationRange(value);
		onDurationChange(value);
	};

	// Age category logic
	const ageTags = ['Kid', 'T13', 'T16', 'T18'];

	const handleTagChange = (tag: string, checked: boolean) => {
		const nextSelectedTags = checked
			? [...selectedTags, tag]
			: selectedTags.filter((t) => t !== tag);
		setSelectedTags(nextSelectedTags);
	};

	return (
		<div
			className={`flex flex-col gap-5 rounded border-2 p-3 ${isDarkMode ? 'border-black bg-dark text-white' : 'border-gray2 shadow-md shadow-gray'}`}
		>
			{/* Genres */}
			<div className={`flex flex-col justify-center gap-3`}>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<h1 className='text-nowrap'>{t('genres')}</h1>

						<Checkbox
							indeterminate={genresIndeterminate}
							onChange={onCheckAllGenresChange}
							checked={allGenresChecked}
							className={`text-nowrap ${isDarkMode ? '!text-white' : ''}`}
						>
							{t('all')}
						</Checkbox>
					</div>

					<Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} allowClear />
				</div>
				<Divider dashed className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />
				<div className='my-1 grid grid-cols-2 gap-x-5'>
					{filteredGenres.map((genre) => (
						<Checkbox
							key={genre.id}
							checked={checkedGenres.includes(genre.id)}
							onChange={() => handleGenreToggle(genre.id)}
							className={isDarkMode ? 'text-white' : ''}
						>
							{genre.name}
						</Checkbox>
					))}
				</div>

				<Divider className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />
			</div>

			{/* Rating */}
			<div className='my-2 flex flex-col justify-center gap-2'>
				<h1>{t('rating')}</h1>

				<div className='flex justify-between'>
					{/* Display min and max values */}
					<Tooltip title={`Min: ${ratingRange[0]}`} placement='bottomLeft'>
						<span>{ratingRange[0]}</span>
					</Tooltip>
					<Tooltip title={`Max: ${ratingRange[1]}`} placement='bottomRight'>
						<span>{ratingRange[1]}</span>
					</Tooltip>
				</div>

				<Slider
					range={{ draggableTrack: true }}
					min={0}
					max={10}
					value={ratingRange}
					onChange={handleRatingChange}
				/>

				<Divider className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />
			</div>

			{/* Country */}
			<div className='flex flex-col justify-center gap-3'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<h1 className='text-nowrap'>{t('country')}</h1>

						<Checkbox
							indeterminate={countriesIndeterminate}
							onChange={onCheckAllCountriesChange}
							checked={allCountriesChecked}
							className={`text-nowrap ${isDarkMode ? '!text-white' : ''}`}
						>
							{t('all')}
						</Checkbox>
					</div>

					<Input
						value={searchCountry}
						onChange={(e) => setSearchCountry(e.target.value)}
						allowClear
					/>
				</div>
				<Divider dashed className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />

				<div className='my-1 grid grid-cols-2 gap-x-5'>
					{filteredCountries.map((country) => (
						<Checkbox
							key={country}
							checked={checkedCountries.includes(country)}
							onChange={() => onCountryToggle(country)}
							className={isDarkMode ? 'text-white' : ''}
						>
							{country}
						</Checkbox>
					))}
				</div>

				<Divider className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />
			</div>

			{/* Duration */}
			<div className='flex flex-col justify-center gap-2'>
				<h1>{t('duration')}</h1>

				<div className='flex justify-between'>
					{/* Display min and max values */}
					<Tooltip title={`Min: ${durationRange[0]}`} placement='bottomLeft'>
						<span>{durationRange[0]}</span>
					</Tooltip>
					<Tooltip title={`Max: ${durationRange[1]}`} placement='bottomRight'>
						<span>{durationRange[1]}</span>
					</Tooltip>
				</div>

				<Slider
					range={{ draggableTrack: true }}
					min={0}
					max={300}
					value={durationRange}
					onChange={handleDurationChange}
				/>

				<Divider className={`my-0 ${isDarkMode ? 'border-white' : ''}`} />
			</div>

			{/* Age Categories */}
			<div className='flex flex-col justify-center gap-2'>
				<h1>{t('age')}</h1>
				<Row gutter={[16, 16]} className='flex items-center justify-center'>
					{ageTags.map((tag) => (
						<Col span={12} key={tag} className='flex flex-col items-center justify-center'>
							<Tag.CheckableTag
								checked={selectedTags.includes(tag)}
								onChange={(checked) => handleTagChange(tag, checked)}
								className={`text-md rounded border-1 px-10 py-2 font-semibold ${
									selectedTags.includes(tag)
										? 'border-primary bg-primary text-white'
										: 'border-primary bg-red-400 text-white hover:bg-white hover:text-primary'
								}`}
							>
								{tag}
							</Tag.CheckableTag>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Filter;
