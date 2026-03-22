import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";

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
                {
                status === "loading" && <Loader/>
                }

                {
                status === "success" && 
                    <div className="w-full h-full flex flex-row">
                        <div className="w-[49%] h-full flex flex-col justify-center items-center ">
                            <ImageSlider images ={product.images}/>
                        </div>
                        <div className="w-[49%] h-full flex flex-col items-center pt-[50px]">
                            <h1 className="text-2xl font-bold">{product.name} <span className="font-light text-xl">{product.altNames.join(" | ")}</span></h1>
                            <p className="text-lg mt-[20px]">{product.description}</p>
                            <div className="w-full flex flex-col items-center mt-[20px]">
                                {
                                    product.labelledPrice > product.price?
                                    <div>
                                        <span className="text-2xl  line-through">{product.labelledPrice.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                        <span className="text-2xl font-bold ml-[10px]">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="text-2xl font-bold ml-[10px]">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                    </div>
                                }
                            </div>
                            <div className="w-full flex flex-row justify-center gap-[10px] items-center  mt-[20px]">
                                <button className="w-[200px] h-[50px] rounded-xl text-white cursor-pointer bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500">Buy Now</button>
                                <button className="w-[200px] h-[50px] rounded-xl text-white cursor-pointer bg-blue-700 border border-blue-700 hover:bg-white hover:text-blue-700">Add to Cart </button>
                            </div>
                        </div>
                    </div>
                }

                {
                status === "error" && <div>Error loading product details</div>
                }             
            </div>
        )
}