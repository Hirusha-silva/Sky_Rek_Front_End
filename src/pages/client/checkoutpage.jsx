import { useState } from "react"
import { TbTrash } from "react-icons/tb"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    // localStorage.setItem("cart","[]") // cart eka empty krnwa local storage eke
    const [cart,setCart] = useState(location.state.items || [])

    if(location.state.items == null){
        toast.error("Please select items to checkout")
        navigate("/products")
    }

    function getTotal(){
       let total = 0
       cart.forEach((item) => {
           total += item.quantity * item.price
       });
       return total
   }

    return(
        <div className="w-full h-screen flex flex-col py-[40px] items-center">
            {
                cart.map(
                    (item,index)=> {
                        return(
                            <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover" />
                                <div className="w-[320px] h-full   flex flex-col justify-center pl-[10px]">
                                    <span className=" font-bold">{item.name}</span>
                                    <span className="">${item.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                </div>
                                <div className="w-[190px] h-full flex flex-row justify-center items-center">
                                    <button className="flex justify-center items-center bg-blue-500 rounded-full w-[30px]  text-white cursor-pointer hover:bg-blue-900" onClick={
                                        ()=>{
                                            const newCart = [...cart]
                                            newCart[index].quantity -= 1;
                                            if(newCart[index].quantity <= 0){
                                                newCart.splice(index,1)
                                            }  
                                            setCart(newCart)
                                        }
                                    }>-</button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center bg-blue-500 rounded-full w-[30px] text-white cursor-pointer hover:bg-blue-900" onClick={
                                        ()=>{
                                            const newCart = [...cart]
                                            newCart[index].quantity += 1;
                                            setCart(newCart)
                                        }
                                    }>+</button>
                                </div>
                                <div className="w-[190px] h-full flex  justify-end items-center pr-[10px]">
                                    <span className="font-bold">${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                </div>
                                <button className="w-[30px] h-[30px] right-[-40px] absolute bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-500 hover:bg-white hover:text-red-500 cursor-pointer" onClick={
                                    ()=> {
                                       
                                    }
                                }>
                                    <TbTrash/>
                                </button>
                            </div>
                        )
                    }
                )
            }
            <div className="w-[800px] h-[100px] m-[10px]  p-[10px] shadow-2xl flex flex-row justify-end items-center relative">
                <span className="text-2xl font-bold">
                    Total: {getTotal().toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                </span>
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-700 border-[2px] border-blue-700 text-white hover:bg-white hover:text-blue-700">Place Order</button>
            </div>
        </div>
    )
}