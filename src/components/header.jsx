import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { HiHome, HiHomeModern } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem("token")
    return(
        <header className="h-[100px] bg-accent flex justify-center items-center relative">
            {isOpen && 
                <div className="fixed z-[100] w-[100vw] h-[100vh] bg-black/50 top-0 right-0"> 
                <div className="h-full w-[300px] flex flex-col bg-white">
                    <div className="w-full bg-accent h-[100px] flex pl-[40px] flex-row items-center gap-[20px]">
                        <RxHamburgerMenu className="text-white  md:hidden text-4xl" onClick={() => setIsOpen(false)}/>
                        <img className="w-[120px]   h-[80px] cursor-pointer object-cover" src="/Lumina_Beauty-removebg-preview.png" onClick={() => navigate('/')} />
                    </div>
                    <div className="w-full flex flex-col p-[45px] items-start">
                        <button className="text-accent text-2xl flex flex-row items-center " onClick={()=>{
                            setIsOpen(false)
                            navigate("/")
                        }}>
                            <HiHome className="text-accent mr-2"/>
                            Home
                        </button>

                        <button className="text-accent text-2xl flex flex-row items-center " onClick={()=>{
                            setIsOpen(false)
                            navigate("/products")
                        }}>
                            <BiStore className="text-accent mr-2"/>
                            Products
                        </button>

                        <button className="text-accent text-2xl flex flex-row items-center " onClick={()=>{
                            setIsOpen(false)
                            navigate("/cart")
                        }}>
                            <BiCart className="text-accent mr-2"/>
                            Cart
                        </button>
                    </div>
                </div>
                    
                </div>
                
            }
            <img className="w-[120px] absolute md:left-[30px] h-[80px] cursor-pointer object-cover" src="/Lumina_Beauty-removebg-preview.png" onClick={() => navigate('/')} />
            <RxHamburgerMenu className="text-white absolute left-[40px] md:hidden text-4xl" onClick={()=>{
                setIsOpen(true)
            }}/>
            <div className="hidden w-full md:flex justify-center items-center">
            <Link to="/" className="ml-4 text-white text-xl ">Home</Link>
            <Link to="/products" className=" ml-4 text-white text-xl ">Products</Link>
            <Link to="/reviews" className=" ml-4 text-white text-xl ">Reviews</Link>
            <Link to="/about-us" className=" ml-4 text-white text-xl ">About Us</Link>
            <Link to="/contact-us" className=" ml-4 text-white text-xl ">Contact Us</Link>
            <Link to="/cart" className="absolute right-[160px]  "><BiCart className="text-white text-3xl ml-4 "/> </Link>
            {
                token != null && <button className="absolute right-[80px] ml-4 text-white text-xl" onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/login")
                }}>
                    Logout
                </button>
            }
            </div>
        </header>
    ) 
    
}