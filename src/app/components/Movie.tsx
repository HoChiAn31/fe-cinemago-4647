'use client';

import React, { useState } from "react";
import Button from "./Button";
import Image from "./Image";
import { iconTags } from "../contracts/IconTag.contract";
import { formatDate } from "../utils/format.utils";
import { useTranslations } from 'next-intl';
import { useTheme } from "../context/ThemeContext";

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

const Movie: React.FC<MovieProps> = ({ movie }) => {
    const t = useTranslations('HomePage');

  const getAgeRating = (rating: string): string => {
    if (rating.includes("T13") || rating.includes("T16")) {
      return "Teen";
    } else if (rating.includes("T18")) {
      return "Adult";
    } else if (rating.includes("K")) {
      return "Kid";
    }
    return "";
  };

  const ageRating = getAgeRating(movie.rating);
  const {isDarkMode} = useTheme();

  return (
    <div className={`flex flex-col relative group w-full max-w-xs overflow-hidden rounded-sm shadow-lg mt-4 ${isDarkMode? 'bg-white':''}`}>
      <a className="relative block flex-1 min-h-[200px] rounded-sm" href="#">
        <Image
          src={movie.image}
          alt={movie.title}
          className={`w-full lg:h-[451.98px] object-cover transition-transform duration-500 group-hover:scale-100 min-h-full border-2 ${isDarkMode? 'border-second ':'border-gray-400'}`}
          sizes="(max-width: 768px) 135px, 280px"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center px-3">
          <div className="text-white text-lg font-bold mb-4">
            {movie.title}
          </div>
          <div className="flex flex-col">
            {movie.tags.map((tag, index) => (
              <div key={index} className="text-xs text-white px-2 py-1 mb-1 flex gap-1">
                <Image src={iconTags[index]} alt={`icon-${index}`} className="w-4 h-4 mr-2" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </a>

      <div className="absolute top-[1px] left-[1px] flex items-center w-full transition-transform duration-500 group-hover:translate-y-[-150%]">
        <div className="flex items-center justify-center bg-[#f93] text-black p-2 uppercase">
          <div className="flex items-center justify-center border-2 border-black rounded-md h-7 p-1 font-bold">
            2D
          </div>
        </div>
        <div className="flex items-center justify-center flex-col bg-[#f03] text-black p-1 h-11 uppercase">
          <div className="text-white text-xl leading-none font-bold text-center">
            {movie.rating}
          </div>
          <div className="text-white flex items-center justify-center bg-black text-[.5em] p-1 w-full leading-[.4px] tracking-widest">
            {ageRating}
          </div>
        </div>
      </div>

      <div className="text-center mt-4 text-primary font-bold group-hover:hover-color flex-1 flex-col items-center justify-center w-full">
        {!movie.onGoing && movie.releaseDate && (
          <div className="text-sm mb-4">
            {t('label.date')}: {formatDate(movie.releaseDate)}
          </div>
        )}
        <div className="w-full px-2 line-clamp-2 text-ellipsis overflow-hidden h-12">
          {movie.title}
        </div>
      </div>

      <div className="mt-2 flex justify-between items-end">
        <a className="text-primary text-md ml-3 flex gap-1 items-center p-2">
          <Image src={`images/icons/icon-play-vid.svg`} className="border border-gray-100 rounded-full" width="23" height="23"/>
          <div className={`underline-position-under text-center text-xs font-bold ml-1 ${isDarkMode? 'text-dark hover:text-primary':'text-dark hover:text-primary'}`}>
            {t('button.trailer')}
          </div>
        </a>
        <Button href="#" className={`hover:text-primary px-9 py-3 text-sm text-nowrap ${isDarkMode? 'text-dark':''}`}>
          {t('button.book')}  
        </Button>
      </div>
    </div>
  );
}

export default Movie;
