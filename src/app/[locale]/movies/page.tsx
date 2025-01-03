'use client';

import { FC, useEffect, useState } from 'react';
import MaxWidth from '@/app/components/MaxWidth';
import UpComing from '@/app/components/UpComing';
import { MovieProp } from '@/app/types/MovieDetail.type';
import { useLocale, useTranslations } from 'next-intl';
import Movie from '@/app/components/Movie';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import Filter from '@/app/components/Filter';

const onGoingPage: FC = () => {
	const [movies, setMovies] = useState<MovieProp['movie'][]>([]);
	const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
	const [country, setCountry] = useState<string[]>([]);
	const [rating, setRating] = useState<number[]>([0, 10]);
	const [duration, setDuration] = useState<number[]>([0, 300]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [filteredMovies, setFilteredMovies] = useState<MovieProp['movie'][]>([]);

	const t = useTranslations('HomePage');
	const locale = useLocale();

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/movies`, {
				params: {
					languageCode: locale,
					items_per_page: '100',
				},
			})
			.then((res) => {
				const ongoingMovies: MovieProp['movie'][] = res.data.data;

				const filteredMovies = ongoingMovies.filter((movie) => {
					const releaseDate = new Date(movie.releaseDate);
					const today = new Date();
					return releaseDate <= today;
				});
				setMovies(filteredMovies);
				setFilteredMovies(filteredMovies);

				const allGenres = filteredMovies
					.flatMap((movie) => movie.genres)
					.reduce((acc: { id: string; name: string }[], genre) => {
						const translation = genre.movieGenreTranslation.find(
							(t) => t.categoryLanguage.languageCode === locale,
						);
						if (!acc.find((g) => g.id === genre.id) && translation) {
							acc.push({ id: genre.id, name: translation.name });
						}
						return acc;
					}, []);
				setGenres(allGenres);

				const allCountries = filteredMovies
					.flatMap((movie) => movie.country)
					.reduce((acc: string[], country) => {
						if (!acc.includes(country)) {
							acc.push(country);
						}
						return acc;
					}, []);
				setCountry(allCountries);
				setSelectedCountries(allCountries);

				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [locale]);

	useEffect(() => {
		const newFilteredMovies = movies.filter((movie) => {
			const ratingMatches = movie.rating >= rating[0] && movie.rating <= rating[1];
			const durationMatches = movie.duration >= duration[0] && movie.duration <= duration[1];

			const genreMatches =
				selectedGenres.length === 0 ||
				selectedGenres.every((genreId) => movie.genres.some((genre) => genre.id === genreId));

			const countryMatches =
				selectedCountries.length > 0 &&
				selectedCountries.some((selectedCountry) => movie.country === selectedCountry);

			return genreMatches && countryMatches && ratingMatches && durationMatches;
		});

		setFilteredMovies(newFilteredMovies);

		if (selectedCountries.length === 0) {
			setFilteredMovies([]);
		}
	}, [movies, selectedGenres, selectedCountries, rating, duration]);

	const handleGenresChange = (genres: string[]) => {
		setSelectedGenres(genres);
	};

	const handleCountriesChange = (countries: string[]) => {
		setSelectedCountries(countries);
	};

	const handleRatingChange = (newRating: number[]) => {
		setRating(newRating);
	};

	const handleDurationChange = (newDuration: number[]) => {
		setDuration(newDuration);
	};

	if (!isLoading)
		return (
			<div className='my-10'>
				<Loading />
			</div>
		);

	return (
		<MaxWidth>
			<div className='container mx-auto my-10 flex flex-col justify-center'>
				<div className='text-default-color mb-8 text-center text-4xl font-bold uppercase tracking-tighter'>
					{t('label.onGoing')}
				</div>
				<div className='flex gap-10'>
					<div className='mt-4 w-1/4'>
						<Filter
							genres={genres}
							country={country}
							rating={rating}
							duration={duration}
							onGenresChange={handleGenresChange}
							onRatingChange={handleRatingChange}
							onDurationChange={handleDurationChange}
							onCountriesChange={handleCountriesChange}
						/>
					</div>

					<div className='grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{filteredMovies.length === 0 ? (
							<div className='text-gray-500 col-span-full text-center text-xl'>
								{t('label.noMoviesFound')}
							</div>
						) : (
							filteredMovies.map((movie, index) => (
								<div key={index} className='px-2'>
									<Movie movie={movie} />
								</div>
							))
						)}
					</div>
				</div>
			</div>
			<div className='mb-8'>
				<UpComing />
			</div>
		</MaxWidth>
	);
};

export default onGoingPage;
