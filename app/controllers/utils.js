//origin 
var total_added = 0;
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}
function generateUUIDpirata() {
    total_added++;
    return total_added-1;
    
}
/*
class example{
    public_int;
    #private_int;
    constructor(x, y){
        this.public_int = x;
        this.#private_int = y;
    } 
    get private_int(){return this.#private_int;}
    set private_int(y) {if(typeof y === "number" && y>=0){
        this.#private_int = y}else throw new ProException("Inputed a stock which was not a number")
    };

    static print_contents(){
        console.log(this.public_int);
        console.log(this.private_int);
    }
}
*/
exports.generateUUID = generateUUID;
exports.generateUUIDpirata = generateUUIDpirata;
