import { useEffect, useState } from "react";
import dance from '../../assets/dance.json'
import { Pause, Play } from "lucide-react";
import Lottie from "lottie-react";
import UseChange from "../../hooks/UseChange";
import useMusic from "../../hooks/useMusic";
import UserHook from "../../hooks/UserHook";
import { Link } from "react-router";

const FormattedSongs = ({ songs, song, idx, dataId }) => {
    const { setRunningSongs, setSource } = useMusic();
    const user = UserHook();
    const [duration, setDuration] = useState({});
    const [playing, setPlaying] = useState(false);
    const handleClick = UseChange({ song, playing, setPlaying });
    useEffect(() => {
        if (!songs?.length) return;
        songs.forEach((song) => {
            const audio = new Audio(song.song);
            audio.onloadedmetadata = () => {
                setDuration(prev => ({
                    ...prev,
                    [song._id]: audio.duration,
                }));
            };
            audio.onerror = () => {
                setDuration(prev => ({
                    ...prev,
                    [song._id]: 0,
                }));
            };
        });
    }, [songs]);
    const formatTime = (sec) => {
        const time = parseInt(sec);
        const minute = Math.floor(time / 60);
        const second = Math.floor(time % 60);
        return `${minute}:${second.length < 10 ? '0' + second : second}`;
    };
    const handleType = () => {
        if (location.pathname.includes('favourites')) {
            setSource(`/liked-songs/${user.email}`)
        }
        else{
            setSource(`/playlist/${dataId}/songs`)
        }
        setRunningSongs(songs);
    }
    return (
        <div className="p-3 px-6 items-center gap-x-4 hover:bg-[#49DC6733] transition-colors rounded-lg group grid grid-cols-12" key={song._id}>
            <div className="col-span-9 lg:col-span-5 flex items-center lg:gap-x-8 gap-x-5">
                <button className={`para text-xl w-6 cursor-pointer`} onClick={(e) => { handleClick(e); handleType() }}>
                    {playing ?
                        <div className="w-9 -ml-2 group relative">
                            <Lottie
                                className="group-hover:opacity-0 group-hover:invisible"
                                animationData={dance}
                                loop={true}
                            />
                            <Pause size={23} fill="#ffffff" stroke="none" className="absolute top-1/2 -translate-1/2 left-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100" />
                        </div> :
                        <div className="group relative">
                            <span className="group-hover:opacity-0 group-hover:invisible">{idx + 1}</span>
                            <span className="invisible opacity-0 group-hover:opacity-100 group-hover:visible"><Play size={23} fill="#ffffff" stroke="none" className="absolute top-1/2 -translate-1/2 left-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100" /></span>
                        </div>
                    }
                </button>
                <img className="w-14 rounded-lg" src={song.image} alt="" />
                <h5 className="hover:underline"><Link to={`/dashboard/song/${song._id}`}>{song.album}</Link></h5>
            </div>
            <p className="para mx-auto font-medium col-span-4 lg:block hidden">{song?.views?.length>0?song?.views?.length: 0}</p>
            <p className="para ml-auto font-medium col-span-3">{duration[song._id] ? formatTime(duration[song._id]) : '--:--'}</p>
        </div>
    );
};

export default FormattedSongs;