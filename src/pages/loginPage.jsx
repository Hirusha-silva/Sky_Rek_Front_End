import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";



export default function LoginPage() {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate() //navigate function eka use karala page ekak thiyana route ekata navigate karanawa

    const googleLogin = useGoogleLogin({
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login",{
                token: response.access_token
            }).then((res)=>{
                localStorage.setItem("token",res.data.token) //local storage ekata token eka set karanawa, res.data.token kiyanne backend eken return karana token eka
                toast.success("Login successful") //react hot toast ekak use karala login successful kiyana message ekak display karanawa
                if(res.data.role === "ADMIN"){
                    navigate("/admin") //navigate function eka use karala admin page ekata navigate karanawa
                }else if(res.data.role === "USER"){
                    navigate("/") //navigate function eka use karala home page ekata navigate karanawa
                }
            }).catch((err)=>{
                console.log(err);
                toast.error("Google Login failed") //react hot toast ekak use karala login failed kiyana message ekak display karanawa
            })
    }
    })


    function login(){
        console.log(email);
        console.log(password);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login",{
            email:email,
            password:password
        }).then((res)=>{
            console.log(res.data);
            localStorage.setItem("token",res.data.token) //local storage ekata token eka set karanawa
            // alert("Login successful")
            toast.success("Login successful") //react hot toast ekak use karala login successful kiyana message ekak display karanawa

            if(res.data.role === "ADMIN"){
                navigate("/admin") //navigate function eka use karala admin page ekata navigate karanawa
            }else if(res.data.role === "USER"){
                navigate("/") //navigate function eka use karala home page ekata navigate karanawa
            }
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
                <button onClick={googleLogin} className="w-[350px] h-[50px] bg-blue-500 text-white rounded-3xl mt-5">Google Login</button>
                <p className="text-lg mt-5">Don't have an account? <Link to={"/register"} className="text-blue-500">Sign up</Link></p>
                <p className="text-lg mt-5 text-white">Forget Password? <Link to={"/forgot-password"} className="text-blue-500">Reset password</Link></p>
            </div>
        </div>
    )
}