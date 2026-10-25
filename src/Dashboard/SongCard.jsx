import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import UseChange from "../hooks/UseChange";
import useMusic from "../hooks/useMusic";

const SongCard = ({ song, songs, source }) => {
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(false);
    const {setRunningSongs, setSource} = useMusic();
    const handleClick = UseChange({ song, playing, setPlaying });
    return (
        <div className="w-46 h-66 lg:w-52.5 lg:h-76.25 bg-[#121212] rounded p-2.5 group cursor-pointer cont">
            <div className="cursor-pointer" onClick={() => navigate(`/dashboard/song/${song._id}`)}>
                <div className="relative">
                    <img className="rounded-sm lg:w-47.5 w-41 h-40 lg:h-50 object-cover" src={song.image} alt="" />
                    <div className="absolute left-1/2 top-full group-hover:opacity-100 group-hover:visible tra group-hover:top-1/2 transition-opacity opacity-0 invisible -translate-1/2">
                        <button onClick={(e) => { handleClick(e); setRunningSongs(songs); setSource(source) }} className="bg-[#49DC67B3] cursor-pointer rounded-full h-15 w-15 flex items-center justify-center transition-all duration-200 hover:bg-[#49DC67]">
                            {playing ?
                                <FaPause className="text-lg " /> :
                                <FaPlay className="text-lg " />
                            }
                        </button>
                    </div>
                </div>
                <h5 className="font-bold text-base mt-3">{song.album}</h5>
                <div className="para">
                    <button onClick={(e)=>{e.stopPropagation(); navigate(`artist/${song?.artist.toLowerCase().replace(' ', '_')}`)}} className="mt-1 hover:underline cursor-pointer">{song?.artist}</button>
                    {song?.feat?.split(',').map((feat, idx) =>
                        <span key={idx}>, <button className="hover:underline cursor-pointer" onClick={(e)=>{e.stopPropagation(); navigate(`artist/${feat[0]===' '?feat.slice(1).toLowerCase().replace(' ', '_'):feat.toLowerCase().replace(' ', '_')}`)}}>{feat}</button></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongCard;