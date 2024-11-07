const fs = require('node:fs');
const express = require('express');
console.log("break");
const router = require("./app/controllers/router");


const app  = express();
app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));
app.use(router);
const port = 3000;



//ruta home o standard que solo regresa un comentario
app.get("/trial", (req, res) => {
    
    res.send("e-commerce app práctica 3");
});


app.listen(port, () => {
    console.log("Aplicacione sta corriendo en el puerto" + port);
});
