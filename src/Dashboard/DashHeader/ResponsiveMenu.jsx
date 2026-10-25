import { Link, useLocation } from "react-router";
import { IoClose } from "react-icons/io5";
import { BadgePlus, BookCopy, BookHeart, ListMusic, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const ResponsiveMenu = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation().pathname;
    const [locate, setlocate] = useState(location);
    useEffect(() => {
        if (location !== locate) {
            setOpen(false); 
            setlocate();
        }
    }, [locate, location])
    const size = true;
    return (
        <div className="">
            <button onClick={() => setOpen(!open)} className="z-9999 relative text-3xl lg:hidden">{open ? <IoClose className="" /> : <Menu className="" />}</button>
            <div className={`fixed top-0 left-0 z-9998 w-full min-h-screen p-6 bg-[#00000099] transition-transform duration-700 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="mt-18 text-base space-y-4">
                    <Link to={'/dashboard'} data-tip="Releases" className="tooltip btn border-[#49DC67] border-2 rounded-xl py-6 bg-transparent font-bold justify-start w-full hover:bg-[#121212] hover:text-[#49DC67]"><svg className={`${size ? '-rotate-12' : ''} transition-all duration-500`} version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="35" height="45" x="0" y="0" viewBox="0 0 48 48" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve"><g transform="matrix(1,3.67394039744206e-16,-3.67394039744206e-16,1,7.105427357601002e-15,-7.105427357601002e-15)"><path d="M38.409 14.481A9.021 9.021 0 0 0 31.316 11H10.593c-4.962 0-9 4.038-9 9v8c0 4.962 4.038 9 9 9h20.723a9.029 9.029 0 0 0 7.272-3.697l4.635-6.357a4.97 4.97 0 0 0 .508-4.996c2.706-2.98 3.49-6.526 1.75-8.266-1.496-1.497-4.364-1.126-7.072.797zm3.198 11.286-4.635 6.357A7.024 7.024 0 0 1 31.316 35H10.593c-3.86 0-7-3.14-7-7v-8c0-3.86 3.14-7 7-7h20.723a7.02 7.02 0 0 1 5.656 2.876l4.199 5.759a9.941 9.941 0 0 1-1.948 1.307C38.755 21.252 37.22 20 35.383 20c-.278 0-.55.029-.812.084-.009.002-.017.007-.027.008A4.005 4.005 0 0 0 31.383 24c0 2.206 1.794 4 4 4 1.815 0 3.334-1.223 3.821-2.883a10.735 10.735 0 0 0 2.923-1.67 2.984 2.984 0 0 1-.52 2.32zm-5.662-2.559c-.299-.295-.365-.756-.344-1.186.848.093 1.536.71 1.726 1.524-.608.057-1.097-.053-1.382-.338zm.702 2.329a1.98 1.98 0 0 1-1.264.463c-1.103 0-2-.897-2-2 0-.377.111-.725.293-1.027.129.654.417 1.217.86 1.654.542.542 1.268.839 2.111.91zm5.95-5.34-3.002-4.117c1.942-1.366 3.807-1.646 4.471-.982.771.77.278 2.964-1.469 5.099z" fill="currentColor" opacity="1" data-original="currentColor"></path><path d="M11.933 19.496a1 1 0 0 0-1 1v3.654L7.95 19.92a1 1 0 0 0-1.817.576v6.808a1 1 0 0 0 2 0V23.65l2.983 4.23a1 1 0 0 0 1.817-.576v-6.808a1 1 0 0 0-1-1zM18.186 26.303h-2.344v-1.404h2.02a1 1 0 0 0 0-2h-2.019v-1.403h2.185a1 1 0 0 0 0-2h-3.187a1 1 0 0 0-1 1l.002.012-.002 6.795a1 1 0 0 0 1 1h3.344a1 1 0 0 0 .001-2zM29.291 19.573a1 1 0 0 0-1.218.719l-.943 3.665-1.401-3.819c-.195-.348-.516-.647-.94-.647s-.749.296-.939.646l-1.401 3.819-.943-3.665a1 1 0 0 0-1.937.499l1.744 6.775a.998.998 0 0 0 1.906.095l1.569-4.275 1.569 4.275a1 1 0 0 0 .938.655l.05-.001a.996.996 0 0 0 .918-.749l1.744-6.775a.996.996 0 0 0-.716-1.217z" fill="currentColor" opacity="1" data-original="currentColor"></path></g></svg> {size && 'New Releases'}</Link>

                    <Link data-tip="Upload" to='/dashboard/upload' className="tooltip btn border-[#49DC67] border-2 rounded-xl py-6 bg-transparent font-bold justify-start w-full hover:bg-[#121212] hover:text-[#49DC67]"><BadgePlus className={`${!size ? 'ml-1' : 'mr-2'} text-2xl transition-all duration-500`} /> {size && 'Add Song'}</Link>

                    <Link data-tip="Favourites" to='/dashboard/favourites' className="tooltip btn border-[#49DC67] border-2 rounded-xl py-6 bg-transparent font-bold justify-start w-full hover:bg-[#121212] hover:text-[#49DC67]"><BookHeart className={`${!size ? 'ml-1' : 'mr-2'} text-2xl transition-all duration-500`} /> {size && 'Favourites'}</Link>

                    <Link data-tip="Playlists" to='/dashboard/playlists' className="tooltip btn border-[#49DC67] border-2 rounded-xl py-6 bg-transparent font-bold justify-start w-full hover:bg-[#121212] hover:text-[#49DC67]"><ListMusic className={`${!size ? 'ml-1' : 'mr-2'} text-2xl transition-all duration-500`} /> {size && 'Playlists'}</Link>

                    <Link data-tip="All Songs" to='/dashboard/all-songs' className="tooltip btn border-[#49DC67] border-2 rounded-xl py-6 bg-transparent font-bold justify-start w-full hover:bg-[#121212] hover:text-[#49DC67]"><BookCopy className={`${!size ? 'ml-1' : 'mr-2'} text-2xl transition-all duration-500`} /> {size && 'All Songs'}</Link>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveMenu;