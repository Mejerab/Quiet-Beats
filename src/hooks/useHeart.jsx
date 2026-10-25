import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import UserHook from "./UserHook";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useContext } from "react";
import { LikeContext } from "../Provider/LikedSongsProvider";
import { useQueryClient } from "@tanstack/react-query";


const UseHeart = ({ songId, size }) => {
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();
    const user = UserHook();
    const { likedSongs, setLikedSongs } = useContext(LikeContext);
    const liked = likedSongs.has(songId);
    // console.log(liked, likedSongs);
    
    const handleLike = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to add this song to your favourite list!",
            icon: "warning",
            showCancelButton: true,
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            backdrop: 'blur(50px) grayscale(50%)',
            confirmButtonColor: "#49DC67",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const action = liked ? 'remove' : 'place';
                const res = await axiosPublic.patch(`/update-likes/${songId}`, { send: user.email, action })
                console.log(res.data);
                Swal.fire({
                    title: "Success!",
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    backdrop: 'blur(50px) grayscale(50%)',
                    text: "Your file has been added to your favourite list.",
                    icon: "success",
                    confirmButtonColor: '#49DC67',
                    confirmButtonText: 'Return'
                });
                setLikedSongs(prev => {
                    const updated = new Set(prev);
                    updated.has(songId) ? updated.delete(songId) : updated.add(songId)
                    console.log(updated);
                    return updated;
                })
                queryClient.invalidateQueries(['songDetail'])
            }
        });
    }
    motion;
    return (
        <div>
            <motion.div
                whileTap={{ scale: 0.8 }}
                animate={liked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => { handleLike(songId); }}
                style={{ cursor: "pointer" }}
            >
                <Heart
                    size={size}
                    color={liked ? "#ff4d6d" : "#fff"}
                    fill={liked ? '#ff4d6d' : 'transparent'}
                />
            </motion.div>
        </div>
    );
};

export default UseHeart;