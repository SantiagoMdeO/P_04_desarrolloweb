const path = require('path');
const product = require('./products');
const fs = require('node:fs');
const { off } = require('process');
const jsonDataPath = path.join(__dirname, '..', 'data', 'products.json');

//bellow everyhting i think

function giveJSONBack(){
    AllProductsJSON = fs.readFileSync(jsonDataPath, 'utf8');
    let products = JSON.parse(AllProductsJSON);
    return products;
}
function getProducts(){

    let products = giveJSONBack();
    let productNameArray = [];
    products.products.forEach(element => {
        productNameArray.push(element.title);
    });
    return productNameArray;
}
function getProductsby4(page){
    let products = giveJSONBack();
    //if page 1, then add 0, 2=4
    let offset = (page-1)*4;
    let arrayOfProducts = [];
    for(let i = 0; i< 4; i++){
        arrayOfProducts.push(products.products[i+offset]);
    }
    return arrayOfProducts;
}
function getProductsUuids(){
    let products = giveJSONBack();
    let actual_products = products.products;
    let uuidArray = [];
    actual_products.forEach(element => {
        uuidArray.push(element.uuid);
    });
    return uuidArray;
}
function getProductById(uuid){ //NO HECHO ESTO
    let products = giveJSONBack();
    for (let i = 0; i < products.products.length; i++) {
        if (products.products[i].uuid === uuid) {
            return product.create_copy(products.products[i]);
        }
    }
    return null;
}

function createProduct(product_argument_obj){
    /*let product_json = {
        "uuid": "12",
        "title": "Product 12",
        "description": "Short description 1",
        "imageUrl": "string",
        "unit": "pieces",
        "stock": 50,
        "pricePerUnit": 10.99,
        "category": "Electronics"
        }   */
    let ind_product = product.createFromObject(product_argument_obj);
    let products = giveJSONBack();
    //products.push(product_argument); original
    products.products.push(ind_product); 
    
    //                                  Magias negras de stack overflow
    const updatedData = JSON.stringify(products, null, 2);
    fs.writeFileSync(jsonDataPath, updatedData);
    
}
function updateProduct(uuid, updatedProduct) { //NO HAS TERMINADO ESTEEEEEE
    let found = deleteProduct(uuid);
    if(found){
        createProduct(updatedProduct);
    } else{
        console.log("we coudnt find what you were trying to update");
    }
    
}
function deleteProduct(uuid){
    let products = giveJSONBack();
    let not_found = true;
    for(let i = 0; i<products.products.length && not_found; i++){
        if(products.products[i].uuid == uuid){
            products.products.splice(i, 1);
            not_found = false;
        }
    }
    if(!not_found){
        const updatedData = JSON.stringify(products, null, 2);
        fs.writeFileSync(jsonDataPath, updatedData);
    }
    return !not_found;
}







//caller = new Data();


exports.getProducts = getProducts;
exports.getProductsUuids = getProductsUuids;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsby4 = getProductsby4;


/*
let product1 = new Product("MontesdeOca_745377", "Short description 1", "string", "pieces", 50, 10.99, "Electronics");
let product2 = new Product("MontesdeOca_745377", "Short description 2", "string", "boxes", 20, 25.49, "Home & Garden");
let product3 = new Product("MontesdeOca_745377", "Short description 3", "string", "packs", 100, 5.99, "Clothing");
let product4 = new Product("MontesdeOca_745377", "Short description 4", "string", "sets", 30, 15.79, "Health & Beauty");

Data.createProduct(product1);
Data.createProduct(product2);
Data.createProduct(product3);
Data.createProduct(product4);
*/




