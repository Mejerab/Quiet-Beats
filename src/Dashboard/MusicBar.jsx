import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import useMusic from "../hooks/useMusic";
import { motion } from "framer-motion";
import UseHeart from "../hooks/useHeart";
import Marquee from "react-fast-marquee";
import { IoIosArrowDown } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import ViewHook from "../hooks/ViewHook";

const MusicBar = () => {
    motion;
    const { currentMusic, play, setPlay, next, prevv, isLoading, runningSongs } = useMusic();
    const [sound, setSound] = useState(localStorage.getItem('sound'));
    const [duration, setDuration] = useState({});
    const [progress, setProgress] = useState(0);
    const [drag, setDrag] = useState(false);
    const [current, setCurrent] = useState(JSON.parse(localStorage.getItem('current')) || {});
    const [repeat, setRepeat] = useState(false);
    const [up, setUp] = useState(false);
    const audioRef = useRef(null);
    const audio = audioRef?.current;
    useEffect(() => {
        if (isLoading || drag || !audio || typeof (runningSongs) !== 'object') return;
        if (current.minute === duration.minute && current.second === duration.second) {
            if (repeat) {
                console.log('here');
                audio.currentTime = 0;
                setCurrent({ minute: 0, second: 0 });
                audio.play();
            }
            else {
                next();
                console.log('wwww');
            }
        }
        if (current.minute === 0 && current.second === 0) {
            setPlay(true);
        }
    }, [current])
    useEffect(() => {
        if (!((duration.minute * 60) + duration.second)) return;
        const time = (current.minute * 60) + current.second;
        if (audio && time) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    }, [audio, duration])
    useEffect(() => {
        if (currentMusic && audio?.currentTime) {
            audio.currentTime = 0;
            setProgress(0)
            setCurrent({ minute: 0, second: 0 })
        }
    }, [currentMusic, audio])
    useEffect(() => {
        if (audio && currentMusic) {
            if (play) {
                audio.play();
            }
            else {
                audio.pause();
            }
        }
    }, [currentMusic, play, audio])
    useEffect(() => {
        if (audio?.duration) {
            handleDuration(audio.duration);
        }
    }, [audio?.duration])
    useEffect(() => {
        localStorage.setItem('sound', sound);
        if (audio) {
            if (sound > 0) {
                audio.volume = sound / 100;
            }
            else {
                audio.volume = 1;
                setSound(100)
            }
        };
        localStorage.setItem('current', JSON.stringify(current))
    }, [current, audio, sound])
    const handleTimeUpdate = () => {
        const value = (audio.currentTime / audio.duration) * 100;
        const minute = Math.floor(audio.currentTime / 60);
        const second = Math.floor(audio.currentTime % 60);
        setCurrent({ minute, second });
        if (drag) return;
        setProgress(value);
    }
    const handleSeek = (val) => {
        audio.currentTime = (val * audio.duration) / 100;
        const minute = Math.floor(audio.currentTime / 60);
        const second = Math.floor(audio.currentTime % 60);
        setCurrent({ minute, second })
        setProgress(val);
        if (play) {
            return audio.play();
        }
        audio.pause();
    }
    const handleSliderChange = (val) => {
        const newVal = (((val / 100) * audio.duration));
        const minute = Math.floor(newVal / 60);
        const second = Math.floor(newVal % 60);
        setCurrent({ minute, second });
        setProgress(val);
        if (!currentMusic) return null;
    }
    const handleDuration = (duration) => {
        if (duration) {
            const minute = Math.floor(duration / 60);
            const second = Math.floor(duration % 60);
            setDuration({ minute, second });

        }
    }
    const handlePrev = () => {
        if (audio.currentTime < 6) {
            setCurrent({ minute: 0, second: 0 });
            setProgress(0); audio.currentTime = 0;
            setPlay(true);
            prevv();
        }
        else {
            setCurrent({ minute: 0, second: 0 });
            setProgress(0); audio.currentTime = 0;
            setPlay(true);
        }
    }
    const handleRepeat = () => {
        setRepeat(!repeat);
    }
    ViewHook({ currentMusic, play, current })
    return (
        <>
            <div className="sticky bottom-1.5 lg:bottom-0 left-0 lg:mx-0 mx-auto w-[98%] pt-3 py-5 lg:w-full bg-[#12121299] rounded-lg backdrop-blur-2xl music overflow-hidden z-99">
                {currentMusic ?
                    <div className="lg:px-3 px-2 items-center justify-between h-full grid lg:grid-cols-12">
                        <div className={`absolute lg:hidden bottom-0 left-0 h-0.5 bg-prime`} style={{ width: `${progress.length > 2 ? progress.slice(0, 2) : progress}%` }}></div>
                        <div className="flex items-center space-x-6 col-span-3">
                            <img className="lg:w-17.5 lg:h-17.5 w-15 h-15 rounded-sm object-contain" src={currentMusic?.image} alt={currentMusic?.album} />
                            <div className="-ml-3 lg:w-7/12 w-3/6">
                                <Link to={`/dashboard/song/${currentMusic._id}`} className="hover:underline font-medium text-sm lg:block hidden">{currentMusic?.album}</Link>
                                <Link to={`/dashboard/song/${currentMusic._id}`} className="hover:underline font-medium text-sm block lg:hidden">{currentMusic?.album.length > 15 ? <Marquee speed={27} pauseOnHover>{currentMusic?.album}</Marquee> : currentMusic?.album}</Link>
                                <p className="para text-xs"><Link className="hover:underline" to={`artist/${currentMusic?.artist.toLowerCase().replace(' ', '_')}`}>{currentMusic?.artist}</Link>
                                    {currentMusic?.feat?.split(',').map((feat, idx) =>
                                        <span key={idx}>, <Link className="hover:underline" to={`artist/${feat.toLowerCase().replace(' ', '_')}`}> {feat}</Link></span>
                                    )}
                                </p>
                            </div>
                            <button className="lg:ml-0 ml-auto z-20">
                                <UseHeart songId={currentMusic?._id} size={20} />
                            </button>
                            <button className="lg:hidden z-20 cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67] mr-2">{
                                play ?
                                    <Pause onClick={() => { audioRef.current.pause(); setPlay(false) }} size={20} fill="currentColor" /> :
                                    <Play onClick={() => { audioRef.current.play(); setPlay(true) }} size={20} fill="currentColor" />
                            }</button>
                        </div>
                        <div className="space-y-1.5 col-span-6 mx-auto lg:block hidden">
                            {current ?
                                <div className="flex items-center gap-x-3 justify-center">
                                    <button onClick={handleRepeat} className={`cursor-pointer transition-colors ${repeat && 'text-[#49DC67]'} hover:text-[#49DC67]`}><Repeat size={17} /></button>
                                    <button onClick={handlePrev} className="cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67]"><SkipBack size={17} fill="currentColor" /></button>
                                    <button className="cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67]">{
                                        play ?
                                            <Pause onClick={() => { audioRef.current.pause(); setPlay(false) }} size={20} fill="currentColor" /> :
                                            <Play onClick={() => { audioRef.current.play(); setPlay(true) }} size={20} fill="currentColor" />
                                    }</button>
                                    <button onClick={() => { setProgress(0); setCurrent({ minute: 0, second: 0 }); next(); setRepeat(false); }} className="cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67]"><SkipForward size={17} fill="currentColor" /></button>
                                    <button className="cursor-pointer transition-colors hover:text-[#49DC67]"><Shuffle size={17} /></button>
                                </div> :
                                <span className="z-10 loading loading-spinner loading-xl text-[white]" ></span >
                            }
                            <div className="flex items-end gap-x-3">
                                {
                                    current ?
                                        <span className="para">{current.minute ? current.minute : '0'}:{current.second?.toString().length < 2 ? '0' + current.second : current.second ? current.second : '00'}</span> :
                                        <span className="para">0:0</span>
                                }
                                <Box width={450} marginBottom={-1}>
                                    <Slider
                                        size="medium"
                                        value={progress ? progress : 0}
                                        min={0}
                                        max={100}
                                        onChange={(e, newVal) => { handleSliderChange(newVal); }}
                                        onChangeCommitted={(e, newVal) => handleSeek(newVal)}
                                        onMouseDown={() => { setDrag(true); audio.pause() }}
                                        onMouseUp={() => { setDrag(false); audio.play() }}
                                    />
                                </Box>
                                {isNaN(duration.minute * 60 + duration.second) ? <span className="para">0:00</span> : <span className="para">{duration.minute}:{duration.second?.toString().length < 2 ? duration.second + '0' : duration.second}</span>
                                }
                            </div>
                        </div>
                        <div className="hidden lg:flex items-start gap-x-3 mt-5 ml-auto col-span-3">
                            {
                                sound ? <button onClick={() => { setSound(0); audio.volume = 0 }} className="cursor-pointer"><Volume2 /></button> :
                                    <button onClick={() => { setSound(100); audio.volume = 1; }} className="cursor-pointer"><VolumeX /></button>
                            }
                            <Box width={124} marginTop={-0.3}>
                                <Slider
                                    value={sound}
                                    min={0}
                                    max={100}
                                    onChange={(e, val) => {
                                        setSound(val);
                                        audio.volume = val / 100;
                                    }}
                                    size="small"
                                />
                            </Box>
                        </div>
                        <div onClick={() => setUp(true)} className="absolute top-0 left-0 lg:w-0 w-full lg:h-0 h-full lg:z-0 z-10"></div>
                    </div> :
                    <div className="h-full py-4.5 w-full flex items-center justify-center text-[#49DC67] text-2xl">
                        <div className="flex w-full justify-between lg:px-3 px-2 items-center">
                            <div className="flex items-center gap-x-4">
                                <div className="skeleton h-17.5 w-17.5"></div>
                                <div className="space-y-3">
                                    <div className="skeleton h-3 w-17"></div>
                                    <div className="skeleton h-3 w-24"></div>
                                </div>
                            </div>
                            <div className="skeleton h-3 w-100"></div>
                            <div className="skeleton h-2 w-24"></div>
                        </div>
                    </div>
                }
            </div >
            <div>
                <audio
                    className="opacity-0 invisible"
                    ref={audioRef}
                    src={currentMusic?.song}
                    onLoadedMetadata={handleDuration}
                    onTimeUpdate={handleTimeUpdate}
                    preload='auto'
                >
                </audio>
            </div>
            <div className={`fixed top-0 left-0 w-full lg:w-0 lg:h-0 h-full bg-[#1F1F1F] transition-transform duration-500 z-999999 ease-in-out ${up ? "translate-y-0" : "translate-y-full"} p-2 pt-6 opacity-100 visible lg:invisible lg:opacity-0 overflow-hidden`}>
                <div className="flex items-center justify-between">
                    <button onClick={() => setUp(false)}><IoIosArrowDown className="text-3xl" /> </button>
                    <p className="text-base font-semibold">
                        {
                            currentMusic?.album.length > 20 ? <Marquee>{currentMusic?.album}</Marquee> : currentMusic?.album
                        }
                    </p>
                    <button><SlOptions className="text-xl" /> </button>

                </div>
                <div className="p-2 font mt-6 h-full grid grid-rows-2">
                    <div className="w-11/12 h-fit mx-auto">
                        <img
                            className="w-full h-fit object-contain mx-auto"
                            src={currentMusic?.image}
                            alt=""
                        />
                    </div>
                    <div className="my-auto">
                        <div className="flex gap-x-6 my-auto">
                            <div>
                                <h4 className="text-xl font-semibold">{currentMusic?.album.length > 15 ?
                                    <Marquee speed={40}>{currentMusic?.album} </Marquee> :
                                    currentMusic?.album}</h4>
                                <p className="para">{currentMusic?.artist}</p>
                            </div>
                            <button className="lg:ml-0 ml-auto z-10">
                                <UseHeart songId={currentMusic?._id} size={30} />
                            </button>
                        </div>
                        <Box width={'100%'} marginBottom={-1}>
                            <Slider
                                size="medium"
                                value={progress ? progress : 0}
                                min={0}
                                max={100}
                                onChange={(e, newVal) => { handleSliderChange(newVal); }}
                                onChangeCommitted={(e, newVal) => handleSeek(newVal)}
                                onMouseDown={() => { setDrag(true); audio.pause() }}
                                onMouseUp={() => { setDrag(false); audio.play() }}
                            />
                        </Box>
                        <div className="flex items-center justify-between gap-x-3">
                            {
                                current ?
                                    <span className="para">{current.minute ? current.minute : '0'}:{current.second?.toString().length < 2 ? '0' + current.second : current.second ? current.second : '00'}</span> :
                                    <span className="para">0:0</span>
                            }
                            {isNaN(duration.minute * 60 + duration.second) ? <span className="para">0:00</span> : <span className="para">{duration.minute}:{duration.second?.toString().length < 2 ? duration.second + '0' : duration.second}</span>
                            }
                        </div>
                        {current ?
                            <div className="flex items-center gap-x-3 justify-between">
                                <button onClick={handleRepeat} className={`cursor-pointer transition-colors ${repeat && 'text-[#49DC67]'} hover:text-[#49DC67]`}><Repeat /></button>
                                <button onClick={handlePrev} className="cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67]"><SkipBack fill="currentColor" /></button>
                                <button className="cursor-pointer transition-colors bg-prime hover:scale-105 p-3 rounded-full">{
                                    play ?
                                        <Pause onClick={() => { audioRef.current.pause(); setPlay(false) }} fill="currentColor" /> :
                                        <Play onClick={() => { audioRef.current.play(); setPlay(true) }} fill="currentColor" />
                                }</button>
                                <button onClick={() => { setProgress(0); setCurrent({ minute: 0, second: 0 }); next(); setRepeat(false); }} className="cursor-pointer transition-colors hover:text-[#49DC67] hover:fill-[#49DC67]"><SkipForward fill="currentColor" /></button>
                                <button className="cursor-pointer transition-colors hover:text-[#49DC67]"><Shuffle /></button>
                            </div> :
                            <span className="z-10 loading loading-spinner loading-xl text-[white]" ></span >
                        }
                    </div>
                </div>
            </div >
        </>
    );
};
export default MusicBar;