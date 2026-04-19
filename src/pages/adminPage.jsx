// import { Route, Routes, Link, useNavigate } from "react-router-dom";
// import { BsBoxSeamFill } from "react-icons/bs";
// import { GrInstall } from "react-icons/gr";
// import { BsPeopleFill } from "react-icons/bs";
// import { IoIosSettings } from "react-icons/io";
// import ProductAdmin from "./admin/productAdmin";
// import AddProduct from "./admin/addProduct";
// import UpdateProduct from "./admin/updateProduct";
// import OrdersPage from "./admin/ordersPage";
// import { use, useEffect, useState } from "react";
// import Loader from "../components/loader";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function AdminPage() {

//     const navigate = useNavigate()
//     const [adminValided, setAdminValided] = useState(false)

//     useEffect(() => {
//         const token = localStorage.getItem("token")
//         if(token == null){
//             navigate("/login")
//             toast.error("Please login to access admin panel")
//         }else{
//             axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/",{
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }).then((response)=>{
//                 if(response.data.role == "ADMIN"){
//                     setAdminValided(true)
//                 }else{
//                     navigate("/login")
//                     toast.error("You are not authorized to access admin panel")
//                 }
//             }).catch((error)=>{
//                 navigate("/login")
//                 toast.error("You are not authorized to access admin panel")
//             })
//         }
//     },[])

//     return (
//         <div className="w-full h-screen flex">
//             {adminValided ? <>
//             <div className="w-[300px] h-full flex flex-col items-center">
//                 <span className="text-3xl font-bold my-5">Admin Panel</span>
//                 <Link className="flex  h-[60px] w-full p-[20px]  border items-center gap-3 text-3xl " to={"/admin/products"}><BsBoxSeamFill/>products</Link>
//                 <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/ordersPage"}><GrInstall/>orders</Link>
//                 <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/user"}><BsPeopleFill/>User</Link>
//                 <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/settings"}><IoIosSettings/>Settings</Link>
//             </div>
//             <div className="w-[calc(100%-300px)] h-full "> 
//                 <Routes>
//                     <Route path="/" element={<h1>Admin Dashboard</h1>} />
//                     <Route path="/products" element={<ProductAdmin/>} />
//                     <Route path="/newProduct" element={<AddProduct/>} />
//                     <Route path="/ordersPage" element={<OrdersPage/>}/>
//                     <Route path="/updateProduct" element={<UpdateProduct/>} />
//             </Routes>
//             </div>
//             </> : <Loader/>}
//         </div>
//     )
// }
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { BsBoxSeamFill } from "react-icons/bs";
import { GrInstall } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import ProductAdmin from "./admin/productAdmin";
import AddProduct from "./admin/addProduct";
import UpdateProduct from "./admin/updateProduct";
import OrdersPage from "./admin/ordersPage";
import { useEffect, useState } from "react";
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
        <div 
            className="w-full h-screen flex"
            style={{ background: "#F4F6F9" }}
        >

            {adminValided ? <>
            
            {/* Sidebar */}
            <div 
                className="w-[260px] h-full flex flex-col p-4"
                style={{
                    background: "#112B3C",
                    borderRadius: "0 20px 20px 0",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >

                <div 
                    className="text-2xl font-bold mb-8 text-center"
                    style={{ color: "#D4A373" }}
                >
                    Admin Panel
                </div>

                <div className="flex flex-col gap-3">

                    {/* Item */}
                    <Link 
                        to={"/admin/products"}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                        onMouseEnter={(e)=>{
                            e.currentTarget.style.background="#D4A373";
                            e.currentTarget.style.color="#000";
                            e.currentTarget.style.transform="scale(1.05)";
                        }}
                        onMouseLeave={(e)=>{
                            e.currentTarget.style.background="transparent";
                            e.currentTarget.style.color="#fff";
                            e.currentTarget.style.transform="scale(1)";
                        }}
                    >
                        <BsBoxSeamFill size={20}/> Products
                    </Link>

                    <Link 
                        to={"/admin/ordersPage"}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                        onMouseEnter={(e)=>{
                            e.currentTarget.style.background="#D4A373";
                            e.currentTarget.style.color="#000";
                            e.currentTarget.style.transform="scale(1.05)";
                        }}
                        onMouseLeave={(e)=>{
                            e.currentTarget.style.background="transparent";
                            e.currentTarget.style.color="#fff";
                            e.currentTarget.style.transform="scale(1)";
                        }}
                    >
                        <GrInstall size={20}/> Orders
                    </Link>

                    <Link 
                        to={"/admin/user"}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                        onMouseEnter={(e)=>{
                            e.currentTarget.style.background="#D4A373";
                            e.currentTarget.style.color="#000";
                            e.currentTarget.style.transform="scale(1.05)";
                        }}
                        onMouseLeave={(e)=>{
                            e.currentTarget.style.background="transparent";
                            e.currentTarget.style.color="#fff";
                            e.currentTarget.style.transform="scale(1)";
                        }}
                    >
                        <BsPeopleFill size={20}/> Users
                    </Link>

                    <Link 
                        to={"/admin/settings"}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                        onMouseEnter={(e)=>{
                            e.currentTarget.style.background="#D4A373";
                            e.currentTarget.style.color="#000";
                            e.currentTarget.style.transform="scale(1.05)";
                        }}
                        onMouseLeave={(e)=>{
                            e.currentTarget.style.background="transparent";
                            e.currentTarget.style.color="#fff";
                            e.currentTarget.style.transform="scale(1)";
                        }}
                    >
                        <IoIosSettings size={20}/> Settings
                    </Link>

                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">

                <div 
                    className="w-full h-full rounded-2xl p-6"
                    style={{
                        background: "#ffffff",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
                    }}
                >
                    <Routes>
                        <Route path="/" element={
                            <h1 style={{ color: "#112B3C" }} className="text-3xl font-semibold">
                                Admin Dashboard
                            </h1>
                        } />
                        <Route path="/products" element={<ProductAdmin/>} />
                        <Route path="/newProduct" element={<AddProduct/>} />
                        <Route path="/ordersPage" element={<OrdersPage/>}/>
                        <Route path="/updateProduct" element={<UpdateProduct/>} />
                    </Routes>
                </div>

            </div>

            </> : <Loader/>}

        </div>
    )
}