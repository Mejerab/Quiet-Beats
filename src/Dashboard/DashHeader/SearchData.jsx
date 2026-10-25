import { useState } from "react";
import UseChange from "../../hooks/UseChange";
import { Link, useNavigate } from "react-router";
import { Pause, Play } from "lucide-react";
import Lottie from "lottie-react";
import dance from '../../assets/dance.json'

const SearchData = ({ song }) => {
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(false);
    const handleClick = UseChange({ song, playing, setPlaying });
    return (
        <div onClick={(e) => { handleClick(e); navigate(`/dashboard/song/${song._id}`) }} key={song._id} className="flex items-center p-3 gap-x-5 cursor-pointer hover:bg-[#49DC6733] transition-colors rounded-lg group/menu scrollbar-none">
            <div className="relative">
                <img className="w-18 rounded-lg" src={song.image} alt="" />
                <div className={`w-full h-full top-0 left-0 absolute rounded-lg group-hover/menu:bg-[#00000033] ${playing && 'bg-[#00000066]'}`}></div>
                <div onClick={(e)=>handleClick(e)} className="absolute top-1/2 left-1/2 -translate-1/2">
                    {playing ?
                        <div className={`w-9 relative ${playing && 'child'}`}>
                            <Lottie
                                className={`opacity-100 visible ${playing && 'child'} group-hover/menu:invisible group-hover/menu:opacity-0`}
                                animationData={dance}
                                loop={true}
                            />
                            <Pause size={23} fill="#ffffff" stroke="none" className="absolute top-1/2 -translate-1/2 left-1/2 invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100" />
                        </div> :
                        <div className={`relative ${!playing &&'child'}`}>
                            <span className="invisible opacity-0 group-hover/menu:opacity-100 group-hover/menu:visible"><Play size={23} fill="#ffffff" stroke="none" className="absolute top-1/2 -translate-1/2 left-1/2 invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100" /></span>
                        </div>
                    }
                </div>
            </div>
            <div>
                <h4 className="font-medium text-sm hover:underline">{song.album.length > 12 ? song.album.slice(0, 12)+'...' :song.album}</h4>
                <p className="para text-base"><Link className="hover:underline" to={-1}>{song.artist}</Link>
                    {
                        song?.feat?.split(',').map(item =>
                            <span>, <Link className="hover:underline" to={-1}>{item}</Link></span>
                        )
                    }
                </p>
            </div>
        </div>
    );
};

export default SearchData;