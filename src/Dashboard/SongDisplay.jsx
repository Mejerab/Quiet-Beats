import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import SongCard from "./SongCard";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PointHook from "../hooks/PointHook";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SongDisplay = ({ type, title, nav }) => {
    const axiosPublic = useAxiosPublic();
    const { loading } = useContext(AuthContext);
    const [swipe, setSwipe] = useState(null);
    const { data: songs } = useQuery({
        queryKey: ['songs', type],
        enabled: !!type,
        queryFn: async () => {
            if (!type || type === 'null') return null;
            const res = await axiosPublic.get(`${type}`);
            return res.data;
        }
    })
    useEffect(() => {
        if (!swipe) return;
        swipe.update();
    }, [songs?.length])
    return (
        <div className="max-w-330 mx-auto lg:px-3">
            <div className="flex items-center justify-between">
                <PointHook title={title} small />
                <div className="flex items-center justify-between ">
                    <button id={`prev-${nav}`} className="btn btn-sm bg-transparent border-0 text-white shadow-none hover:bg-[#49DC6733] hover:text-[#49DC67]"><svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.43436 0.457562C8.0235 0.0475118 7.35736 0.0475118 6.94649 0.457562L0.633991 6.75756C0.223127 7.16761 0.223127 7.83244 0.633991 8.24249L6.94649 14.5425C7.35736 14.9525 8.0235 14.9525 8.43436 14.5425C8.84523 14.1324 8.84523 13.4676 8.43436 13.0576L3.91788 8.55002L16.1071 8.55002C16.6881 8.55002 17.1592 8.07992 17.1592 7.50002C17.1592 6.92013 16.6881 6.45002 16.1071 6.45002H3.91788L8.43436 1.94249C8.84523 1.53244 8.84523 0.867613 8.43436 0.457562Z" fill="currentColor" />
                    </svg>
                    </button>
                    <button id={`next-${nav}`} className="btn btn-sm bg-transparent border-0 text-white shadow-none hover:bg-[#49DC6733] hover:text-[#49DC67]"><svg width="18" height="15" className="rotate-180" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.43436 0.457562C8.0235 0.0475118 7.35736 0.0475118 6.94649 0.457562L0.633991 6.75756C0.223127 7.16761 0.223127 7.83244 0.633991 8.24249L6.94649 14.5425C7.35736 14.9525 8.0235 14.9525 8.43436 14.5425C8.84523 14.1324 8.84523 13.4676 8.43436 13.0576L3.91788 8.55002L16.1071 8.55002C16.6881 8.55002 17.1592 8.07992 17.1592 7.50002C17.1592 6.92013 16.6881 6.45002 16.1071 6.45002H3.91788L8.43436 1.94249C8.84523 1.53244 8.84523 0.867613 8.43436 0.457562Z" fill="currentColor" />
                    </svg>
                    </button>
                </div>
            </div>
            {!type || loading ?
                <div className="min-h-full flex items-center justify-center w-full">
                    <span className="loading loading-spinner loading-xl text-[#49DC67]"></span>
                </div> : <Swiper
                    onSwiper={setSwipe}
                    spaceBetween={6}
                    slidesPerView='auto'
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 6
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                        1280: {
                            slidesPerView: 6,
                        },
                    }}
                    loop={songs?.length > 6 && true}
                    navigation={{
                        prevEl: `#prev-${nav}`,
                        nextEl: `#next-${nav}`
                    }}
                    modules={[Pagination, Navigation]}
                    className="mt-3"
                >
                    {
                        songs?.map(song => <SwiperSlide className="w-fit!" key={song._id}><SongCard song={song} songs={songs} source={type} /></SwiperSlide>)
                    }
                </Swiper>}
        </div>
    );
};

export default SongDisplay;