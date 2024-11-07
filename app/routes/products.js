const fs = require('node:fs');
const express = require('express');
const path = require('path');
const router = express.Router();
const data = require('../controllers/data_handler.js');
//const router = require("./../controllers/router");

//router.get()
router.get("/", (req, res) => 
{
    //res.status(200).send(data.getProducts());
    res.status(200).send(data.getProductsUuids());
});
router.get("/filter/:list", (req, res) => 
{
    console.log("wgetting filters\n");
    //console.log(req.params.list);
    let filter_list = req.params.list;
    filter_list = Array.from(filter_list.split('-'));
    console.log(typeof filter_list)
    console.log(filter_list); //assumiendo que todos los argumentos dados para el filter existen como
    // parametros en el json we good
    
    let fileReadedCb = function(error, data){
        if(error){
            res.status(401).send("whoops");
            console.log(error);
        }
        let parsed = JSON.parse(data);
        let stringedJSON = "[";
        parsed.products.forEach(product => {
            stringedJSON += "{"
            filter_list.forEach(filter => {
                stringedJSON += "\"" +  filter +"\" : \"" + product[filter] + "\","
            });
            stringedJSON =stringedJSON.slice(0, -1)
            stringedJSON += "},"
            
        });
        console.log(stringedJSON)
        console.log("\n\n\n\n")
        stringedJSON =stringedJSON.slice(0, -1);
        stringedJSON += "]"; 
        res.status(200).send(JSON.parse(stringedJSON));

    }
    fs.readFile(__dirname + "\\..\\data\\products.json", 'utf8', fileReadedCb);
    
});

router.post("/cart", (req, res) => {
    let req_body = req.body;
    //req_body.products


    let fileReadedCb = function(error, data){
        if(error){
            res.status(401).send("whoops");
            console.log(error);
        }
        let parsed = JSON.parse(data);
        
        let foundMatch = false;
        parsed.products.forEach(product => {
            foundMatch = false;
            req_body.products.forEach(cart_pro => {
                if(product.uuid == cart_pro.uuid){
                    foundMatch = true;
                }
            });
            
            
        });

            if(!foundMatch){
                res.status(404).send("un mensaje explicando que no se encontró dicho producto.");
            }else{
                res.status(200).send(parsed);
            }

    }


    fs.readFile(__dirname + "\\..\\data\\products.json", 'utf8', fileReadedCb);
    //se me mandan los proxies como para buscarlos?
    //no se me manda unicamente el id, y la cantidad, 
    //el elemento que se me manda es body, entonces tengo que checar que sea un arreglo

});

router.get("/:id", (req, res) => 
{
    let found_product = data.getProductById(req.params.id);
    console.log(found_product);
    if(found_product !=null){
        res.status(200).send(found_product);
    }else{
        res.status(404).send("Product not found");
    }
});


router.get("/main/:page", (req, res) =>{
    let page = req.params.page;
    console.log(page);
    if(page !=null){
        res.status(200).send(data.getProductsby4(page));
    }else{
        res.status(404).send("Product not found");
    }
});

module.exports = router;


/*
// Define a route with a parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);



   console.log("we tried sending a filtered product\n");
    
    
    let fileReadedCb = function(error, data){
        if(error){
            res.status(401).send(user);
            console.log(error);
        }
        
        //so here we have data
        
        let uuid_product = req.get("id");
        
        let parsed = JSON.parse(data);

        const user = parsed.products.find((product) => product.uuid == uuid_product);
        res.status(200).send(user);
        

        
    }
    fs.readFile('./users.json', 'utf8', fileReadedCb);
});


*/