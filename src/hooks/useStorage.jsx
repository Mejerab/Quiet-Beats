import UserHook from "./UserHook";
import CryptoJS from "crypto-js";

const { user } = UserHook();
const generateSecret = (user) => {
    if (!user.uid) return;
    return `${user.uid}-music-v1`;
}
export const setItem = ({ music }) => {
    const secret = generateSecret(user);
    if (!secret) return null;
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(music),
        secret
    ).toString();
    localStorage.setItem('Music', encrypted);
}

const useStorage = () => {
    
};

export default useStorage;

// useEffect(() => {
//     const item = localStorage.getItem('Music');
//     if (item) {
//         setCurrentMusic(JSON.parse(item));
//     }
// }, [])
// useEffect(() => {
//     if (currentMusic) {
//         localStorage.setItem('Music', JSON.stringify(currentMusic));
//     }
// }, [currentMusic])