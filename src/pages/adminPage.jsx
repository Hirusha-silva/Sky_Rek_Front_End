import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { BsBoxSeamFill } from "react-icons/bs";
import { GrInstall } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import ProductAdmin from "./admin/productAdmin";
import AddProduct from "./admin/addProduct";
import UpdateProduct from "./admin/updateProduct";
import OrdersPage from "./admin/ordersPage";
import { use, useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {

    const navigate = useNavigate()
    const [adminValided, setAdminValided] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token == null){
            navigate("/login")
            toast.error("Please login to access admin panel")
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
                if(response.data.role == "ADMIN"){
                    setAdminValided(true)
                }else{
                    navigate("/login")
                    toast.error("You are not authorized to access admin panel")
                }
            }).catch((error)=>{
                navigate("/login")
                toast.error("You are not authorized to access admin panel")
            })
        }
    },[])

    return (
        <div className="w-full h-screen flex">
            {adminValided ? <>
            <div className="w-[300px] h-full flex flex-col items-center">
                <span className="text-3xl font-bold my-5">Admin Panel</span>
                <Link className="flex  h-[60px] w-full p-[20px]  border items-center gap-3 text-3xl " to={"/admin/products"}><BsBoxSeamFill/>products</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/ordersPage"}><GrInstall/>orders</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/user"}><BsPeopleFill/>User</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/settings"}><IoIosSettings/>Settings</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full "> 
                <Routes>
                    <Route path="/" element={<h1>Admin Dashboard</h1>} />
                    <Route path="/products" element={<ProductAdmin/>} />
                    <Route path="/newProduct" element={<AddProduct/>} />
                    <Route path="/ordersPage" element={<OrdersPage/>}/>
                    <Route path="/updateProduct" element={<UpdateProduct/>} />
            </Routes>
            </div>
            </> : <Loader/>}
        </div>
    )
}