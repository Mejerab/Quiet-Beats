import { useState } from "react";
import UseChange from "../hooks/UseChange";
import { FaPause, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import dance from '../assets/dance.json'

const MostFav = ({ item }) => {
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(false);
    const handleClick = UseChange({ song: item, playing, setPlaying });
    return (
        <div onClick={() => navigate(`/dashboard/song/${item._id}`)} className="cursor-pointer h-16 rounded-lg lg:w-full hover:bg-[#1b1b1b] bg-[#2F2F2F] flex gap-x-5 items-center group w-[calc(100vw-20px)]">
            <img src={item.image} className="w-16 rounded-l-lg" alt="" />
            <h4 className="text-base font-bold">{item.album.length > 12 ? item.album.slice(0, 9) : item.album}</h4>
            <div className="ml-auto mr-3">
                {
                    playing ?
                        <div className="w-11 h-11">
                            <Lottie
                                className="group-hover:opacity-0 group-hover:invisible group-hover:hidden"
                                animationData={dance}
                                loop={true}
                            />
                            <button onClick={(e) => handleClick(e)} className="opacity-0 invisible group-hover:opacity-100 group-hover:visible rounded-full cursor-pointer bg-prime w-11 h-11 flex items-center justify-center">
                                <FaPause className="text-lg " />
                            </button>
                        </div>
                        :
                        <button onClick={(e) => handleClick(e)} className="opacity-0 invisible group-hover:opacity-100 group-hover:visible rounded-full cursor-pointer bg-prime w-11 h-11 flex items-center justify-center">
                            <FaPlay className="text-lg " />
                        </button>
                }
            </div>
        </div>
    );
};

export default MostFav;