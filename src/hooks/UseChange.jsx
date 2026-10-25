import { useEffect } from "react";
import useMusic from "./useMusic";

const UseChange = ({song, playing, setPlaying}) => {
    const { setCurrentMusic, setPlay, currentMusic, play } = useMusic();
    useEffect(() => {
        if (!currentMusic || !song) return;
            if (currentMusic._id === song._id && play) {
                setPlaying(true);
            }
            else {
                setPlaying(false);
            }
    }, [currentMusic, song, play, setPlaying])
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPlaying(!playing);
        delete song.publisher;
        setCurrentMusic(song);
        setPlay(true)
        if (currentMusic?._id === song._id) {
            setPlay(!playing)
        }
    }
    return handleClick;
};

export default UseChange;