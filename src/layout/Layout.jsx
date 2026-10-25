import { Outlet, useLocation, useNavigate } from "react-router";
import UserHook from "../hooks/UserHook";
import { useEffect } from "react";

const Layout = () => {
    const user = UserHook();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('login') || location.pathname.includes('register')) {
            if (user) {
                navigate('/dashboard');
            }
        }
    }, [user, location.pathname, navigate])
    return (
        <div className="font">
            <Outlet />
        </div>
    );
};

export default Layout;