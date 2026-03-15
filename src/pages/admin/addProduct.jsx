import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";



export default function AddProduct(){
    const [productId, setProductID] = useState("")
    const [productName, setProductName] = useState("")
    const [alternativeNames, setAlternativeNames] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [isAvailable, setIsAvailable] = useState(true)
    const [category, setCategory] = useState("cream")

    const navigate = useNavigate()

    function handleSubmit(){
        const alternativeNamesArray = alternativeNames.split(",") //alternativeNames string eka comma ekak use karala split karanawa, e.g. "name1,name2,name3" => ["name1", "name2", "name3"]
        const productData = {
            productId: productId,
            name: productName,
            altNames: alternativeNamesArray,
            labelledPrice: labelledPrice,
            price: price,
            images: [],
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category
        }
        
        const token = localStorage.getItem("token") //local storage ekata token eka gannawa
        if(token == null){
            // window.location.href = "/login" //token eka null nam login page ekata navigate karanawa 
            navigate("/login") //navigate function eka use karala login page ekata navigate karanawa
            return
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", productData,{
            headers: {
                Authorization: "Bearer " + token //token eka authorization header ekata set karanawa
            }
        } ).then((res) => {
            console.log(res.data);
            toast.success("Product added successfully")
            navigate("/admin/products") //product add karapu passe product admin page ekata navigate karanawa

        }).catch((err) => {
            console.log(err);
            toast.error("Failed to add product")
        })
    }



    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[600px]  border-2 rounded-[10px] flex flex-wrap justify-between p-[20px]">
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold  ">
                    <label>Product Id</label>
                    <input type="text" value={productId} onChange={(e) => setProductID(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[300px] gap-[5px] text-sm font-semibold ">
                    <label>Product Name</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] gap-[5px] text-sm font-semibold ">
                    <label>Alternative Names</label>
                    <input type="text" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold ">
                    <label>Labelled Price</label>
                    <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold ">
                    <label> Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] gap-[5px] text-sm font-semibold ">
                    <label>Images</label>
                    <input type="text" value={images} onChange={(e) => setImages(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[500px] gap-[5px] text-sm font-semibold ">
                    <label>Description</label>
                    <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-amber-300 h-[100px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold ">
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-amber-300 h-[40px] rounded-md"/>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold ">
                    <label>Is Available</label>
                    <select onChange={(e) => setIsAvailable(e.target.value)} className="w-full h-[40px] border-1 rounded-md">
                        <option value={true}>IsAvailable</option>
                        <option value={false}>Not Available</option>
                     </select>
                </div>
                <div className="flex flex-col w-[200px] gap-[5px] text-sm font-semibold ">
                    <label>Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} className="w-full h-[40px] border-1 rounded-md">
                        <option value="cream">Cream</option>
                        <option value="face wash">Face Wash</option>
                        <option value="soap">Soap</option>
                     </select>
                </div>
                <div className="w-full flex justify-center flex-row gap-5 py-[20px]">
                    <Link to="/admin/products" className="bg-white w-[200px] h-[50px] flex justify-center items-center text-black border border-black px-4 py-2 rounded-md hover:bg-amber-600">Cansel</Link>
                    <button  onClick={handleSubmit} className="bg-black w-[200px] h-[50px] flex justify-center items-center text-white border border-black px-4 py-2 rounded-md hover:bg-amber-600">Add Product</button>
                </div>
            </div>
        </div>
    )
}