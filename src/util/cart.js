export function getCart(){
    let cartInString = localStorage.getItem("cart"); // local storage eke thiyna cart eka gnnwa 

    if(cartInString == null){ // local storage eke cart ekak thiynwad kiyl check krnwa 
        cartInString = "[]"
        localStorage.setItem("cart", cartInString); // local storage eke cart ekak naththam empty array ekak set krnwa
    }

    const cart = JSON.parse(cartInString); // local storage eke cart eka string ekak widiyata thiyenwa nisa e string eka parse krnwa json ekak widiyata convert krnwa
    return cart;
}