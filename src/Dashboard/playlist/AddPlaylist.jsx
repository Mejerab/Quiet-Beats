import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { BadgePlus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useHostingUrl from "../../hooks/useImageHost";
import Swal from "sweetalert2";
import UserHook from "../../hooks/UserHook";

const AddPlaylist = () => {
    const user = UserHook();
    const axiosPublic = useAxiosPublic();
    const hostingUrl = useHostingUrl();
    const [isOpen, setIsOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [under, setUnder] = useState(false);
    const [drag, setDrag] = useState(false);
    const [photo, setPhoto] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    errors
    const handleChange = (e) => {
        setPhoto(e.target.files);
    }
    const onError = (errors) => {
        if (Object.values(errors)) {
            if (errors.image) return toast.error('Set an image for the playlist.', {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
        }
    }
    const onSubmit = async (data) => {
        setClick(true);
        console.log(data, user?.uid, user?.email);
        const imageData = { image: photo[0] };
        const imageRes = await axiosPublic.post(hostingUrl, imageData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }, withCredentials: false
        })
        if (imageRes.data) {
            const playlistData = { name: data.name, description: data.description, photo: imageRes.data.data.display_url, userEmail: user?.email, userId: user?.uid };
            const res = await axiosPublic.post('/playlists', playlistData)
            if (res.data) {
                Swal.fire({
                    title: 'Success',
                    text: 'You have successfully made a playlist.',
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    backdrop: 'blur(50px) grayscale(50%)',
                    customClass: {
                        confirmButton: 'swalButton',
                    }
                });
                setIsOpen(false);
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Facing some issues! Try again later.',
                    icon: 'error',
                    confirmButtonText: 'Return',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    backdrop: 'blur(50px) grayscale(50%)',
                    customClass: {
                        confirmButton: 'swalButton',
                    }
                })
            }
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Facing some issues! Try again later.',
                icon: 'error',
                confirmButtonText: 'Return',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                backdrop: 'blur(50px) grayscale(50%)',
                customClass: {
                    confirmButton: 'swalButton',
                }
            })
        }
    }
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="w-44 h-59 lg:w-56 lg:h-72 hover:bg-[#49DC6711] transition-colors bg-[#00000066] rounded-xl flex items-center justify-center cursor-pointer group">
                <div className="flex flex-col items-center justify-center gap-4">
                    <BadgePlus className="text-[#49DC67] transition-transform group-hover:-rotate-90" size={48} />
                    <h4 className="group-hover:text-[#49DC67] transition-colors font-semibold text-lg text-white">Add Playlist</h4>
                </div>
            </button>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none font" onClose={(close)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#00000033]">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                            <DialogTitle as="h2" className="text-2xl/7 font-medium text-white text-center">
                                <span className="text-[#49DC67]">Add</span> New <span className="text-[#49DC67]">Playlist</span>
                            </DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                {
                                    photo ? <div className="w-36 mt-5 h-36 relative mx-auto border border-[#49DC67] rounded-full">
                                        <img className="rounded-full h-full! w-full object-cover" src={URL.createObjectURL(photo[0])} alt="" />
                                        <button onClick={() => setPhoto(null)} className="w-5 h-5 rounded-full text-red-500 flex items-center justify-center bg-[#00000099] absolute top-2 right-2 cursor-pointer">
                                            <X size={16} />
                                        </button>
                                    </div> : <div onDragLeave={() => setDrag(false)} onDragOver={(e) => { e.preventDefault(); setDrag(true) }} className={`w-36 mt-5 h-36 rounded-full relative mx-auto border border-dotted border-[#49DC67] bg-[#00000088] transition duration-300 flex flex-col items-center justify-center hover:text-[#49DC67] cursor-pointer ${drag ? 'text-[#49DC67] border-2' : 'text-white'}`}>
                                        <input onInput={handleChange} onDrop={(e) => { e.preventDefault(); console.log(e.dataTransfer.files); setPhoto(e.dataTransfer.files) }} {...register('image', { required: true })} type="file" className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer" />
                                        <Plus />
                                        Add Image
                                    </div>
                                }
                                <div className="mx-auto w-3/4 mt-4 space-y-4">
                                    <input {...register('name', { required: true })} required onFocus={() => setUnder(true)}
                                        onBlur={() => setUnder(false)} type="text" className={`text-white input bg-transparent border-0 border-b-2 border-b-[#676767] outline-0 shadow-none focus:outline-0  ${under && 'border-b-2'} pl-1 rounded-none focus:border-[#49DC67]`} placeholder="Playlist Name" />
                                    <input {...register('description')} onFocus={() => setUnder(true)}
                                        onBlur={() => setUnder(false)} type="text" className={`text-white input bg-transparent border-0 border-b-2 border-b-[#676767] outline-0 shadow-none focus:outline-0  ${under && 'border-b-2'} pl-1 rounded-none focus:border-[#49DC67]`} placeholder="Description (Optional)" />
                                    {click ? <button className="btn w-full h-[48px] tracking-[-1px] rounded text-lg font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10 loading loading-spinner loading-xl text-[white]" ></span ></button > : <button className="btn w-full h-[48px] tracking-[-1px] rounded text-lg font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10" > Post </span ></button >}
                                </div>
                            </form>
                            <div className="mt-4">
                                <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 cursor-pointer w-6 h-6 rounded-full bg-[#00000066] flex items-center justify-center text-[#49DC67]"><X size={16} /></button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AddPlaylist;