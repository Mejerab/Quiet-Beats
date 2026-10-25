import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://quiet-beats-server.onrender.com',
        withCredentials: true
    })
    return axiosPublic;
};

export default useAxiosPublic;