export default function ProductCard(props){
    const product = props.product;
    return(
        <div className="w-[300px] h-[400px] flex shrink-0 flex-col shadow-2xl rounded-2xl overflow-hidden">
            <img src={product.images[0]} className="w-full h-[275px] object-cover"/>
            <div className="w-full h-[125px]  flex flex-col">
                <span className="text-gray-500 text-[12px]">{product.productId}</span>
                <h1 className="text-lg font-bold">{product.name} {" "}
                    <span className="text-gray-500 text-[12px]"> {product.category}</span>
                </h1>
                <div>
                    {product.labelledPrice > product.price ? (
                        <p>
                            <span className="line-through text-gray-500 text-sm">{product.labelledPrice.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                            <span className="text-green-500 font-bold text-lg ml-2">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</span>
                        </p>
                    ) : (
                        <p className="text-green-500 font-bold text-lg">{product.price.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</p>
                    )}
                </div>

            </div>
        </div>
    )
}