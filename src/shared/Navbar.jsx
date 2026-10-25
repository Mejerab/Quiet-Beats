import { Link } from "react-router";
import UserHook from "../hooks/UserHook";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const user = UserHook();
    const links = <>
        <li className="under relative"><Link to='/'>Home</Link></li>
        <li className="under relative"><Link to='/'>Songs</Link></li>
        <li className="under relative"><Link to='/dashboard'>Dashboard</Link></li>
    </>;
    return (
        <div className="navbar bg-transparent max-w-7xl mx-auto lg:px-3 px-2 pt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="h-23.25"><img src="/Logo 1.svg" alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex items-center gap-x-12 font-bold text-sm">
                    {links}
                </ul>
            </div>
            {user ?
                <div className="navbar-end -mt-1 flex items-center gap-x-5">
                    <svg width="22" height="25" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5001 0C6.70106 0 2.00005 4.70101 2.00005 10.5V16.7751L0.762614 18.0126C0.262118 18.5131 0.112395 19.2658 0.383262 19.9197C0.654129 20.5736 1.29224 21 2.00005 21H23.0001C23.7079 21 24.346 20.5736 24.6168 19.9197C24.8877 19.2658 24.738 18.5131 24.2375 18.0126L23.0001 16.7751V10.5C23.0001 4.70101 18.299 0 12.5001 0Z" fill="#ffffff99" />
                        <path d="M12.5 28C9.60051 28 7.25 25.6495 7.25 22.75H17.75C17.75 25.6495 15.3995 28 12.5 28Z" fill="#ffffff99" />
                    </svg>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-[#49DC67] ease-linear hover:shadow-[0_0_1px_6px_rgba(73,220,103,0.4)] transition-all duration-100">
                                <span className="font-bold text-lg h-full text-[#121212] flex items-center justify-center">{user?.photoURL ? <img className="w-10 rounded-full object-contain" src={user.photoURL} alt="" />: 'M'}</span>
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
                            <li><button onClick={() => logout()}>Logout</button></li>
                        </ul>
                    </div>
                </div> : <div className="navbar-end space-x-9">
                    <Link to='/register' className="cursor-pointer under relative">Register</Link>
                    <Link to='/login' className="cursor-pointer btn w-[100px] h-[45px] bg-[#121212] text-[#121212] hover:text-[#49DC67] border-0 overflow-hidden font-bold text-base rounded button-ani relative"><span className="z-10">Login</span></Link>
                </div>}
        </div>
    );
};

export default Navbar;