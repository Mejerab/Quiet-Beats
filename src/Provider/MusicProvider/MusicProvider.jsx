
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
    const axiosPublic = useAxiosPublic();

    const [currentMusic, setCurrentMusic] = useState(null);
    const [source, setSource] = useState(null);
    const [play, setPlay] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [url, setUrl] = useState("");
    const [runningSongs, setRunningSongs] = useState([]);

    const uid = user?.uid;

    // Fetch songs
    const { data = [] } = useQuery({
        queryKey: ["runningSongs", url],
        enabled: !!url,
        queryFn: async () => {
            const res = await axiosPublic.get(url);
            return res.data;
        },
    });

    // Update running songs when query data changes
    useEffect(() => {
        setRunningSongs(data);
    }, [data]);

    // Restore the logged-in user's saved source
    useEffect(() => {
        if (!uid) {
            setSource(null);
            setUrl("");
            return;
        }

        const storageKey = `source-${uid}`;
        const encrypted = localStorage.getItem(storageKey);

        if (!encrypted) {
            setSource(null);
            setUrl("");
            return;
        }

        try {
            const secret = `${uid}-source`;
            const decode = CryptoJS.AES.decrypt(encrypted, secret);
            const decrypted = decode.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                setSource(null);
                setUrl("");
                return;
            }

            const savedSource = JSON.parse(decrypted);

            setSource(savedSource);
            setUrl(savedSource);
        } catch (error) {
            console.error("Could not restore saved source:", error);
            setSource(null);
            setUrl("");
        }
    }, [uid]);

    // Save the logged-in user's source
    useEffect(() => {
        if (!uid || source == null) return;

        const secret = `${uid}-source`;
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(source),
            secret
        ).toString();

        localStorage.setItem(`source-${uid}`, encrypted);
    }, [uid, source]);

    // Restore the logged-in user's current music
    useEffect(() => {
        if (!uid) {
            setCurrentMusic(null);
            setHydrated(false);
            return;
        }

        setHydrated(false);

        const storageKey = `Music-${uid}`;
        const encrypted = localStorage.getItem(storageKey);

        try {
            if (!encrypted) {
                setCurrentMusic(null);
                return;
            }

            const secret = `${uid}-music-v1`;
            const decode = CryptoJS.AES.decrypt(encrypted, secret);
            const decrypted = decode.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                setCurrentMusic(null);
                return;
            }

            setCurrentMusic(JSON.parse(decrypted));
        } catch (error) {
            console.error("Could not restore saved music:", error);
            setCurrentMusic(null);
        } finally {
            setHydrated(true);
        }
    }, [uid]);

    // Save the logged-in user's current music
    useEffect(() => {
        if (!uid || !hydrated) return;

        const storageKey = `Music-${uid}`;

        if (!currentMusic) {
            localStorage.removeItem(storageKey);
            return;
        }

        const secret = `${uid}-music-v1`;
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(currentMusic),
            secret
        ).toString();

        localStorage.setItem(storageKey, encrypted);
    }, [uid, currentMusic, hydrated]);

    // Previous song
    const prevv = () => {
        if (!runningSongs?.length || !currentMusic) return;

        const now = runningSongs.findIndex(
            (song) => song._id === currentMusic._id
        );

        if (now === -1) return;

        const previousSong =
            runningSongs[
                (now - 1 + runningSongs.length) % runningSongs.length
            ];

        setCurrentMusic(previousSong);
    };

    // Next song
    const next = () => {
        if (!runningSongs?.length || !currentMusic) return;

        const now = runningSongs.findIndex(
            (song) => song._id === currentMusic._id
        );

        if (now === -1) return;

        const nextSong = runningSongs[(now + 1) % runningSongs.length];

        setCurrentMusic(nextSong);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleDown = (e) => {
            const tag = e.target.tagName;

            if (tag === "INPUT" || tag === "TEXTAREA") return;

            if (
                e.code === "Space" &&
                location.pathname.includes("dashboard")
            ) {
                e.preventDefault();
                setPlay((prev) => !prev);
            } else if (e.ctrlKey && e.code === "KeyR") {
                window.location.reload();
            }
        };

        document.addEventListener("keydown", handleDown);

        return () => {
            document.removeEventListener("keydown", handleDown);
        };
    }, [location.pathname]);

    const info = {
        currentMusic,
        setCurrentMusic,
        play,
        setPlay,
        setSource,
        source,
        runningSongs,
        setRunningSongs,
        next,
        prevv,
    };

    return (
        <MusicContext.Provider value={info}>
            {children}
        </MusicContext.Provider>
    );
};

MusicProvider.propTypes = {
    children: PropTypes.node,
};

export { MusicProvider, MusicContext };
