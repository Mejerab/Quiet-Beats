import { BadgePlus, Bell, BookCopy, BookHeart, ListMusic, Menu } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UserHook from "../../hooks/UserHook";
import Search from "./SearchForm";
import { NavLink, useNavigate } from "react-router";
import ResponsiveMenu from "./ResponsiveMenu";

const DashHeader = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const user = UserHook();
    const handleLogout = () => {
        localStorage.clear();
        logout();
        navigate('/')
    }
    return (
        <div className="navbar max-w-330 mx-auto px-0">
            <div className="flex items-center justify-between w-full">
                <NavLink to={'/dashboard'} className='lg:hidden block'>
                    <img className="w-12" src="/Logo (1).png" alt="" />
                </NavLink>
                <div className="flex items-center justify-end gap-x-4 mr-4">
                    <Search />
                    <ResponsiveMenu />
                </div>
            </div>
            <div className="flex-none -mt-1 items-center gap-x-5 lg:flex hidden">
                <Bell fill="#ffffff99" stroke="#ffffff99" />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[#49DC67] ease-linear hover:shadow-[0_0_1px_6px_rgba(73,220,103,0.4)] transition-all duration-100">
                            <span className="font-bold text-lg h-full text-[#121212] flex items-center justify-center">{user?.photoURL ? <img className="w-10 rounded-full object-contain" src={user.photoURL} alt="" /> : 'M'}</span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;