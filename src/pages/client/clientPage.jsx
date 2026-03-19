import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";

export default function ClientPage(){
    return(
        <div className="w-full h-screen max-h-screen ">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] p-2 ">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-3xl text-center">welcome to home page</h1>}></Route>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/reviews" element={<h1 className="text-3xl text-center"> reviews page</h1>}></Route>
                    <Route path="/about-us" element={<h1 className="text-3xl text-center"> about us page</h1>}></Route>
                    <Route path="/contact-us" element={<h1 className="text-3xl text-center"> contact us page</h1>}></Route>
                    <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>}></Route>
                </Routes>

            </div>
        </div>
    )
}