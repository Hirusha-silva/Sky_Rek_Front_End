import { Route, Routes, Link } from "react-router-dom";
import { BsBoxSeamFill } from "react-icons/bs";
import { GrInstall } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[400px] h-full flex flex-col items-center">
                <span className="text-3xl font-bold my-5">Admin Panel</span>
                <Link className="flex  h-[60px] w-full p-[20px]  border items-center gap-3 text-3xl " to={"/admin/products"}><BsBoxSeamFill/>products</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/orders"}><GrInstall/>orders</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/user"}><BsPeopleFill/>User</Link>
                <Link className="flex  h-[60px] w-full p-[20px] border items-center gap-3 text-3xl " to={"/admin/settings"}><IoIosSettings/>Settings</Link>
            </div>
            <div className="w-[calc(100%-400px)] h-full"> 
                <Routes>
                    <Route path="/" element={<h1>Admin Dashboard</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
            </Routes>
            </div>
        </div>
    )
}