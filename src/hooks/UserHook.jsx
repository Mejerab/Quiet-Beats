import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UserHook = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading, setLoading } = useContext(AuthContext);
    const { data: foundUser } = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    })
    setLoading(false);
    return foundUser;
};

export default UserHook;