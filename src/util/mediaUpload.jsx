import { createClient } from "@supabase/supabase-js";

const url = "https://zpbqtyrizpxfjrrswzqt.supabase.co" 

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwYnF0eXJpenB4ZmpycnN3enF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjMwMDEsImV4cCI6MjA4OTEzOTAwMX0.HJOuQXN_l3ts3-RnQJb9bOctwMyYynP-v1zexR-XSYc"

const supabase = createClient(url,key) // supabase connector
export default function uploadFile(file) {
    const promies = new Promise(

        (resolve, reject) => {

            if(file == null){
                reject("Please select a file")
                return
            }

            const timeStamp = new Date().getTime() //get current timestamp
            
            const fileName = timeStamp + "_" + file.name //create a unique file name using timestamp and original file name

            supabase.storage.from("images").upload(fileName, file,{
                cacheControl: "3600",
                upsert: false
            }).then((res) => {
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(publicUrl) //resolve the promise with the public URL of the uploaded file
                
            }).catch((err) => {
                console.log(err);
                reject("Failed to upload file") //reject the promise with an error message
            })
        }
    )
    return promies

}