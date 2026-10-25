import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import UserHook from "./UserHook";

const ViewHook = ({ currentMusic, play }) => {
    const axiosPublic = useAxiosPublic();
    const user = UserHook();
    const [sec, setSec] = useState(JSON.parse(localStorage.getItem('count')) || 0);
    const counted = useRef(sec >= 30 ? true : false);
    const now = new Date();
    const second = now.getSeconds();
    const [previous, setPrevious] = useState(null);
    useEffect(() => {
        if (play) {
            setSec(prev => prev + 1);
        }
        localStorage.setItem('count', sec)
    }, [second])
    useEffect(() => {
        if (typeof(currentMusic?._id) === 'undefined') return;
        if (!previous) return setPrevious(currentMusic?._id);
        if (currentMusic?._id !== previous) {
            setSec(0);
            setPrevious(currentMusic?._id);
        }
        setPrevious(currentMusic?._id);
    }, [previous, currentMusic?._id])
    useEffect(() => {
        if (sec >= 30 && !counted.current && currentMusic && user) {
            axiosPublic.patch(`/songs/listened/${currentMusic._id}`, { user: user.email })
                .then(data => console.log(data.data))
            counted.current = true;
        }
    }, [sec, axiosPublic, counted, currentMusic, user])
};

export default ViewHook;