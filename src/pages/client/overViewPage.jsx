import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";

export default function OverViewPage(){
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, success, error awastha 3k thiyna nisa string use kara

    useEffect(
        () => {
            if(status === "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+params.productId).then((res)=>{
                    setProduct(res.data)
                    setStatus("success");
                    
                }).catch((err)=>{
                    setStatus("error");
                    toast.error("Error fetching product details")
                })
            }
        }
    )

        return(
            <div className="w-full h-full">
                {status === "loading" && <Loader/>}
                {
                status === "success" && 
                    <div className="w-full h-full flex flex-row">
                        <div className="w-[49%] h-full flex flex-col justify-center items-center bg-blue-600"></div>
                        <div className="w-[49%] h-full bg-green-600"></div>
                    </div>
                }
                {status === "error" && <div>Error loading product details</div>}
               
            </div>
        )
}