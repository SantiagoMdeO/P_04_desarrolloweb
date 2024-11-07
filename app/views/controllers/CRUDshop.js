/*
// Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

nuestro carrito es una lista con objetos de id y amount
*/
function add(id, amount){
    //check if local storage is empty
    if(sessionStorage.getItem("cart") == null){
        console.log("it is empty")
        sessionStorage.setItem("cart", JSON.stringify([]));
    }
    //we look for the product
    let cart = returnAll();
    let flag = false;
    
    cart.forEach(product =>{
        if(product.id == id){
            product.amount = amount;
            flag = true;
        }
    });
    if(!flag){
        cart.push({"id": id, "amount": amount});
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
function deleteProduct(id){
    //check for id, remove if there is such id
    let cart = returnAll();
    let flag = false;
    if(cart){
        for(let i = 0; i < cart.length; i++){
            if(cart[i].id == id){
                flag = true;
                cart.splice(i, 1);
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        return flag;
    }else{
        console.log("cart doesnt exist. = " + id)
    }
    return false;
}
function clean(){
    //erase all products
    sessionStorage.clear();
}

function returnAll(){
    return JSON.parse(sessionStorage.getItem("cart"));
}
