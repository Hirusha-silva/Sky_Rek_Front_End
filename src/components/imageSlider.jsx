import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
    return(
        <div className="w-[300px] h-[500px] ">
            <img src={images[activeImageIndex]} className="w-[full] h-[400px] object-cover" />
            <div className="w-[full] h-[100px] flex flex-row gap-[2px] justify-center items-center">
                {
                    images.map(
                        (image,index) => {
                            return(
                                <img key={index} src={image} className={"w-[90px] h-[90px] object-cover m-2 cursor-pointer" + (activeImageIndex == index && " border border-[5px]")} 
                                    onClick={()=>{
                                        setActiveImageIndex(index) 
                                    }}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}