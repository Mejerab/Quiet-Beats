import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SearchData from "./SearchData";

const Search = () => {
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
    const handleInput = async (e) => {
        e.preventDefault();
        const q = e.target.value;
        const query = q.trim();
        if (!query || query === ',' || query.includes(',')) {
            return setData([]);
        }
        const res = await axiosPublic.get(`/search?query=${query}`);
        setData(res.data);
    }
    return (
        <div className="lg:flex-1 w-full">
            <div tabIndex={0} className="relative group w-full lg:w-[150%]">
                <form>
                    <input id="searchIn" onChange={handleInput} type="text" placeholder="Search" className="input w-full pl-10 bg-[#121212B3] placeholder:text-[#ffffff66] text-white rounded border border-[#49DC6733] focus:outline-0 focus:border-[#49DC67]" />
                    <svg width="18" height="18" className="absolute top-2.5 left-3 z-20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6Z" fill="#ffffff99" />
                    </svg>
                </form>
                <div className={`w-[130%] lg:w-[106%] max-h-90 overflow-y-scroll absolute top-12 left-1/2 -translate-x-1/2 p-2 space-y-2 bg-[#00000099] rounded-lg h-fit z-10 group-focus-within:block hidden`}>
                    {document.getElementById('searchIn')?.value ? data.length ?
                        data.map(item =>
                            <SearchData song={item} />
                        ) :
                        <h5 className="text-lg text-[#49DC67] mx-auto py-5 w-fit">No match found.</h5> :
                        <h5 className="text-lg text-[#49DC67] mx-auto py-5 w-fit">Search to find.</h5>
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;