import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../util/cart"
import { TbTrash } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { PiMinus, PiPlus } from "react-icons/pi"

export default function CartPage(){
    // localStorage.setItem("cart","[]") // cart eka empty krnwa local storage eke
    const [cart,setCart] = useState(getCart())
    const navigate = useNavigate()

    return(
        <div className="w-full h-screen px-[10px] flex flex-col py-[40px] items-center">
            {
                cart.map(
                    (item)=> {
                        return(
                            <div key={item.productId} className="w-full md:w-[800px] md:h-[100px] m-[10px] shadow-2xl flex  flex-row items-center relative">
                                <div className=" w-[150px] md:w-[300px] md:flex-row flex flex-col justify-center items-center ">
                                    <img src={item.image} className="max-w-[100px] h-[100px] object-cover" />
                                    <div className="w-[320px] h-full   flex flex-col justify-center  pl-[10px]">
                                        <span className=" font-bold text-center md:text-left">{item.name}</span>
                                        <span className="text-center md:text-left">${item.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center  w-full h-full ">
                                <div className="w-[190px] h-full flex flex-row text-3xl md:text-lg justify-center items-center">
                                    <button className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px]  text-white cursor-pointer hover:bg-blue-500" onClick={
                                        ()=>{
                                            addToCart(item,-1)
                                            setCart(getCart())
                                        }
                                    }> <PiMinus/> </button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] text-white cursor-pointer hover:bg-blue-500" onClick={
                                        ()=>{
                                            addToCart(item,1)
                                            setCart(getCart())
                                        }
                                    }> <PiPlus/> </button>
                                </div>
                                <div className="w-[190px] h-full flex text-2xl md:text-lg justify-center items-center pr-[10px]">
                                    <span className="font-bold">${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                                </div>
                                </div>
                                <button className="w-[30px] h-[30px] top-[0px] right-[0px] md:top-[35px] md:right-[-40px] absolute bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-500 hover:bg-white hover:text-red-500 cursor-pointer" onClick={
                                    ()=> {
                                        addToCart(item, -item.quantity)
                                        setCart(getCart())
                                    }
                                }>
                                    <TbTrash/>
                                </button>
                            </div>
                        )
                    }
                )
            }
            <div className="md:w-[800px] w-full h-[100px] m-[10px]  p-[10px] shadow-2xl flex flex-row justify-end items-center relative">
                <span className="text-md md:text-2xl font-bold">
                    Total: {getTotal().toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                </span>
                <button className="absolute w-[100px] left-[10px] md:w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-blue-500" onClick={()=>{
                    navigate("/checkout",{state:{items:cart}})
                }}>Checkout</button>
            </div>
        </div>
    )
}