import { useContext } from "react";
import { MusicContext } from "../Provider/MusicProvider/MusicProvider";

const useMusic = () => {
    const things = useContext(MusicContext);
    return things;
};

export default useMusic;