import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Uploader = ({ onUpload }) => {
    const [files, setFiles] = useState();
    const [dragOver, setDragOver] = useState(false);
    const audioRef = useRef(null);
    const handleFiles = (selectedFiles) => {
        setFiles(selectedFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e) => {
        handleFiles(e.target.files);
    };

    const removeFile = (e) => {
        e.preventDefault();
        audioRef.current = null;
        setFiles(null);
    };
    useEffect(() => {
        onUpload(files);
    }, [onUpload, files])
    if (files && !files[0].type.includes('audio')) {
        setFiles(null);
        return toast.error('The song has to be an audio file.', {
            style: {
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid #49DC67',
                color: 'white'
            }
        })
    }

    return (
        <div className="relative">
            {files ?
                <div
                    className="bg-[#121212] p-4 rounded-lg flex flex-col items-center shadow hover:shadow-lg transition relative"
                >
                    <button
                        onClick={removeFile}
                        className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                    >
                        ✕
                    </button>
                    <audio controls className="w-full mb-2 mt-3 border rounded-full border-[#49DC67]"> <source src={URL.createObjectURL(files[0])} /></audio>
                    <p className="text-sm truncate w-full text-center">{files[0].name.slice(0, 45)}{files[0].name.slice(45, 46) && '...'}</p>
                </div> : <div
                    className={`border-4 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${dragOver ? "border-blue-500" : "border-[#49DC67] bg-[#121212]"
                        }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    <p className="text-white text-lg mb-4 flex flex-col items-center">
                        Drag & Drop audio or click to upload
                        <Upload />
                    </p>
                    <input
                        type="file"
                        ref={audioRef}
                        name="song"
                        accept="audio/*"
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            }
        </div>
    );
}
export default Uploader;
