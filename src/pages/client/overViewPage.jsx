// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../components/loader";
// import ImageSlider from "../../components/imageSlider";
// import { addToCart, getCart } from "../../util/cart";

// export default function OverViewPage(){
//     const params = useParams();
//     const [product, setProduct] = useState(null);
//     const navigate = useNavigate()
//     const [status, setStatus] = useState("loading"); // loading, success, error awastha 3k thiyna nisa string use kara

//     useEffect(
//         () => {
//             if(status === "loading"){
//                 axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+params.productId).then((res)=>{
//                     setProduct(res.data)
//                     setStatus("success");
                    
//                 }).catch((err)=>{
//                     setStatus("error");
//                     toast.error("Error fetching product details")
//                 })
//             }
//         }
//     )

//         return(
//             <div className="w-full h-full">
//                 {
//                 status === "loading" && <Loader/>
//                 }

//                 {
//                 status === "success" && 
//                     <div className="w-full h-full flex flex-col md:flex-row">
//                         <h1 className="text-2xl font-bold my-4 md:hidden text-center">{product.name} <span className="font-light text-xl">{product.altNames.join(" | ")}</span></h1>
//                         <div className="w-full md:w-[49%] h-full flex flex-col justify-center items-center ">
                            
//                             <ImageSlider images ={product.images}/>
//                         </div>
//                         <div className="w-full h-full  md:w-[49%] flex flex-col items-center pt-[50px]">
//                             <h1 className="text-2xl font-bold hidden md:block">{product.name} <span className="font-light text-xl">{product.altNames.join(" | ")}</span></h1>
//                             <p className="text-lg p-2 md:mt-[20px] ">{product.description}</p>
//                             <div className="w-full flex flex-col  items-center mt-[20px]">
//                                 {
//                                     product.labelledPrice > product.price?
//                                     <div>
//                                         <span className="text-2xl  line-through">{product.labelledPrice.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
//                                         <span className="text-2xl font-bold ml-[10px]">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
//                                     </div>
//                                     :
//                                     <div>
//                                         <span className="text-2xl font-bold ml-[10px]">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
//                                     </div>
//                                 }
//                             </div>
//                             <div className="w-full flex flex-row justify-center gap-[10px] items-center  mt-[20px]">
//                                 <button className="w-[200px] h-[50px] rounded-xl text-white cursor-pointer bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500"onClick={()=>{
//                                     navigate("/checkout",{state:{items:[
//                                         {
//                                             productId: product.productId,
//                                             quantity: 1,
//                                             name: product.name,
//                                             image: product.images[0],
//                                             price: product.price
//                                         }
//                                     ]}})
//                                 }}>Buy Now</button>
//                                 <button className="w-[200px] h-[50px] rounded-xl text-white cursor-pointer bg-blue-700 border border-blue-700 hover:bg-white hover:text-blue-700" onClick={()=> {
//                                     addToCart(product,1)
//                                     toast.success("Product Add To Cart")
//                                     console.log(getCart());
                                    
//                                 }}>Add to Cart </button>
//                             </div>
//                         </div>
//                     </div>
//                 }

//                 {
//                 status === "error" && <div>Error loading product details</div>
//                 }             
//             </div>
//         )
// }


import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../util/cart";

export default function OverViewPage(){
    const params = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if(status === "loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+params.productId).then((res)=>{
                setProduct(res.data)
                setStatus("success");
            }).catch((err)=>{
                setStatus("error");
                toast.error("Error fetching product details")
            })
        }
    })

    return(
        /* BACKGROUND: Ultra-Light Pearl (#F9F9F9) */
        <div className="w-full min-h-screen bg-[#F9F9F9] text-[#2D241E] font-sans selection:bg-[#D4A373] selection:text-white">
            
            {status === "loading" && (
                <div className="h-screen flex items-center justify-center bg-white">
                    <Loader/>
                </div>
            )}

            {status === "success" && (
                <div className="container mx-auto px-6  py-20 lg:py-20">
                    {/* --- CENTERED HERO SECTION --- */}
                    <div className="max-w-6xl mx-auto flex flex-col items-center">
                        
                        {/* 1. Artistic Title Header */}
                        <header className="text-center mb-10 w-full">
                            <div className="inline-block px-4 py-1 rounded-full border border-[#D4A373]/20 text-[#D4A373] text-[9px] font-bold uppercase tracking-[0.5em] mb-6">
                                Product Archive / {product.productId.slice(-4)}
                            </div>
                            <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-none ">
                                {product.name}
                            </h1>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#A68A76] opacity-60">
                                {product.altNames.join(" • ")}
                            </p>
                        </header>

                        {/* 2. Floating Image & Details Grid */}
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 w-full items-start">
                            
                            {/* Left: Image Slider with unique shadow */}
                            <div className="lg:col-span-7 group">
                                <div className="bg-white rounded-[3rem] p-4 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.05)] border border-white transition-all duration-700 group-hover:shadow-[0_50px_120px_-30px_rgba(212,163,115,0.15)] overflow-hidden">
                                    <ImageSlider images={product.images}/>
                                </div>
                            </div>

                            {/* Right: Product Interaction */}
                            <div className="lg:col-span-5 flex flex-col pt-4">
                                {/* Price Focus */}
                                <div className="mb-10 p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white/80">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Price Point</p>
                                    {product.labelledPrice > product.price ? (
                                        <div className="flex items-center gap-4">
                                            <span className="text-4xl font-serif text-[#4A3F35]">
                                                {product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                                            </span>
                                            <span className="text-lg line-through text-gray-300">
                                                {product.labelledPrice.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-4xl font-serif text-[#4A3F35]">
                                            {product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                                        </span>
                                    )}
                                </div>

                                {/* Description Card */}
                                <div className="mb-10 px-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4A373] mb-4">The Ritual</h4>
                                    <p className="text-[#6B5E54] text-lg leading-relaxed font-light italic">
                                        "{product.description}"
                                    </p>
                                </div>

                                {/* Actions: Refined Pill Style */}
                                <div className="flex flex-col gap-3">
                                    <button 
                                        className="w-full h-16 bg-[#4A3F35] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#D4A373] transition-all duration-500 shadow-xl shadow-[#4A3F35]/10 active:scale-95 hover:scale-105"
                                        onClick={() => {
                                            navigate("/checkout", {
                                                state: {
                                                    items: [{
                                                        productId: product.productId,
                                                        quantity: 1,
                                                        name: product.name,
                                                        image: product.images[0],
                                                        price: product.price
                                                    }]
                                                }
                                            })
                                        }}
                                    >
                                        Buy Now
                                    </button>
                                    
                                    <button 
                                        className="w-full h-16 border border-[#4A3F35]/10 bg-white/30 text-[#4A3F35] rounded-full text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 active:scale-95 hover:scale-105"
                                        onClick={() => {
                                            addToCart(product, 1)
                                            toast.success("Added to Ritual")
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Micro-Trust Badge */}
                                <div className="mt-12 flex justify-center gap-10 opacity-30">
                                    <div className="text-center">
                                        <p className="text-[8px] font-black uppercase tracking-[0.5em]">Botanical</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] font-black uppercase tracking-[0.5em]">Vegan</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] font-black uppercase tracking-[0.5em]">Proven</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status === "error" && (
                <div className="h-screen flex flex-col items-center justify-center bg-white text-[#4A3F35]">
                    <div className="w-20 h-[1px] bg-[#D4A373] mb-8"></div>
                    <h2 className="text-2xl font-serif italic mb-2">Sync Error</h2>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mb-10">Unable to manifest details</p>
                    <button 
                        onClick={() => setStatus("loading")}
                        className="bg-[#4A3F35] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase"
                    >
                        Try Again
                    </button>
                </div>
            )}             
        </div>
    )
}