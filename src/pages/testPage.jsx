import { useState } from "react";

import toast from "react-hot-toast";
import uploadFile from "../util/mediaUpload";


export default function TestPage() {

    const [file, setFile] = useState(null)

    function handleUpload(){
       uploadFile(file).then((url) => {
        toast.success("File uploaded successfully")
       }).catch((err) => {
        toast.error("Failed to upload file")
       })
        
    }

    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <input type="file" onChange={(e)=>{
                setFile(e.target.files[0])  
            }}/>
            <button onClick={handleUpload} className="bg-amber-700">Upload</button>

        </div>
    )
}