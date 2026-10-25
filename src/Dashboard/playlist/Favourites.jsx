import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UserHook from "../../hooks/UserHook";
import FormattedSongs from "./FormattedSongs"; 

const Favourites = () => {
    const axiosPublic = useAxiosPublic();
    const user = UserHook();
    const { data, isLoading } = useQuery({
        queryKey: ['likedSongs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/liked-songs/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <div className="h-fit lg:h-97.5 bg-[linear-gradient(150deg,#3fbf6a_0%,#1f2a33_40%,#1a232c_60%,#3fbf6a_100%)] w-full rounded-xl">
                {isLoading ?
                    <span className="z-10 loading loading-spinner loading-xl text-[white]" ></span> :
                    <div className="max-w-330 mx-auto lg:px-3 h-full flex flex-col justify-center p-6">
                        <div className="flex items-center gap-x-6 mb-4">
                            <Link to={-1}><FaArrowLeftLong /></Link>
                            <FaArrowRightLong />
                            <p className="text-lg"><Link className="text-[#ffffff99]" to={-1}>Albums</Link> / Favourites</p>
                        </div>
                        <div className="flex items-center gap-x-9">
                            <div className="relative group lg:block hidden">
                                <img src='https://i.ibb.co.com/RTDBfXqK/favourite.png' className="w-60 h-60 rounded-full object-fill" alt="" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-3xl font-bold">All Favourites</h3>
                                <p className="para text-xl">{user?.displayName} . {data.length < 10 ? `0${data.length}` : data.length}</p>
                            </div>
                        </div>
                    </div>
                }
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

export default Favourites;