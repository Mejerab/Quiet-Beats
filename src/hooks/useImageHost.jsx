
const useImageHost = () => {
    const hostKey = import.meta.env.VITE_HOSTINGURL;
    const hostingURL = `https://api.imgbb.com/1/upload?key=${hostKey}`;
    return hostingURL;
};

export default useImageHost;