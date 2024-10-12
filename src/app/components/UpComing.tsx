'use client';

import React, { useEffect, useState } from 'react';
import Movie from "./Movie";
import Button from './Button';
import Slider from "react-slick";
import { useTranslations } from 'next-intl';

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
        const moviesData = [
            {
                "image": "/images/movies/ma-da.jpeg",
                "title": "MA DA (T16)",
                "tags": ["Kinh Dị", "94'", "Việt Nam", "VN"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/conan-movie-27.png",
                "title": "THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)",
                "tags": ["Hoạt hình", "111'", "Nhật bản", "Lồng Tiếng"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/dep-trai-thay-sai-sai.jpeg",
                "title": "ĐẸP TRAI...THẤY SAI SAI (T18) 2D PĐ",
                "tags": ["Phim Hài", "101'", "Hàn Quốc", "Phụ Đề"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/blue-lock.png",
                "title": "BLUE LOCK: EPISODE NAGI (K)",
                "tags": ["Hoạt Hình, Anime, Tâm Lý", "90'", "Nhật bản", "Phụ Đề"],
                "rating": "K",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/bay.png",
                "title": "BẪY (T16)",
                "tags": ["Hành Động, Tâm Lý, Kinh Dị", "105'", "Khác", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/tieng-goi-tu-dia-nguc.jpeg",
                "title": "TIẾNG GỌI TỪ ĐỊA NGỤC (T16)",
                "tags": ["Kinh Dị", "92'", "Khác", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/chay-dua-voi-tu-than.jpeg",
                "title": "CHẠY ĐUA VỚI TỬ THẦN (T16)",
                "tags": ["Hồi Hộp, Hành Động", "90'", "Hàn Quốc", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/deadpool-va-wolverine.png",
                "title": "DEADPOOL VÀ WOLVERINE 2D (T18)",
                "tags": ["Siêu Anh Hùng, Hành Động", "127'", "Mỹ", "Phụ Đề"],
                "rating": "T18",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/oan-hon-bao-an.jpeg",
                "title": "OAN HỒN BÁO OÁN (T18)",
                "tags": ["Kinh Dị", "100'", "Khác", "Phụ Đề"],
                "rating": "T18",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/vu-be-boi-anh-trang.jpeg",
                "title": "VỤ BÊ BỐI ÁNH TRĂNG (T16)",
                "tags": ["Tình Cảm, Phim Hài", "132'", "Mỹ", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/mo-tra-tan-sneakshow.jpeg",
                "title": "MỒ TRA TẤN (T18)",
                "tags": ["Kinh Dị", "81'", "Khác", "Phụ Đề"],
                "rating": "T18",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-10",
                "onGoing": true
            },
            {
                "image": "/images/movies/bi-mat-ban-nhac-an-giau.jpeg",
                "title": "BÍ MẬT: BẢN NHẠC ẨN DẤU (K)",
                "tags": ["Tình Cảm, Tâm Lý", "115'", "Nhật Bản", "Phụ Đề"],
                "rating": "K",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/da-nu-bao-thu.jpeg",
                "title": "ĐẢ NỮ BÁO THÙ (T16)",
                "tags": ["Hành Động", "99'", "Hàn Quốc", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/gieng-quy.png",
                "title": "GIẾNG QUỶ (T18)",
                "tags": ["Kinh Dị", "99'", "Khác", "Phụ Đề"],
                "rating": "T18",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/borderlands.jpeg",
                "title": "BORDERLANDS: TRỞ LẠI PANDORA (T13)",
                "tags": ["Hành Động", "99'", "Nhật Bản", "Phụ Đề"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/harold.jpeg",
                "title": "HAROLD & CÂY BÚT PHÉP THUẬT 2D PĐ (T13)",
                "tags": ["Phim Hài, Phiêu Lưu", "99'", "Khác", "Phụ Đề"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/am-duong-su.png",
                "title": "ÂM DƯƠNG SƯ: 0 - KHỞI NGUỒN (T16)",
                "tags": ["Thần Thoại", "113'", "Nhật Bản", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-23",
                "onGoing": false
            },
            {
                "image": "/images/movies/hai-muoi.png",
                "title": "HAI MUỐI (K)",
                "tags": ["Tình Cảm, Gia Đình", "99'", "Việt Nam", "VN"],
                "rating": "K",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-30",
                "onGoing": false
            },
            {
                "image": "/images/movies/chang-nu-phi-cong.jpeg",
                "title": "CHÀNG NỮ PHI CÔNG (T13)",
                "tags": ["Phim Hài", "110'", "Hàn Quốc", "Phụ Đề"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-30",
                "onGoing": false
            },
            {
                "image": "/images/movies/lam-giau-voi-ma.jpeg",
                "title": "LÀM GIÀU VỚI MA (T13)",
                "tags": ["Phim Hài, Tâm Lý", "99'", "Việt Nam", "VN"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-30",
                "onGoing": false
            },
            {
                "image": "/images/movies/hellboy.jpeg",
                "title": "HELLBOY: ĐẠI CHIẾN QUỶ DỮ (T18)",
                "tags": ["Kinh Dị", "99'", "Khác", "Phụ Đề"],
                "rating": "T18",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-10-30",
                "onGoing": false
            },
            {
                "image": "/images/movies/beetle-juice-ma-sieu-quay.jpeg",
                "title": "MA SIÊU QUẬY (T13)",
                "tags": ["Phim Hài, Khoa Học Viễn Tưởng, Kinh Dị", "99'", "Khác", "Phụ Đề"],
                "rating": "T13",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-11-06",
                "onGoing": false
            },
            {
                "image": "/images/movies/khong-noi-dieu-du.jpeg",
                "title": "KHÔNG NÓI ĐIỀU DỮ (T16)",
                "tags": ["Kinh Dị", "99'", "Khác", "Phụ Đề"],
                "rating": "T16",
                "url": "https://www.youtube.com/embed/YjWrLPr8_2A?si=ExVRjNyxkIiDMneM",
                "releaseDate": "2024-11-13",
                "onGoing": false
            }
        ];

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

    return (
        <div className="container mx-auto flex flex-col items-center justify-center mt-10">
            <div className="uppercase text-4xl text-center font-bold mb-8">
                {t('label.onGoing')}
            </div>
            <div className="container mx-auto mb-14">
                <Slider {...settings}>
                    {movies.map((movie, index) => (
                        <div key={index} className="px-2">
                            <Movie movie={movie} />
                        </div>
                    ))}
                </Slider>
            </div>
            <Button href="/movie/upcoming/" className="border-[0.1rem] border-[#f3ea28] px-20 py-3 rounded-md">
                {t('button.see')}
            </Button>
        </div>
    );
};

export default UpComing;
