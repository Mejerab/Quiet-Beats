import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import FormattedSongs from "./FormattedSongs";

const PlayAccess = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tab, setTab] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['playlist', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/playlist/${id}`)
            return res.data;
        }
    })
    const { data: songs, isLoading: load } = useQuery({
        queryKey: ['playlistSongs', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/playlist/${data._id}/songs`)
            return res.data;
        }
    })
    if (isLoading || load) return <div className="h-screen w-full flex items-center justify-center">< span className="z-10 loading loading-spinner loading-xl text-[white]" ></span ></div>
    return (
        <div className="mt-5">
            <div className="h-101 lg:h-97.5 bg-[linear-gradient(150deg,#3fbf6a_0%,#1f2a33_40%,#1a232c_60%,#3fbf6a_100%)] w-full rounded-xl">
                <div className="max-w-330 mx-auto lg:px-3 px-2 h-full flex flex-col justify-center">
                    <div className="flex items-center gap-x-6 mb-4 lg:ml-0 ml-2">
                        <FaArrowLeftLong onClick={()=>navigate(-1)} className="cursor-pointer"/>
                        <FaArrowRightLong />
                        <p className="text-lg"><Link className="text-[#ffffff99]" to={-1}>Playlists</Link> / {data?.name}</p>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:items-center gap-5 lg:gap-9 lg:py-0">
                        <img src={data?.photo} className="w-60 h-60 rounded-full lg:mx-0 mx-auto object-cover" alt="" />
                        <div className="ml-2">
                            <h3 className="text-3xl font-bold">{data?.name}</h3>
                            <p className="para">Songs: {data?.length < 10 ? `0${songs?.length}` : songs?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-330 mx-auto">
                <div className="my-7 space-x-5 flex items-center">
                    <button onClick={() => setTab(true)} className="cursor-pointer font-bold text-2xl text-[#49DC67] relative">Songs ({songs?.length})
                        <div className="absolute -bottom-3 left-0 w-full">
                            <div className={`${tab && 'w-full scale-x-100'} scale-x-0 inset-0 origin-right transition-transform ease h-0.5 rounded-full bg-[#49DC67] duration-300`}></div>
                        </div>
                    </button>
                    <button onClick={() => setTab(false)} className="cursor-pointer font-bold text-2xl text-[#49DC67] relative">Songs ({songs?.length})
                        <div className={`${!tab ? ' w-full' : 'w-0'} absolute -bottom-3 transition-[width] ease left-0 h-0.5 rounded-full bg-[#49DC67] duration-300`}></div>
                    </button>
                </div>
                <div>
                    {
                        !load &&
                            songs.length ?
                            songs.map((song, idx) =>
                                <FormattedSongs key={song._id} song={song} idx={idx} songs={songs} dataId={data._id} />
                            ) :
                            <div className="h-full flex items-center justify-center">No Songs found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PlayAccess;