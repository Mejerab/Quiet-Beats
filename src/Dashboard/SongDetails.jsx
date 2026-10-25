import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaArrowLeftLong, FaPause, FaPlay } from "react-icons/fa6";
import { BadgePlus, Check, Ear, X } from "lucide-react";
import { useEffect, useState } from "react";
import useMusic from "../hooks/useMusic";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UserHook from "../hooks/UserHook";
import toast from "react-hot-toast";
import UseHeart from "../hooks/useHeart";
import FormattedSongs from "./playlist/FormattedSongs";

const SongDetails = () => {
    const axiosPublic = useAxiosPublic();
    const [isOpen, setIsOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [query, setQuery] = useState('');
    const { setCurrentMusic, setPlay, currentMusic, play } = useMusic();
    const user = UserHook();
    const { id } = useParams();
    const { data: song, isLoading } = useQuery({
        queryKey: ['songDetail', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/uploads/${id}`)
            return res.data;
        }
    })
    const { data: playlists = [], isLoading: load, refetch } = useQuery({
        queryKey: ['playlists', user?.email, query],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/playlists/search/${user.email}?query=${query}`)
            return res.data;
        }
    })
    const { data: relatedSongs } = useQuery({
        queryKey: ['genreSongs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/songs/genre/${song.genre}/${song._id}?limit=${5}`)
            return res.data;
        }
    })

    const dirrection = song?.artist.toLowerCase().replaceAll(' ', '_');
    useEffect(() => {
        if (currentMusic && song) {
            if (currentMusic._id === song._id && play) {
                setPlaying(true);
            }
            else {
                setPlaying(false);
            }
        }
    }, [currentMusic, song, play])
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPlaying(!playing);
        delete song.publisher;
        setCurrentMusic(song);
        setPlay(true)
        if (currentMusic._id === song._id) {
            setPlay(!playing)
        }
    }
    const [selected, setSelected] = useState([]);
    const [initial, setInitial] = useState(null);
    useEffect(() => {
        const exist = playlists?.
            filter(p => p.songs?.includes(id)).
            map(p => p._id || []);
        setInitial(exist);
        setSelected(exist);
    }, [playlists, id])
    const handleSelect = (id) => {
        setSelected(prev =>
            prev?.includes(id) ? prev.filter(pre => pre !== id) :
                [...prev, id]
        )
    }
    const hasChanged = JSON.stringify(selected) !== JSON.stringify(initial) ? true : false;
    const handleAdd = async () => {
        const addTo = selected.filter(id => !initial.includes(id));
        const removeFrom = initial.filter(id => !selected.includes(id));
        const res = await axiosPublic.patch(`/playlists/update-song`, { songId: id, addTo, removeFrom });
        if (res.data.success) {
            setIsOpen(false);
            refetch();
            toast.success('Playlists has been updated successfully.', {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
        }
    }
    if (isLoading) return <div className="h-screen w-full flex items-center justify-center">< span className="z-10 loading loading-spinner loading-xl text-[white]" ></span ></div>
    return (
        <div>
            <div className="lg:h-97.5 lg:py-0 py-6 bg-[linear-gradient(150deg,#3fbf6a_0%,#1f2a33_40%,#1a232c_60%,#3fbf6a_100%)] w-full rounded-xl">
                <div className="max-w-330 mx-auto lg:px-3 px-2 h-full flex flex-col justify-center">
                    <div className="flex items-center gap-x-6 mb-4 pl-2">
                        <Link to={'/dashboard/all-songs'}><FaArrowLeftLong /></Link>
                        <p className="text-lg"><Link className="text-[#ffffff99]" to={-1}>Albums</Link> / {song?.album}</p>
                    </div>
                    <div className="lg:flex items-center gap-x-9">
                        <div className="relative group lg:py-0 py-4">
                            <img src={song.image} className="w-60 h-60 rounded-full object-fill lg:mx-0 mx-auto" alt="" />
                            <div className="absolute left-1/2 top-full group-hover:opacity-100 group-hover:visible tra group-hover:top-1/2 transition-opacity opacity-0 invisible -translate-1/2">
                                <button onClick={(e) => { handleClick(e) }} className="bg-[#49DC67B3] cursor-pointer rounded-full h-15 w-15 flex items-center justify-center transition-all duration-200 hover:bg-[#49DC67]">
                                    {playing ?
                                        <FaPause className="text-lg " /> :
                                        <FaPlay className="text-lg " />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-bold">{song.album}</h3>
                            <p className="para -mt-2"><Link to={`/dashboard/artist/${dirrection}`} className="hover:underline">{song.artist}</Link>{song.feat ? <span>, {song.feat}</span> : ''}</p>
                            <div className="flex items-center gap-x-5">
                                <div className="border-2 py-3 w-32 justify-center gap-x-4 border-[#49DC67] flex items-center rounded-lg">
                                    <UseHeart songId={id} size={25} />
                                    <p>{song.lovedBy.length ? song.lovedBy.length < 10 ? `0${song.lovedBy.length}` : song.lovedBy.length : 0}</p>
                                </div>
                                <span className="text-base font-semibold border-[#49DC67] flex items-center gap-x-3 border-2 rounded-lg p-3"><Ear size={25} color="#49DC67" /> {song?.views?.length ? song?.views.length < 10 ? `0${song?.views.length}` : song?.views.length : 0}</span>
                                <div className="relative w-fit h-7.5 group">
                                    <button onClick={() => setIsOpen(true)} className="hover:-rotate-90 hover:text-[#49DC67] cursor-pointer transition-transform"><BadgePlus size={27} /></button>
                                    <p className="transition-opacity opacity-0 invisible group-hover:opacity-100 group-hover:visible w-38.25 rounded-lg p-1 px-2 bg-[#49DC6799] absolute -top-7 left-1/2 -translate-1/2">Add to a playlist</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-7 space-x-5 flex items-center">
                <button className="font-bold text-2xl text-[#49DC67] relative">Related Songs
                    <div className="absolute -bottom-3 left-0 w-full">
                        <div className={`w-full h-0.5 rounded-full bg-[#49DC67]`}></div>
                    </div>
                </button>
            </div>
            <div className="mt-5">
                {relatedSongs?.length ?
                    relatedSongs.map((song, idx) => <FormattedSongs key={song._id} idx={idx} song={song} songs={relatedSongs}></FormattedSongs>) :
                    <p className="text-xl text-center text-[#49DC67] py-6">No Related Songs Found.</p>
                }
                <div className="mx-auto w-fit">
                    <Link to='/dashboard/all-songs' className="btn mt-6 text-center w-55 h-14.5 tracking-[-1px] rounded text-xl font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10" >See More Songs</span ></Link >
                </div>
            </div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font" onClose={(close)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#00000033]">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                            <DialogTitle as="h2" className="text-2xl/7 font-medium text-white text-center">
                                <span className="text-[#49DC67]">Add</span> To <span className="text-[#49DC67]">Playlist</span>
                            </DialogTitle>
                            <div className="mt-4 space-y-5 mx-auto">
                                <div className="relative">
                                    <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Find a Playlist" className="input w-full pl-10 bg-[#121212B3] placeholder:text-[#ffffff66] text-white rounded border border-[#49DC67] focus:outline-0 focus:border-2" />
                                    <svg width="18" height="18" className="absolute top-2.5 left-3 z-20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#ffffff99" />
                                    </svg>
                                </div>
                                {
                                    playlists.length ?
                                        playlists?.map(item =>
                                            <button onClick={() => handleSelect(item._id)} className="flex items-center gap-x-4 hover:bg-[#00000033] p-2 rounded-lg cursor-pointer w-full" key={item._id}>
                                                <img className="w-16 rounded-lg" src={item.photo} alt="" />
                                                <div>
                                                    <h4>{item.name}</h4>
                                                    <p className="para">{item.songs?.length ? item.songs.length : '0'} Songs</p>
                                                </div>
                                                {
                                                    selected?.find(p => p === item._id) ?
                                                        <div className="rounded-full bg-[#49DC67] w-4.25 h-4.25 flex items-center justify-center ml-auto mr-2">
                                                            <Check size={13} />
                                                        </div> :
                                                        <div className="rounded-full border border-[#ffffff66] w-4.25 h-4.25 flex items-center justify-center ml-auto mr-2">
                                                        </div>
                                                }
                                            </button>
                                        ) :
                                        <p className="text-xl text-[#49DC67] text-center my-5 mt-12">Opps! No Match Found.</p>
                                }
                                {
                                    load && <div className="h-full w-full flex items-center justify-center">< span className="z-10 loading loading-spinner loading-xl text-[#49DC67]" ></span ></div>
                                }
                                <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 cursor-pointer w-6 h-6 rounded-full bg-[#00000066] flex items-center justify-center text-[#49DC67]"><X size={16} /></button>
                                <div className="space-x-4">
                                    <button onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-[14.5px] text-sm ">Cancle</button>
                                    {hasChanged && <button onClick={handleAdd} className="cursor-pointer hover:text-[14.5px] text-sm btn text-black bg-[#49DC67]">Done</button>}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default SongDetails;