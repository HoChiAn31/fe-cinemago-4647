'use client';

import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import Button from './Button';
import Slider from "react-slick";
import { useTranslations } from 'next-intl';
import { useTheme } from '../context/ThemeContext';
import './home.css';
import { moviesData } from '../modules/data';

interface MovieProps {
    movie: {
      image: string;
      title: string;
      tags: string[];
      rating: string;
      url: string;
      releaseDate?: string;
      onGoing: boolean;
    };
};

const UpComing: React.FC = () => {
    const [movies, setMovies] = useState<MovieProps['movie'][]>([]);

    useEffect(() => {
        const upcomingMovies = moviesData.filter(movie => {
            const releaseDate = new Date(movie.releaseDate);
            const today = new Date();
            return !movie.onGoing || releaseDate > today;
        });
        setMovies(upcomingMovies);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    const t = useTranslations('HomePage');
    const {isDarkMode} = useTheme();

    return (
        <div className={`container mx-auto flex flex-col items-center justify-center mt-10 ${isDarkMode}`}>
            <div className="uppercase text-4xl text-center font-bold mb-8">
                {t('label.onGoing')}
            </div>
            <div className="container mx-auto mb-14">
                <Slider {...settings} className={`${isDarkMode? 'darkmode':''}`}>
                    {movies.map((movie, index) => (
                        <div key={index} className="px-2">
                            <Movie movie={movie} />
                        </div>
                    ))}
                </Slider>
            </div>
            <Button href="/movies/showing/" className={`border-[0.1rem] px-20 py-3 rounded-md text-white border-second bg-primary transition duration-200 hover:bg-white hover:text-second`}>
                {t('button.see')}
            </Button>
        </div>
    );
};

export default UpComing;
