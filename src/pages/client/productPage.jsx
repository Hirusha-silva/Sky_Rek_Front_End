import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(
        () => {
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then( // get products from backend
                (response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setLoading(false);
                    
                }
            ).catch(
                (error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                }
            )    
        }
        },[loading] // loading varible eke agaya wens unoth me function eka run wenwa

    )
    return(
        <div className="w-full h-full ">
            {loading ? <Loader/> : 
                <div className="w-full flex  flex-wrap gap-4 justify-center items-center">
                    {
                        products.map(
                            (product)=>{
                                return(
                                    <ProductCard key={product.productId} product={product}/>
                                )   
                        })
                    }
                </div>
            }
        </div>
    )
}