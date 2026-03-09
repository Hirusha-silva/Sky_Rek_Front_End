import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-green-500 flex">
            <div className="w-[400px] h-full bg-gray-300">
                <span>Admin Page</span>
            </div>
            <div className="w-[calc(100%-400px)] h-full bg-blue-400">
                <Routes>
                    <Route path="/" element={<h1>Admin Dashboard</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
            </Routes>
            </div>
        </div>
    )
}