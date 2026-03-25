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
    const [selectedImage, setSelectedImage] = useState(null)
    const [odrerStatus, setOrderStatus] = useState("pending")
    const [orderNote, setOrderNote] = useState("")

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
                                setOrderStatus(order.status)
                                setOrderNote(order.notes)
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
  {/* POPUP MODAL */}
            {popupVisible && clickedOder && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="w-[750px] max-h-[90vh] bg-white rounded-2xl shadow-xl p-6 relative ">

                     {/* CLOSE BUTTON OUTSIDE */}
                        <button
                            onClick={() => setPopupVisible(false)}
                            className="absolute top-[-25px] right-[-25px] w-[30px] h-[30px] bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:text-red-500 border border-red-500 transition"
                        >
                        ✕
                        </button>

                    {/* TITLE */}
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

                    {/* ORDER INFO */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <p className="text-gray-500 text-sm">Order ID</p>
                            <p className="font-semibold">{clickedOder.orderId}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Date</p>
                            <p className="font-semibold">
                            {new Date(clickedOder.date).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Customer</p>
                            <p className="font-semibold">{clickedOder.name}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Customer email</p>
                            <p className="font-semibold">{clickedOder.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Phone</p>
                            <p className="font-semibold">{clickedOder.phone}</p>
                        </div>

                        

                        <div>
                            <p className="text-gray-500 text-sm">Status</p>
                            <span
                            className={`px-2 py-1 rounded text-sm ${
                                clickedOder.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : clickedOder.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                            >
                            {clickedOder.status}
                            </span>
                            <select className="ml-4 p-1 border rounded"
                                value={odrerStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        {/* ADDRESS */}
                        <div className="mb-6">
                        <p className="text-gray-500 text-sm">Address</p>
                        <p className="font-medium">{clickedOder.address}</p>
                        </div>
                        </div>

                        

                    {/* ITEMS */}
                    <div>
                    <h3 className="text-lg font-semibold mb-3">Order Items</h3>

                    <div className="space-y-4 max-h-[150px] overflow-y-auto">
                        {clickedOder.items?.map((item, i) => (
                        <div key={i} className="border rounded-xl p-3">

                            {/* IMAGES */}
                            <div className="flex gap-2 overflow-x-auto mb-2">
                            {(item.images || [item.image])?.map((img, idx) => (
                                <img
                                key={idx}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                className="w-16 h-16 object-cover rounded border cursor-pointer hover:scale-110 transition"
                                />
                            ))}
                            </div>

                            {/* INFO */}
                            <div className="flex justify-between items-center">
                                <div>
                                <p className="font-semibold">{item.productId}</p>
                            </div>

                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                Qty: {item.qty}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm">
                                {item.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "LKR",
                                })}
                                </p>
                                <p className="font-bold text-blue-600">
                                {(item.qty * item.price).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "LKR",
                                })}
                                </p>
                            </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
                        <div>
                            <p className="text-gray-500 text-sm">Note</p>
                            <p className="font-semibold">{clickedOder.notes}</p>
                        </div>
            {/* TOTAL */}
            <div className="mt-6 flex justify-end border-t pt-4">
                    
              <div className="text-right">
                <p className="text-gray-500">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {clickedOder.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* IMAGE PREVIEW POPUP */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[60]">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-[-25px] right-[-30px] w-8 h-8 bg-red-500 text-white rounded-full hover:text-red-500 hover:bg-white"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
        </div>
    )
}