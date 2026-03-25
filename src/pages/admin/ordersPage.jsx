import axios from "axios"
import { useEffect, useState } from "react"
import Paginator from "../../components/paginator"

export default function OrdersPage(){
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const [limit,setLimit] = useState(10)
    const [popupVisible,setPopupVisible] = useState(false)
    const [clickedOder,setClickedOder] = useState(null)

    useEffect(()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/" +page+"/"+limit ,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res)=>{
                setOrders(res.data.orders)
                setTotalPages(res.data.totalPages)
                setLoading(false)
                console.log(res.data);
                
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    },[loading,page,limit])

    return (
        <div className="w-full h-full flex flex-col  justify-between">
            <table className="w-full border-[3px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Order Id</th>
                        <th className="p-[10px]">email</th>
                        <th className="p-[10px]">name</th>
                        <th className="p-[10px]">address</th>
                        <th className="p-[10px]">phone</th>
                        <th className="p-[10px]">status</th>
                        <th className="p-[10px]">date</th>
                        <th className="p-[10px]">total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,index)=>{
                            return(
                            <tr key={order.orderId} className="border-b-[1px] hover:bg-blue-600 hover:text-white" onClick={(e)=>{
                                setClickedOder(order)
                                setPopupVisible(true)
                            }}>
                                <td className="p-[10px]">{order.orderId}</td>
                                <td className="p-[10px]">{order.email}</td>
                                <td className="p-[10px]">{order.name}</td>
                                <td className="p-[10px]">{order.address}</td>
                                <td className="p-[10px]">{order.phone}</td>
                                <td className="p-[10px]">{order.status}</td>
                                <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="p-[10px] text-end">{order.total.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                popupVisible && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center">
                        <div className="w-[600px] h-[600px] bg-white relative">
                            <button className="absolute w-[30px] h-[30px] bg-red-500 border-[2px] border-red-600 text-white top-[-30px] right-[-30px] rounded-full cursor-pointer hover:bg-transparent hover:text-red-500" onClick={()=>{
                                setPopupVisible(false)
                            }}>
                                X
                            </button>
                        </div>
                    </div>
                )
            }
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
        </div>
    )
}