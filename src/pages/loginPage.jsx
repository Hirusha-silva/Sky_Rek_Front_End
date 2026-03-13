import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")


    function login(){
        console.log(email);
        console.log(password);

        axios.post("http://localhost:5001/api/users/login",{
            email:email,
            password:password
        }).then((res)=>{
            console.log(res.data);
            // alert("Login successful")
            toast.success("Login successful") //react hot toast ekak use karala login successful kiyana message ekak display karanawa
        }).catch((err)=>{
            console.log(err);
            // alert("Login failed")
            toast.error("Login failed") //react hot toast ekak use karala login failed kiyana message ekak display karanawa
        })
        
        
    }

    return (
        <div className="w-full h-screen bg-[url(./backGround.jpg)] bg-cover bg-center flex justify-center items-center">

            <div className="w-[600px] h-[600px] backdrop-blur-sm relative rounded-[60px] gap-[20px] shadow-2xl text-black flex flex-col items-center justify-center">

                <h1 className="text-4xl absolute top-[20px] font-bold text-center my-5">Login</h1>
                <div className=" w-[350px]  flex flex-col  ">
                    <span className="text-lg">Email</span>
                    <input onChange={(e)=>{
                        setEmail(e.target.value) //email eka state ekata set karanawa, e.target.value kiyanne input field eke thiyana value eka, e value eka email state ekata set karanawa
                    }} type="text" className="w-[350px] border h-[50px] border-black rounded-3xl" />
                </div>

                <div className=" w-[350px]  flex flex-col  ">
                    <span className="text-lg">Password</span>
                    <input onChange={(e)=>{
                        setPassword(e.target.value) //password eka state ekata set karanawa, e.target.value kiyanne input field eke thiyana value eka, e value eka password state ekata set karanawa
                    }}  type="password" className="w-[350px] border h-[50px] border-black rounded-3xl" />
                </div>

                <button onClick={login} className="w-[350px] h-[50px] bg-blue-500 text-white rounded-3xl mt-5">Login</button>
                <p className="text-lg mt-5">Don't have an account? <Link to={"/register"} className="text-blue-500">Sign up</Link></p>
                
            </div>
        </div>
    )
}