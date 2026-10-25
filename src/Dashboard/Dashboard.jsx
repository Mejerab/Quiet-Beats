import { Outlet, useLocation } from "react-router";
import SideNav from "./SideNav";
import SplitedText from "../animation/SplitedText";
import DashHeader from ".//DashHeader/DashHeader";
import MusicBar from "./MusicBar";
import { MusicProvider } from "../Provider/MusicProvider/MusicProvider";
import { LikedSongsProvider } from "../Provider/LikedSongsProvider";
import Footer from "../shared/Footer";

const Dashboard = () => {
    const location = useLocation();
    SplitedText();
    return (
        <div className="relative flex flex-col justify-between h-screen">
            <MusicProvider>
                <LikedSongsProvider>
                    <div className="flex font bg-[#1F1F1F] h-full overflow-auto pb-3">
                        <SideNav />
                        <div className={`w-full grow lg:px-3 px-2 ${location.pathname.includes('/upload') && 'my-auto'}`}>
                            {!location.pathname.includes('/upload') && <DashHeader />}
                            <div className="pb-3">
                                <Outlet />
                            </div>
                        </div>

                    </div>
                    <MusicBar />
                </LikedSongsProvider>
            </MusicProvider>
        </div>
    );
};

export default Dashboard;