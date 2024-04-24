
import fs, { promises } from "fs"

class Cart {
    constructor(id) {
        this._idCart = id;
        this._products = [];
    }
    addProduct(idProduct, quantity) {
        this._products.push({ idProduct, quantity })
    }
}
 
export class CartManager {
    constructor() {
        this._PATH = "carrito.json";
        this._carts = [];
    }

    async startData() {
        try {
            this._carts = JSON.parse(await this.readFile());
        }
        catch (error) {
            await promises.writeFile(this._PATH, JSON.stringify(this._carts));
        }

    }

    /**Crear nuevo carrito vacio */
    async addCart() {
        await this.startData();
        const id = await this.proximoId();
        const cart = new Cart(id);
        this._carts.push(cart)
        await this.writeFile();
        console.log("Nuevo carrito creado")
        return cart;
    }

    async addProductCart(idCart, idProduct, quantity=1) {
        await this.startData();
        const data = this._carts.map(cart => {
            if (cart._idCart === idCart) {
                const product = cart._products.find(p => p.idProduct === idProduct);
                (product) ?
                    (product.quantity += quantity,console.log("Cantidad Modificada Pr ID:"+idProduct+" del carrito con ID:"+idCart))
                    : (cart._products.push({ idProduct, quantity }),console.log("Se agrego producto al carrito con ID:" +idCart))
            
                }
            return cart;
        })
        await this.writeFile(data);
        return data.find(cart=>cart._idCart===idCart)
    }

    async getProductCart(idCart){
        await this.startData();
        return this._carts.find(cart=>cart._idCart===idCart);
    }

    /**Devuelve el tamaño del array contenedor de carritos */
    async proximoId() {
        
        try {
            const data = JSON.parse(await this.readFile()).pop();
            return data._idCart+1;
        } catch (error) {
            return 0;
        }
    }

    readFile() {
        return promises.readFile(this._PATH, "utf-8");
    }

    writeFile(data = this._carts) {
        return promises.writeFile(this._PATH, JSON.stringify(data, null, '\t'));
    }

}

//const cm = new CartManager();
//await cm.addCart();
//console.log(await cm.proximoId())
//const data=await cm.getProductCart(1)
//console.log(data)
//await cm.addProductCart(7,444,2)

