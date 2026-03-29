import { useEffect, useState } from "react"
import { TbTrash } from "react-icons/tb"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { PiMinus, PiPlus } from "react-icons/pi"

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()

    const [user,setUser] = useState(null)
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login to checkout")
            navigate("/login")
            return
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/",{
                headers:{
                    Authorization : `Bearer ${token}`,  
                },
            }).then((res)=>{
                setUser(res.data)
                setName(res.data.firstName + ' ' + res.data.lastName)
            }).catch((err)=>{
                console.log(err);
                toast.error("Failed to fetch user details")
                navigate("/login")
            })
        }
    },[])

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

    async function placeOrder(){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login to place order")
            navigate("/login")
            return
        }

        if(name === "" || address === "" | phone === "" ){
            toast.error("Please fill all the fields")
            return
        }

        const order ={
            address: address,
            phone: phone,
            items: []
        }

        cart.forEach((item)=>{
            order.items.push({
                productId: item.productId,
                qty: item.quantity
            })
        })

        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",order,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            toast.success("Order Place successfully")
        }catch(error){
            console.log(error);
            toast.error("Fail to place order")
            return
        }
    }

    return(
        <div className="w-full h-screen px-[10px] flex flex-col py-[40px] items-center">

            {
                cart.map((item,index)=> {
                    return(
                        <div key={item.productId} className="w-full md:w-[800px] md:h-[100px] m-[10px] shadow-2xl flex flex-row items-center relative">

                            <div className="w-[150px] md:w-[300px] flex flex-col md:flex-row justify-center items-center">
                                <img src={item.image} className="max-w-[100px] h-[100px] object-cover" />
                                <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                                    <span className="font-bold text-center md:text-left">{item.name}</span>
                                    <span className="text-center md:text-left">
                                        ${item.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full h-full">

                                <div className="w-[190px] h-full flex flex-row text-3xl md:text-lg justify-center items-center">
                                    <button
                                        className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] text-white cursor-pointer hover:bg-blue-500"
                                        onClick={()=>{
                                            const newCart = [...cart]
                                            newCart[index].quantity -= 1;
                                            if(newCart[index].quantity <= 0){
                                                newCart.splice(index,1)
                                            }  
                                            setCart(newCart)
                                        }}
                                    >
                                        <PiMinus/>
                                    </button>

                                    <span className="mx-[10px]">{item.quantity}</span>

                                    <button
                                        className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] text-white cursor-pointer hover:bg-blue-500"
                                        onClick={()=>{
                                            const newCart = [...cart]
                                            newCart[index].quantity += 1;
                                            setCart(newCart)
                                        }}
                                    >
                                        <PiPlus/>
                                    </button>
                                </div>

                                <div className="w-[190px] h-full flex text-2xl md:text-lg justify-center items-center pr-[10px]">
                                    <span className="font-bold">
                                        ${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                                    </span>
                                </div>

                            </div>

                            <button
                                className="w-[30px] h-[30px] top-[0px] right-[0px] md:top-[35px] md:right-[-40px] absolute bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-500 hover:bg-white hover:text-red-500 cursor-pointer"
                                onClick={()=>{
                                    const newCart = [...cart]
                                    newCart.splice(index,1)
                                    setCart(newCart)
                                }}
                            >
                                <TbTrash/>
                            </button>

                        </div>
                    )
                })
            }

            {/* TOTAL + BUTTON */}
            <div className="md:w-[800px] w-full h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row justify-end items-center relative">
                <span className="text-md md:text-2xl font-bold">
                    Total: {getTotal().toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                </span>

                <button
                    onClick={placeOrder}
                    className="absolute w-[100px] md:w-[150px] left-[10px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-accent border-[2px] border-accent text-white hover:bg-white hover:text-blue-500"
                >
                    Place Order
                </button>
            </div>

            {/* FORM */}
            <div className="md:w-[800px] w-full m-[10px] p-[20px] shadow-2xl flex flex-col md:flex-row justify-center items-center gap-[10px]">
                
                <input
                    type="text"
                    className="w-full md:w-[200px] h-[40px] border border-gray-400 rounded-lg px-[10px]"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    type="text"
                    className="w-full md:w-[200px] h-[40px] border border-gray-400 rounded-lg px-[10px]"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />

                <input
                    type="text"
                    className="w-full md:w-[200px] h-[40px] border border-gray-400 rounded-lg px-[10px]"
                    placeholder="Enter Your Phone"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />

            </div>

        </div>
    )
}