import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";

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
        <div className="w-full h-full bg-red-500">
            {loading ? <Loader/> : <h1>Products</h1>}
        </div>
    )
}