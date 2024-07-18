
import { promises } from "fs"
import { config } from "../../config.js";
class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }
    addProduct(idProduct, quantity) {
        this.products.push({ idProduct, quantity })
    }
}
 
export class CartManager {
    constructor() {
        this._PATH = `${config.DIRNAME}/data/carrito.json`;
        this.carts = [];
    }

    async startData() {
        try {
            this.carts = JSON.parse(await this.readFile());
        }
        catch (error) {
            await this.writeFile();
        }

    }

    /**Crear nuevo carrito vacio */
    async addCart() {
        await this.startData();
        const id = await this.proximoId();
        const cart = new Cart(id);
        this.carts.push(cart)
        await this.writeFile();
        console.log("Nuevo carrito creado")
        return cart;
    }

    async addProductCart(id, idProduct, quantity=1) {
        await this.startData();
        const data = this.carts.map(cart => {
            if (cart.id === id) {
                const product = cart.products.find(p => p.idProduct === idProduct);
                (product) ?
                    (product.quantity += quantity,console.log("Cantidad Modificada Pr ID:"+idProduct+" del carrito con ID:"+id))
                    : (cart.products.push({ idProduct, quantity }),console.log("Se agrego producto al carrito con ID:" +id))
            
                }
            return cart;
        })
        await this.writeFile(data);
        return data.find(cart=>cart.id===id)
    }

    async getProductCart(id){
        await this.startData();
        return this.carts.find(cart=>cart.id===id);
    }

    /**Devuelve el tamaño del array contenedor de carritos */
    async proximoId() {
        
        try {
            const data = JSON.parse(await this.readFile()).pop();
            return data.id+1;
        } catch (error) {
            return 0;
        }
    }

    readFile() {
        return promises.readFile(this._PATH, "utf-8");
    }

    writeFile(data = this.carts) {
        return promises.writeFile(this._PATH, JSON.stringify(data, null, '\t'));
    }

}

//const cm = new CartManager();
//await cm.addCart();
//console.log(await cm.proximoId())
//const data=await cm.getProductCart(1)
//console.log(data)
//await cm.addProductCart(7,444,2)

/** */