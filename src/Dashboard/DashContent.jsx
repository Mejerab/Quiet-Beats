import { useQuery } from "@tanstack/react-query";
import PointHook from "../hooks/PointHook";
import Banner from "./Banner";
import SongDisplay from "./SongDisplay";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UserHook from "../hooks/UserHook";
import MostFav from "./MostFav";

const DashContent = () => {
    const axiosPublic = useAxiosPublic();
    const foundUser = UserHook();
    const { data } = useQuery({
        queryKey: ['mostFavourite', foundUser?.email],
        enabled: !!foundUser?.email,
        queryFn: async () => {

            const res = await axiosPublic.get(`/most-favourite/${foundUser.email}`);
            return res.data;
        }
    })
    return (
        data?.length > 0 && <div id="dash" className="relative">
            <Banner />
            <div className="space-y-9 mt-9">
                <div id={'most favourite'} className="mx-auto lg:px-3 max-w-330">
                    <PointHook title={'Most Favourite'} small />
                    <div className="grid lg:grid-cols-3 justify-between mt-4 gap-5 w-full!">
                        {
                            data.map((item, idx) =>
                                    <MostFav key={idx} item={item}/>
                            )
                        }
                    </div>
                </div>
                <SongDisplay type={'/sorting?type=latests'} nav={'latest'} title={'Latest Releases'} />
                <SongDisplay type={'/sorting?type=top-rated'} nav={'top-rated'} title={'Top Rated'} />
            </div>
        </div>
    );
};

export default DashContent;