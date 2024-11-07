//this file probably has to execute above all else, as module is declared here
const express = require('express');
const path = require('path');
const router = express.Router();
const productRouter = require("../routes/products.js");
const adminProductRouter = require("../routes/admin_products.js");
//agregados por tato:

function validateAdmin(req, res, next) {
    const authHeader = req.headers['x-auth'];
    console.log(authHeader);

    if (authHeader && authHeader === 'admin') {
        next();
    } else {
        res.status(403).send("no tienes acceso");
    }
}

// Asignar el middleware validateAdmin a la ruta "/admin/products"
router.use("/admin/products", validateAdmin, adminProductRouter);

router.use("/products", productRouter)
router.use("/admin/products", validateAdmin ,adminProductRouter)

router.get("/", (req, res) => 
{
    res.sendFile(path.resolve(__dirname + "\\..\\views\\home.html"))
    
});
router.get("/home", (req, res) => 
{
    res.sendFile(path.resolve(__dirname + "\\..\\views\\home.html"))
    
});
router.get("/cart", (req, res) => 
{
    res.sendFile(path.resolve(__dirname + "\\..\\views\\shopping_cart.html"))
    
});
router.get("/stylesxd.css", (req, res) => 
{
    res.sendFile(path.resolve(__dirname + "\\..\\views\\stylesxd.css"))
    
});
router.get("/index.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\views\\controllers\\index.js"))
});
router.get("/ClientHomejs.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\views\\controllers\\ClientHomejs.js"))
});
router.get("/ClientShopjs.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\views\\controllers\\ClientShopjs.js"))
});
router.get("/tests", (req, res) => 
{
    const dataHandler = require('./data_handler.js');  
    
    dataHandler.createProduct({
        "uuid": "12",
        "title": "Product 12",
        "description": "Short description 1",
        "imageUrl": "string",
        "unit": "pieces",
        "stock": 50,
        "pricePerUnit": 10.99,
        "category": "Electronics"
        } );
    dataHandler.createProduct({
        "uuid": "13",
        "title": "Product 13",
        "description": "Short description 1",
        "imageUrl": "string",
        "unit": "pieces",
        "stock": 10000,
        "pricePerUnit": 105.99,
        "category": "Electronics"
        } );
    console.log("before");
    
    console.log(dataHandler.deleteProduct(12));
    
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\views\\home.html"))
});





module.exports = router;

/*
Products.js y admin_products.js.
En estos archivos, pondrás las rutas que se describen a continuación en el resto de la
práctica. Considera que, para que funcione, deberás importar Router igual que en el archivo
anterior, y deberás exportarlo al final

*/




/*
router.get("/utils.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\controllers\\utils.js"))
});
router.get("/products.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\controllers\\products.js"))
});
router.get("/shopping_cart.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\controllers\\shopping_cart.js"))
    //esto lo agrego para crear un carrito en local memory
    const shopping_cart = require("./../controllers/shopping_cart.js");
    
});
router.get("/data_handler.js", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname + "\\..\\controllers\\data_handler.js"))
});

*/