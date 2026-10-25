import { BadgePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const PhotoUploader = ({ getPhoto }) => {
    const [photo, setPhoto] = useState();
    const [drag, setDrag] = useState(false);
    const inputRef = useRef(null);
    const handlePhoto = (image) => {
        setPhoto(image);
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setDrag(false);
        handlePhoto(e.dataTransfer.files);
    }
    const handleChange = (e) => {
        handlePhoto(e.target.files);
    }
    const handleRemove = (e) => {
        e.preventDefault();
        inputRef.current = null;
        setPhoto(null);
    }
    useEffect(() => {
        getPhoto(photo);
    }, [getPhoto, photo])
    const types = ['image/jpeg', 'image/png', 'image/jpg'];
    if (photo && !types.some(type => photo[0].type.includes(type))) {
        setPhoto(null);
        return toast.error('Album image has to be a jpg or png file.', {
            style: {
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid #49DC67',
                color: 'white'
            }
        })
    }
    return (
        <>
            {photo ?
                <div className="w-68 my-auto relative group">
                    <img className="w-full! rounded-sm h-full object-contain" src={URL.createObjectURL(photo[0])} alt="" />
                    <button onClick={handleRemove} className="absolute -top-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-75 -right-2 w-6 h-6 bg-[#121212] rounded-full flex items-center justify-center cursor-pointer">
                        <X stroke="#fb2c36" size={16} />
                    </button>
                </div>
                :
                <div className={`w-55 h-73 bg-transparent flex flex-col border-dotted border-4 border-[#49DC67] items-center justify-center rounded-sm relative transition ${drag ? 'border-blue-500' : 'border-[#49DC67] bg-[#121212]'}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={handleDrop}
                >
                    Album image
                    <BadgePlus />
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        ref={inputRef}
                        onChange={handleChange}
                        className="absolute w-full inset-0 h-full cursor-pointer opacity-0"
                    />
                </div>}
        </>
    );
};

export default PhotoUploader;