//AFTER PRODUCTS (neccesary}
//console.log(variable1)
const product_js = require("./products");


/*
class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}
*/
class ShoppingCartException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}
class ProductProxy{
    #uuid
    #cantidad
    constructor(uuid, cantidad){
        this.cantidad = cantidad;
        this.#uuid = uuid;
    }
    get uuid(){return this.#uuid;} 
    get cantidad(){return this.#cantidad;} 
    set cantidad(x){ if(x>0) this.#cantidad = x; else throw new ShoppingCartException("Inputed a negative num, not valid")}
}


class ShoppingCart{
    #proxies = [];
    productos_lista = [];
    value = 0;
    constructor(){

    }
    findItem(productUuid){
        let wasItFound = false;
        this.#proxies.forEach(element => {
            if(element.uuid == productUuid){
                wasItFound = true;
            }
        });
        return wasItFound;
    }
    addItem(productUuid, amount){
        //search if a product proxie with a uuid with the one asked for is already added
        let wasItFound = false;
        this.#proxies.forEach(element => {
            if(element.uuid == productUuid){
                element.cantidad = element.cantidad + amount;
                wasItFound = true;
            }
        });
        if(!wasItFound){ //not found so we add it
            this.#proxies.push(new ProductProxy(productUuid, amount));
            product_js.Product.not_safe(productUuid);
            
            let xhr = new XMLHttpRequest();
            xhr.open('GET', ("http://localhost:3000/products/" + productUuid));
        
            xhr.send();
            xhr.onload = function () {
                if(xhr.status != 200) {
                    alert(xhr.status + ": " + xhr.statusText);
                }
                else{
                    console.log(xhr.responseText)
                    this.productos_lista.push(xhr.responseText)
                }
            }

            this.productos_lista.push(Data.getProductById(productUuid));
            //this.productos_lista.push()
            //Te faltaba funciojn de data handler

            //AITUTCDWVOUYJLGVDWBOIUKLDBWJHKDVJHADBALJHVASHJBVJSKVAS
        }
    }
    updateItem(productUuid, newAmount){
        
        if(!this.findItem(productUuid)){
            throw new ShoppingCartException("attempted to update a non existant item");
        }

        if(newAmount>0){
            this.#proxies.forEach(element => {
                if(element.uuid == productUuid){
                    element.cantidad = newAmount;
                }
            });
        }
        else if(newAmount == 0){
            this.removeItem(productUuid);
        }
        else{ throw new ShoppingCartException("Inputed a negative num, not valid");}
    }
    removeItem(productUuid){
        let not_found = true
        for(let i = 0; i < this.#proxies.length && not_found; i++){
            if(this.#proxies[i].uuid == productUuid){
                this.#proxies.splice(i, 1);
                this.productos_lista.splice(i, 1);
                not_found = false;
            }
        }
        if(not_found){
            throw new ShoppingCartException("tried to remove a non existent item");
        }
    }
    getPriceById(uuid){
        this.productos_lista.forEach(element => {
            if(uuid == element.uuid)
                return element.pricePerUnit;
        });
        for(let i = 0; i < this.productos_lista.length; i++){
            if(uuid == this.productos_lista[i].uuid)
                return this.productos_lista[i].pricePerUnit;
        }
    }
    calculateTotal(){
        let total = 0;
        this.#proxies.forEach(element => {
            total += element.cantidad * this.getPriceById(element.uuid);
        });
        console.log(total);
    }
    printAllProxies(){
        
        let dummies = []
        for (let i = 0; i < this.#proxies.length; i++) {
            dummies.push({
                uuid : this.#proxies[i].uuid,
                cantidad : this.#proxies[i].cantidad
            });
            
        }
        console.table(dummies);
    }
    printAllProducts(){
        let dummy_Products = []
        for (let i = 0; i < this.productos_lista.length; i++) {
            dummy_Products.push({
                uuid : this.productos_lista[i].uuid,
                title : this.productos_lista[i].title,
                description : this.productos_lista[i].description,
                imageUrl : this.productos_lista[i].imageUrl, 
                unit : this.productos_lista[i].unit, 
                stock : this.productos_lista[i].stock, 
                pricePerUnit : this.productos_lista[i].pricePerUnit, 
                category : this.productos_lista[i].category
            })
        }
        console.table(dummy_Products);
    }

}

console.log("this executes every time i open the page");
let cart_sexy = new ShoppingCart();








module.exports = ShoppingCart;
//nice1 = new ShoppingCart();
//(nice1.proxies).push("item");

//si se activa search con enter, entonces buscamos un producto con tal nombre
//buscar que id esta relacionado
//llamo a server para decirle de que, ey cuanto cuesta y tienes en stock?