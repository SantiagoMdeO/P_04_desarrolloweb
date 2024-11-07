//After utils (neccesary}
//aqui no importamos el error que necesita product?

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Product {
    uuid;
    title;
    description;
    imageUrl;
    unit;
    stock;
    pricePerUnit;
    category;
    constructor(uuid, title, description,
        imageUrl, unit, stock, pricePerUnit, category){
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }
    

    get uuid(){return this.uuid;}
    set uuid(x){if(typeof x === "number" ){this.uuid = x}else throw new ProductException("Inputed a title which was not a string")};

    get title(){return this.title;}
    set title(x) {if(typeof x === "string" ){this.title = x}else throw new ProductException("Inputed a title which was not a string")};
    
    get description(){return this.description;}
    set description(x) {if(typeof x === "string" ){this.description = x}else throw new ProductException("Inputed a description which was not a string")};
    
    get imageUrl(){return this.imageUrl;}
    set imageUrl(x) {if(typeof x === "string" ){this.imageUrl = x}else throw new ProductException("Inputed a imageUrl which was not a string")};
    
    get unit(){return this.unit;}
    set unit(x) {if(typeof x === "string" ){this.unit = x}else throw new ProductException("Inputed a unit which was not a string")};
    
    get stock(){return this.stock;}
    set stock(x) {if(typeof x === "number" && x>=0){this.stock = x}else throw new ProductException("Inputed a stock which was not a number")};
    
    get pricePerUnit(){return this.pricePerUnit;}
    set pricePerUnit(x) {if(typeof x === "number" && x>0){this.pricePerUnit = x}else throw new ProductException("Inputed a pricePerUnit which was not a number")};
    
    get category(){return this.category;}
    set category(x) {if(typeof x === "string" ){this.category = x}else throw new ProductException("Inputed a category which was not a string")};
    

    
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        });
    }
    static keys_array(){
        let keys = [];
        keys.push("uuid", "title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category");
        return keys;
    }
    static createFromJson(json_value){
        json_value = JSON.parse(json_value);
        return new Product(
            json_value["uuid"], 
            json_value["title"], 
            json_value["description"], 
            json_value["imageUrl"], 
            json_value["unit"], 
            json_value["stock"], 
            json_value["pricePerUnit"], 
            json_value["category"]
        );
    }
    static createFromObject(obj){
        return new Product(
        obj["uuid"],
        obj["title"], 
        obj["description"], 
        obj["imageUrl"], 
        obj["unit"], 
        obj["stock"], 
        obj["pricePerUnit"], 
        obj["category"]
        );
    }
    static cleanObject(obj){
        let keys = Object.keys(obj);
        let product_keys = Product.keys_array();
        keys.forEach(element => {
            if(!product_keys.includes(element)){
                delete obj[element];
            }
        });
        
    }
    //funciones que yo agregue:
    static create_copy(original){
        //probar si puede vaciar esto de abajo
        return new Product(
            original.uuid,
            original.title, 
            original.description,
            original.imageUrl, 
            original.unit, 
            original.stock, 
            original.pricePerUnit, 
            original.category
        );
        
        //temp = structuredClone(original);
        
        
    }
    
    
}


module.exports = Product
