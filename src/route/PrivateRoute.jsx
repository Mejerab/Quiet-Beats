import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data, isLoading } = useQuery({
        queryKey: ['data', user],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    
    if (loading || isLoading) {
        return <div className="min-h-screen flex items-center justify-center w-full">
            <span className="loading loading-spinner loading-xl text-[#49DC67]"></span>
        </div>;
    }
    if (data && user) {
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;