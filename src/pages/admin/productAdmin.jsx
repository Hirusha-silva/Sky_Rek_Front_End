import { PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function ProductAdmin(){
    return(
        <div className="h-full w-full border-2">
            <Link to={"/admin/newProduct"} className="fixed bottom-10 right-10 bg-blue-500 text-white p-5 rounded-full shadow-2xl ">
                <PiPlus className="text-3xl"/>
            </Link>
        </div>
    )
}