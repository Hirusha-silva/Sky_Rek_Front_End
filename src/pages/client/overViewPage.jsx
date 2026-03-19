import { useState } from "react";
import { useParams } from "react-router-dom";

export default function OverViewPage(){
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, success, error awastha 3k thiyna nisa string use kara
        return(
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-3xl font-bold">Product Overview Page</h1>
                <h1>{params.productId}</h1>
            </div>
        )
}