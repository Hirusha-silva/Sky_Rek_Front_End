import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="w-full h-screen bg-[url(./backGround.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[600px] h-[600px] backdrop-blur-sm relative rounded-[60px] gap-[20px] shadow-2xl text-black flex flex-col items-center justify-center">
                <h1 className="text-4xl absolute top-[20px] font-bold text-center my-5">Login</h1>
                <div className=" w-[350px]  flex flex-col  ">
                    <span className="text-lg">Email</span>
                    <input type="text" className="w-[350px] border h-[50px] border-black rounded-3xl" />
                </div>
                <div className=" w-[350px]  flex flex-col  ">
                    <span className="text-lg">Password</span>
                    <input type="password" className="w-[350px] border h-[50px] border-black rounded-3xl" />
                </div>
                <button className="w-[350px] h-[50px] bg-blue-500 text-white rounded-3xl mt-5">Login</button>
                <p className="text-lg mt-5">Don't have an account? <Link to={"/register"} className="text-blue-500">Sign up</Link></p>
                
            </div>
            
            
        </div>
    )
}