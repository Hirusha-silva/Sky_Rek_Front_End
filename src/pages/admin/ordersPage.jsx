import axios from "axios"
import { useEffect, useState } from "react"

export default function OrdersPage(){
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders" ,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res)=>{
                setOrders(res.data)
                setLoading(false)
                console.log(res.data);
                
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    },[loading])

    return (
        <div className="w-full h-full flex ">
            <table className="w-full h-full border-[3px]">
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
                            <tr key={order.orderId}>
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
        </div>
    )
}