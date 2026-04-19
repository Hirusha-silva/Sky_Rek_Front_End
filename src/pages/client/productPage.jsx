// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "../../components/loader";
// import ProductCard from "../../components/productCard";

// export default function ProductPage(){
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [query, setQuery] = useState("");
    
//     useEffect(
//         () => {
//         if(loading){
//             if(query === ""){
//             axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then( // get products from backend
//                 (response) => {
//                     console.log(response.data);
//                     setProducts(response.data);
//                     setLoading(false);
                    
//                 }
//             ).catch(
//                 (error) => {
//                     console.error("Error fetching products:", error);
//                     setLoading(false);
//                 }
//             ) 
//             }else{
//                 axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query).then( // get products from backend
//                     (response) => {
//                         console.log(response.data);
//                         setProducts(response.data);
//                         setLoading(false);
                        
//                     }
//                 ).catch(
//                     (error) => {
//                         console.error("Error fetching products:", error);
//                         setLoading(false);
//                     }
//                 )
//             }   
//         }
//         },[loading] // loading varible eke agaya wens unoth me function eka run wenwa

//     )
//     return(
//         <div className="w-full min-h-screen flex flex-col justify-start items-center  ">
//             <input type="text" placeholder="Search Product" className="w-[600px] p-[10px] m-[10px] border-2 rounded-md" onChange={(e)=>{setQuery(e.target.value); setLoading(true)}}/>
//             {loading ? <Loader/> : 
//                 <div className="w-full flex  flex-wrap gap-4 justify-center  items-center">
//                     {
//                         products.map(
//                             (product)=>{
//                                 return(
//                                     <ProductCard key={product.productId} product={product}/>
//                                 )   
//                         })
//                     }
//                 </div>
//             }
//         </div>
//     )
// }


import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (loading) {
            const url = query === "" 
                ? `${import.meta.env.VITE_BACKEND_URL}/api/products`
                : `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`;

            axios.get(url).then((response) => {
                setProducts(response.data);
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
        }
    }, [loading]);

    return (
        /* NEW BACKGROUND: Warm Champagne / Nude (#F8F2ED) */
        <div className="w-full min-h-screen bg-primary text-[#332D29] font-sans selection:bg-[#D4A373] selection:text-white">
            
            {/* --- COMPACT ELEGANT HEADER --- */}
            <header className="relative w-full pt-16 pb-8 px-6 overflow-hidden">
                {/* Subtle Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/40 to-transparent -z-10"></div>
                
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7DCD3] pb-10">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A68A76] mb-2 block">Premium Skincare</span>
                            <h1 className="text-5xl md:text-6xl font-serif tracking-tighter text-[#4A3F35]">
                                Lumina <span className="italic font-light text-[#D4A373]">Beauty</span>
                            </h1>
                        </div>

                        {/* Modern Rounded Search Bar */}
                        <div className="w-full md:w-[380px] group relative">
                            <div className="relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 p-1 shadow-sm focus-within:shadow-xl focus-within:bg-white transition-all duration-500">
                                <input
                                    type="text"
                                    placeholder="Search your ritual..."
                                    className="w-full bg-transparent px-6 py-3 outline-none text-sm font-medium placeholder:italic placeholder:text-gray-300"
                                    onChange={(e) => { 
                                        setQuery(e.target.value); 
                                        setLoading(true); 
                                    }}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#4A3F35] text-white rounded-xl group-focus-within:bg-[#D4A373] transition-all">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- PRODUCT GRID AREA --- */}
            <main className="container mx-auto px-4 md:px-12 py-10">
                
                {/* Result Statistics with Soft Styling */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-grow bg-[#E7DCD3]"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A68A76]">
                        {products.length} ESSENTIALS FOUND
                    </span>
                    <div className="h-[1px] flex-grow bg-[#E7DCD3]"></div>
                </div>

                {loading ? (
                    <div className="w-full h-[40vh] flex flex-col items-center justify-center">
                        <Loader />
                        <p className="mt-4 text-[10px] tracking-[0.8em] text-[#A68A76] animate-pulse uppercase">Manifesting</p>
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            /* Responsive Grid: Efficient Height Management */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {products.map((product) => (
                                    <div 
                                        key={product.productId} 
                                        className="bg-white/70 p-3 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-700 border border-white/50"
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Elegant Empty State */
                            <div className="w-full py-24 text-center bg-white/30 rounded-[4rem] border border-dashed border-[#E7DCD3]">
                                <h3 className="text-3xl font-serif italic text-[#A68A76] mb-8">The archive is silent.</h3>
                                <button 
                                    onClick={() => { setQuery(""); setLoading(true); }}
                                    className="bg-[#4A3F35] text-white px-12 py-4 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4A373] hover:shadow-2xl transition-all active:scale-95"
                                >
                                    Reset Discovery
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}