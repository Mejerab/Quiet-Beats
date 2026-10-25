import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { AuthContext } from "../AuthProvider";
import { useLocation } from "react-router";

const MusicContext = createContext(null);

const MusicProvider = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [source, setSource] = useState(null);
    const [play, setPlay] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [url, setUrl] = useState('');
    const { data = [] } = useQuery({
        queryKey: ['runningSongs', url],
        enabled: !!url,
        queryFn: async () => {
            const res = await axiosPublic.get(`${url}`);
            return res.data;
        }
    })
    const [runningSongs, setRunningSongs] = useState(data);
    useEffect(() => {
        if (data.length > 0) {
            setRunningSongs(data);
        }
    }, [data]);
    // const fetchItem = async (url) => {
    //     const res = await axiosPublic.get(`/sorting${url}`);
    //     setRunningSongs(res.data);
    // }
    useEffect(() => {
        if (!user.uid) return;
        const encrypted = localStorage.getItem('source');
        if (!encrypted) return;
        const secret = `${user.uid}-source`;
        try {
            const decode = CryptoJS.AES.decrypt(encrypted, secret);
            const dcrypt = decode.toString(CryptoJS.enc.Utf8);
            if (dcrypt) {
                const url = JSON.parse(dcrypt);
                if (!url) return;
                // console.log(url);
                setUrl(url)
            }
            else {
                console.warn('Decrypt Error');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }, [user.uid])
    useEffect(() => {
        if (!user.uid || !source) return;
        const secret = `${user.uid}-source`;
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(source),
            secret
        ).toString();
        localStorage.setItem('source', encrypted);
    }, [user.uid, source])
    const prevv = () => {
        if (!runningSongs?.length || !currentMusic) return;
        const now = runningSongs.findIndex(i => i._id === currentMusic._id);
        if (now === -1) return;
        const data = runningSongs[(now - 1 + runningSongs.length) % runningSongs.length];
        setCurrentMusic(data);
    }
    const next = () => {
        if (!runningSongs?.length || !currentMusic) return;
        const now = runningSongs.findIndex(song => song._id === currentMusic._id);
        if (now === -1) return;
        const data = runningSongs[(now + 1) % runningSongs.length];
        setCurrentMusic(data);
    }
    useEffect(() => {
        const handleDown = (e) => {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (e.code === 'Space' && location.pathname.includes('dashboard')) {
                setPlay(prev => !prev)
            }
            else if (e.ctrlKey && e.code === 'KeyR') {
                window.location.reload(true);
            }
        }
        document.addEventListener('keydown', handleDown);
        return () => document.removeEventListener('keydown', handleDown)
    }, [])
    useEffect(() => {
        if (!user?.uid) return;
        const secret = `${user.uid}-music-v1`;
        if (!secret) return null;
        const encrypted = localStorage.getItem('Music');
        if (encrypted) setHydrated(true);
        try {
            const decode = CryptoJS.AES.decrypt(encrypted, secret);
            setCurrentMusic(JSON.parse(decode.toString(CryptoJS.enc.Utf8)))
        } catch (error) {
            console.log(error);
        } finally {
            setHydrated(true);
        }
    }, [user.uid])
    useEffect(() => {
        if (!user?.uid || !currentMusic || !hydrated) return;
        const secret = `${user.uid}-music-v1`;
        if (!secret) return null;
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(currentMusic),
            secret
        ).toString();
        localStorage.setItem('Music', encrypted);
    }, [currentMusic, hydrated, user.uid])
    const info = { currentMusic, setCurrentMusic, play, setPlay, setSource, source, runningSongs, setRunningSongs, next, prevv };
    return (
        <MusicContext.Provider value={info}>
            {children}
        </MusicContext.Provider>
    );
};

MusicProvider.propTpyes = {
    children: PropTypes.node
}

export { MusicProvider, MusicContext };