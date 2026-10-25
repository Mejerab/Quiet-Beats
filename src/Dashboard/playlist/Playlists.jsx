import { useQuery } from "@tanstack/react-query";
import AddPlaylist from "../playlist/AddPlaylist";
import UserHook from "../../hooks/UserHook";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import PaginationHook from "../../hooks/PaginationHook";

const Playlists = () => {
    const user = UserHook();
    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['lists', !!user],
        queryFn: async () => {
            const res = await axiosPublic.get(`/playlists/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <div className="max-w-330 mx-auto mt-3 grid grid-cols-2 lg:grid-cols-5 items-center gap-7">
                <AddPlaylist />
                {
                    isLoading ? <div className="min-h-full flex items-center justify-center w-full">
                        <span className="loading loading-spinner loading-xl text-[#49DC67]"></span>
                    </div> :
                        data.map(list =>
                            <Link to={`/dashboard/playlist/${list._id}`} className="w-44 lg:w-56 lg:h-72 p-2.5 hover:bg-[#49DC6711] transition-colors bg-[#00000066] rounded-lg cursor-pointer" key={list._id}>
                                <img className="object-contain rounded-lg" src={list.photo} alt="" />
                                <div>
                                    <h4 className="text-lg font-semibold text-white space-y-3 mt-3">{list.name}</h4>
                                </div>
                                <p className="para">Songs: {list?.songs ? list?.songs.length : 0}</p>
                            </Link>
                        )
                }
            </div>
            {/* <PaginationHook /> */}
        </div>
    );
};

export default Playlists;