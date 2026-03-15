import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const url = "https://zpbqtyrizpxfjrrswzqt.supabase.co" 

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnF0eXJpenB4ZmpycnN3enF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjMwMDEsImV4cCI6MjA4OTEzOTAwMX0.HJOuQXN_l3ts3-RnQJb9bOctwMyYynP-v1zexR-XSYc"

const supabase = createClient(url,key) // supabase connector

export default function TestPage() {

    const [file, setFile] = useState(null)

    function handleUpload(){
        if(file == null){
            toast.error("Please select a file")
            return
        }

        supabase.storage.from("images").upload(file.name, file,{
            cacheControl: "3600",
            upsert: false
        }).then((res) => {
            toast.success("File uploaded successfully")
            const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
            console.log(publicUrl);
            
        }).catch((err) => {
            console.log(err);
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