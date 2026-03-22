export function getCart(){
    let cartInString = localStorage.getItem("cart"); // local storage eke thiyna cart eka gnnwa 

    if(cartInString == null){ // local storage eke cart ekak thiynwad kiyl check krnwa 
        cartInString = "[]"
        localStorage.setItem("cart", cartInString); // local storage eke cart ekak naththam empty array ekak set krnwa
    }

    const cart = JSON.parse(cartInString); // local storage eke cart eka string ekak widiyata thiyenwa nisa e string eka parse krnwa json ekak widiyata convert krnwa
    return cart;
}


export function addToCart(product,qty){
    const cart = getCart()

    const exsistingProductIndex = cart.findIndex((item) => {
        return item.productId === product.productId // samana productid thiynwanm true return kranwa
    }); 

    if(exsistingProductIndex == -1){
        cart.push({
            productId: product.productId,
            name: product.name,
            price: product.price,
            quantity: qty,
            altNames: product.altNames,
            image: product.images[0]
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{
        const newQty = cart[exsistingProductIndex].quantity + qty;
        if(newQty <= 0){
            const newCart = cart.filter((item,index) => {
                return index !== exsistingProductIndex // exsisting product index ekak naththam true return krnwa asmana index okkoma aragena array ekak hadanwa
            })
            localStorage.setItem("cart", JSON.stringify(newCart));
        }else{
            cart[exsistingProductIndex].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

}


export function getTotal(){
    const cart = getCart()
    let total = 0
    cart.forEach((index) => {
        total += item.quantity * item.price
    });
    return total
}