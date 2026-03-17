import axios from "axios";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    productId: "P001",
    name: "Aloe Vera Face Cream",
    altNames: ["Aloe Cream", "Herbal Cream"],
    labelledPrice: 1500,
    price: 1200,
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300"
    ],
    description: "Hydrating aloe vera face cream for smooth skin.",
    stock: 50,
    category: "cream"
  },
  {
    productId: "P002",
    name: "Neem Face Wash",
    altNames: ["Neem Cleanser", "Herbal Face Wash"],
    labelledPrice: 900,
    price: 750,
    images: [
      "https://via.placeholder.com/300"
    ],
    description: "Deep cleansing neem face wash for oily skin.",
    stock: 30,
    category: "face wash"
  },
  {
    productId: "P003",
    name: "Organic Soap",
    altNames: ["Natural Soap"],
    labelledPrice: 500,
    price: 400,
    images: [
      "https://via.placeholder.com/300"
    ],
    description: "Handmade organic soap with natural ingredients.",
    stock: 100,
    category: "soap"
  },
  {
    productId: "P004",
    name: "Vitamin C Serum",
    altNames: ["Skin Bright Serum"],
    labelledPrice: 2500,
    price: 2100,
    images: [
      "https://via.placeholder.com/300"
    ],
    description: "Brightens skin and reduces dark spots.",
    stock: 20,
    category: "cosmatics"
  }
];

export default function ProductAdmin(){
    const [products,setProducts] = useState(sampleProducts)

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res)=> {
            setProducts(res.data)
            console.log(res.data);
            
        }) 
    },
    []
)

    return(
        <div className="h-full w-full border-2">
            <table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Image</th>
                        <th className="p-[10px] ">Product Id</th>
                        <th className="p-[10px] ">Name</th>
                        <th className="p-[10px] ">Labelled Price</th>
                        <th className="p-[10px] ">Price</th>
                        <th className="p-[10px] ">Stock</th>
                        {/* <th className="p-[10px] ">Is Available</th> */}
                        <th className="p-[10px] ">Category</th>
                        <th className="p-[10px]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index) => {
                        return(
                            <tr key={index}>
                                <td>
                                    <img src={product.images[0]} alt={product.name} className="w-[40px] h-[40px]"/>
                                </td>
                                <td className="p-[10px]">{product.productId}</td>
                                <td className="p-[10px]">{product.name}</td>
                                <td className="p-[10px]">{product.labelledPrice}</td>
                                <td className="p-[10px]">{product.price}</td>
                                <td className="p-[10px]">{product.stock}</td>
                                {/* <td className="p-[10px]">{product.isAvailble ? "Yes" : "No" }</td> */}
                                <td className="p-[10px]">{product.category}</td>
                                <td className="p-[10px]">
                                    <BiTrash className="bg-red-500 p-[5px] text-3xl rounded-full text-amber-50 shadow-2xl shadow-black cursor-pointer" onClick={()=>{
                                        
                                    }}/>
                                </td>
                            </tr>
                        )
                    } )}
                </tbody>
            </table>

            <Link to={"/admin/newProduct"} className="fixed bottom-10 right-10 bg-blue-500 text-white p-5 rounded-full shadow-2xl ">
                <PiPlus className="text-3xl"/>
            </Link>
        </div>
    )
}