const express = require('express');
const router = express.Router();
const product = require("../controllers/products.js");
const dataHandler = require('../controllers/data_handler.js');  


function validateProductAttributesMiddleware(req, res, next) {
    const requiredAttributes = [
        'uuid', 
        'title', 
        'description', 
        'imageUrl',
        'unit', 
        'stock', 
        'pricePerUnit', 
        'category'
    ];

    try {
        for (const attribute of requiredAttributes) {
            if (!(attribute in req.body)) {
                throw new Error(`Falta el atributo '${attribute}' en el cuerpo de la solicitud`);
            }
        }
        // si todo chido, muevete ya al post
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

router.post("/", validateProductAttributesMiddleware ,(req, res) => {
    let req_body = req.body;
    dataHandler.createProduct(req_body);
    res.status(201).send(JSON.stringify(req_body["title"]));
});

router.put("/:id", validateProductAttributesMiddleware ,(req, res) => {
    let found_product = dataHandler.getProductById(req.params.id);
    console.log(found_product);
    if(found_product !=null){
        let req_body = req.body;
        dataHandler.updateProduct(req_body["uuid"] ,req_body);
        

        res.status(200).send(JSON.stringify(req_body["title"]));
    }else{
        res.status(404).send("Product not found");
    }
    
});

/*
No termine

function checkProductExistence(req, res, next) {
    const productUuid = req.params.id;
    AllProductsJSON = fs.readFileSync(jsonDataPath, 'utf8');
    let products = JSON.parse(AllProductsJSON);

    const product = products.find(prod => prod.uuid == productUuid);

    if (!product) {
        return res.status(404).send('Producto no encontrado');
    }

    req.product = product;
    next();
}
function validateProductAttributes(req, res, next) {
    const requiredAttributes = ['title', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];

    for (const attribute of requiredAttributes) {
        if (!(attribute in req.body)) {
            return res.status(400).send(`Falta el atributo '${attribute}' en el cuerpo de la solicitud`);
        }
    }

    next();
}


router.put("/:id", checkProductExistence, validateProductAttributes,(req, res) => 
{
    let uuid_product = req.params.id;
    console.log(uuid_product);
    exports.updateProduct(uuid_product, )

    product = products.find(prod => prod.uuid == productId);

    
});*/

module.exports = router;