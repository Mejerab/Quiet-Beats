import { useNavigate } from "react-router";
import useHostingUrl from "../../../unoo-chats/src/hooks/useHostingUrl";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UserHook from "../hooks/UserHook";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PointHook from "../hooks/PointHook";
import PhotoUploader from "../hooks/PhotoUploader";
import Uploader from "../hooks/UploadHook";
import Select from 'react-select'
import DashHeader from "./DashHeader/DashHeader";

const AddSong = () => {
    const navigate = useNavigate();
    const hostingUrl = useHostingUrl();
    const [under, setUnder] = useState(true);
    const [photo, SetPhoto] = useState(null);
    const [song, setSong] = useState(null);
    const [genre, setGenre] = useState(null);
    const [lang, setLang] = useState(null);
    const [clicked, setClicked] = useState(false);
    const axiosPublic = useAxiosPublic();
    const user = UserHook();

    const handleGet = async (songInfo) => {
        setSong(songInfo)
    }
    const handleGetPhoto = (item) => {
        SetPhoto(item);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!song || !e.target.album.value || !photo) {
            toast.error('Fill the inputs to add your album.', {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
        }
        if (!genre) toast.error('Select the song genre.', {
            style: {
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid #49DC67',
                color: 'white'
            }
        })
        if (!lang) toast.error('Select the song language.', {
            style: {
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid #49DC67',
                color: 'white'
            }
        })
        if (song && e.target.album.value && photo && genre && lang) {
            setClicked(true);
        }
        const formData = new FormData();
        formData.append("file", song[0]);
        formData.append("album", e.target.album.value);
        formData.append("artist", e.target.artist.value);
        formData.append("genre", genre);
        formData.append("lovedBy", []);
        formData.append("language", lang);
        formData.append("publisher", user.email);
        formData.append("feat", e.target.feat.value);
        const imageData = { image: photo[0] };
        const photoRes = await axiosPublic.post(hostingUrl, imageData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }, withCredentials: false
        })
        if (photoRes.data) {
            formData.append("albumPhoto", photoRes.data.data.display_url);
            try {
                const res = await axiosPublic.post('/upload', formData, {
                    headers: { "Content-Type": 'multipart/data' }
                });
                if (res.data) {
                    Swal.fire({
                        title: 'Success',
                        text: 'You have successfully uploaded your album.',
                        icon: 'success',
                        confirmButtonText: 'Continue',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        backdrop: 'blur(50px) grayscale(50%)',
                        customClass: {
                            confirmButton: 'swalButton',
                        }
                    });
                    navigate('/dashboard')
                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Facing some issues try again!',
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
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There is some problem in the server. Try again later!',
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
                text: 'Facing some issues with the album image!',
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
    };
    const genres = [
        { label: "Classic", value: "classic" },
        { label: "Pop", value: "pop" },
        { label: "Rock", value: "rock" },
        { label: "Romance", value: "romance" },
        { label: "Country", value: "country" },
    ];
    const language = [
        { label: "Bangla", value: "bangla" },
        { label: "Hindi", value: "hindi" },
        { label: "English", value: "English" },
        { label: "Urdu", value: "urdu" },
    ];
    return (
        <div className="max-w-330 mx-auto lg:px-3 h-full flex lg:flex-row flex-col items-center justify-center pt-4">
            <div className="lg:hidden block w-full">
                <DashHeader />
            </div>
            <form onSubmit={handleSubmit} className="bg-[#12121299] rounded text-center pt-6 lg:mt-0 mt-2">
                <PointHook title={'Add a Song'} />
                <div className="flex lg:flex-row flex-col justify-between gap-x-2">
                    <div className="lg:w-3/5 flex flex-col items-center justify-center pt-0 pr-0 lg:p-6 space-y-4">
                        <div className="flex lg:flex-row flex-col gap-5 justify-between mt-5 max-w-full space-y-4">
                            <div className="w-fit mx-auto">
                                <PhotoUploader getPhoto={handleGetPhoto} />
                            </div>
                            <div className="space-y-2 lg:w-[55%] ">
                                <input required onFocus={() => setUnder(true)}
                                    onBlur={() => setUnder(false)} name="album" type="text" className={`input bg-transparent text-white border-0 outline-0 shadow-none focus:outline-0  ${under && 'border-b-2'} pl-1 rounded-none focus:border-[#49DC67]`} placeholder="Album Name" />
                                <input required onFocus={() => setUnder(true)}
                                    onBlur={() => setUnder(false)} name="artist" type="text" className={`input bg-transparent text-white border-0 outline-0 shadow-none focus:outline-0  ${under && 'border-b-2'} pl-1 rounded-none focus:border-[#49DC67]`} placeholder="Artist" />
                                <input onFocus={() => setUnder(true)}
                                    onBlur={() => setUnder(false)} name="feat" type="text" className={`input bg-transparent text-white border-0 outline-0 shadow-none focus:outline-0  ${under && 'border-b-2'} pl-1 rounded-none focus:border-[#49DC67]`} placeholder="Feat" />
                                <div className="lg:mx-0 mx-5 mt-4">
                                    <Uploader onUpload={handleGet} />
                                </div>
                            </div>
                        </div>
                        {clicked ? <button disabled className="btn lg:w-full w-[95%] lg:mx-0 mx-auto h-14.5 tracking-[-1px] rounded text-xl font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10 loading loading-spinner loading-xl text-[white]" ></span ></button > :
                            <button className="btn lg:w-full w-[95%] lg:mx-0 mx-auto h-14.5 tracking-[-1px] rounded text-xl font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10" > Post </span ></button >}
                    </div>
                    <div className="lg:w-2/5 max-w-lg mx-auto m-6 p-4">
                        <h2 className="text-xl lg:text-lg font-semibold text-[#49DC67] mb-4">
                            Genre <span className="text-white">And</span> Language
                        </h2>
                        <div className="space-y-3 text-white!">
                            <h4 className="text-left prime">Genre: </h4>
                            <Select
                                onChange={(e) => setGenre(e.value)}
                                options={genres}
                                isSearchable
                                unstyled
                                placeholder='Select The Genre'
                                classNames={{
                                    control: ({ isFocused }) =>
                                        `bg-[#00000066] border border-[#49DC67] text-white min-h-[42px] lg:px-3 px-2 rounded-lg lg:px-0 px-12
                                    ${isFocused ? "ring-1 ring-[#49DC67]" : ""}`,
                                    menu: () =>
                                        "bg-[#00000066] border border-[#49DC67] mt-1 rounded-lg",

                                    option: ({ isFocused, isSelected }) =>
                                        `lg:px-3 px-2 py-2 cursor-pointer
                                    ${isSelected ? "bg-[#49DC67] text-white" : ""}
                                    ${!isSelected && isFocused ? "bg-[#49DC6799]" : "text-white"}`,
                                    singleValue: () => "text-white",
                                    placeholder: () => "text-gray-400",
                                    input: () => "text-white mx-auto",
                                    clearIndicator: () => "text-gray-400 hover:text-white",
                                    dropdownIndicator: () => "text-gray-400 hover:text-white",
                                }}
                            />
                            <h4 className="text-left prime">Language: </h4>
                            <Select
                                options={language}
                                isSearchable
                                unstyled
                                onChange={(e) => setLang(e.value)}
                                placeholder='Select The Language'
                                classNames={{
                                    control: ({ isFocused }) =>
                                        `bg-[#00000066] border border-[#49DC67] text-white min-h-[42px] lg:px-3 px-2 rounded-lg lg:px-0 px-12
                                    ${isFocused ? "ring-1 ring-[#49DC67]" : ""}`,
                                    menu: () =>
                                        "bg-[#00000066] border border-[#49DC67] mt-1 rounded-lg",

                                    option: ({ isFocused, isSelected }) =>
                                        `lg:px-3 px-2 py-2 cursor-pointer
                                    ${isSelected ? "bg-[#49DC67] text-white" : ""}
                                    ${!isSelected && isFocused ? "bg-[#49DC6799]" : "text-white"}`,
                                    singleValue: () => "text-white",
                                    placeholder: () => "text-gray-400",
                                    input: () => "text-white mx-auto",
                                    clearIndicator: () => "text-gray-400 hover:text-white",
                                    dropdownIndicator: () => "text-gray-400 hover:text-white",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSong;