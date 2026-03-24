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
        <div className="w-full h-full flex">
            <span>Order Page</span>
        </div>
    )
}