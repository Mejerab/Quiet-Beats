import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import UserHook from "../hooks/UserHook";
import useAxiosPublic from "../hooks/useAxiosPublic";


const LikeContext = createContext(null);

const LikedSongsProvider = ({ children }) => {
    const user = UserHook();
    const axiosPublic = useAxiosPublic();
    const [likedSongs, setLikedSongs] = useState(new Set());
    const { data } = useQuery({
        queryKey: ['liked', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/liked-songs/${user.email}`);
            return res.data;
        }
    })
    useEffect(() => {
        const id = data?.map(p => p._id)
        setLikedSongs(new Set(id));
    }, [data])
    return (
        <LikeContext.Provider value={{ likedSongs, setLikedSongs }}>
            {children}
        </LikeContext.Provider>
    );
};
LikeContext.propTpyes = {
    children: PropTypes.node
}

export { LikedSongsProvider, LikeContext };