import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useLocation } from "react-router";
import { UserRound } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FormattedSongs from "./playlist/FormattedSongs";

const ArtistPage = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const divide = location.pathname.split('artist/');
    const { data, isLoading } = useQuery({
        queryKey: ['artistSongs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/artist/songs/${divide[1]}`)
            return res.data;
        }
    })
    const divided = divide[1][0] === '_'? divide[1].slice(1) : divide[1];
    const name = divided.replace('_', ' ').split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
    return (
        <div>
            <div className="lg:h-97.5 py-6 bg-[linear-gradient(150deg,#3fbf6a_0%,#1f2a33_40%,#1a232c_60%,#3fbf6a_100%)] w-full rounded-xl">
                <div className="max-w-330 mx-auto lg:px-3 px-2 h-full flex flex-col justify-center">
                    <div className="flex items-center gap-x-6 mb-4 pl-2">
                        <Link to={-1}><FaArrowLeftLong /></Link>
                        <p className="text-lg"><Link className="text-[#ffffff99]" to={-1}>Artists</Link> / {name}</p>
                    </div>
                    <div className="lg:flex items-center gap-x-9 lg:py-0">
                        <div className="relative group">
                            <div className="w-60 h-60 rounded-full my-4 lg:my-0 lg:x-0 mx-auto bg-linear-to-br from-[#00000099] to-[#49DC6799] flex items-center justify-center"><UserRound size={90} /></div>
                            <div className="absolute left-1/2 top-full group-hover:opacity-100 group-hover:visible tra group-hover:top-1/2 transition-opacity opacity-0 invisible -translate-1/2">
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-bold">{name}</h3>
                            <p className="para -mt-2">Songs: {data?.length < 10 ? `0${data?.length}` : data?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-330 mx-auto">
                <div className="my-7 space-x-5 flex items-center">
                    <button className="font-bold text-2xl text-[#49DC67] relative">Songs ({data?.length})
                        <div className="absolute -bottom-3 left-0 w-full">
                            <div className={`w-full h-0.5 rounded-full bg-[#49DC67]`}></div>
                        </div>
                    </button>
                </div>
                {!isLoading ?
                    data?.map((song, idx) =>
                        <FormattedSongs key={song._id} idx={idx} song={song} songs={data}></FormattedSongs>
                    ) :
                    <span className="z-10 loading loading-spinner loading-xl text-[white]" ></span>
                }
            </div>
        </div>
    );
};

export default ArtistPage;