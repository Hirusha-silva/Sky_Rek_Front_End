import { useState } from "react";

export default function TestPage() {

    const [count, setCount] = useState(0);

    function incerment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div className="w-full h-screen bg-purple-500 justify-center items-center flex">

            <div className="w-[400px] h-[400px] flex flex-col bg-white justify-center items-center">
                <h1 className="text-5xl font-bold ">{count}</h1>
                <div className="w-full flex h-[100px] justify-center border items-center">
                    <button onClick={incerment} className="bg-blue-600 w-[100px] h-[75px] text-4xl flex justify-center items-center rounded-full m-2" > + </button>
                    <button onClick={decrement} className="bg-blue-600 w-[100px] h-[75px] text-4xl  flex justify-center items-center rounded-full m-2"> - </button>
                </div>
            
            </div>
        </div>
    )
}