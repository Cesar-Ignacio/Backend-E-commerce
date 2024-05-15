import fs, { promises } from 'fs';
import { config } from '../config.js';
class Product {
    constructor(id, title, description, price, thumbnail, code, stock, categoria) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = categoria;
        this._id = id;
    }

}

export class ProductManager {
    constructor() {
        this._PATH = `${config.DIRNAME}/data/productos.json`;
        this._products = [];
    }

    async inicializarValores() {
        try {
            const data = await this.readFile();
            this._products = await JSON.parse(data);
        } catch (error) {
            await this.writeFile();
        }
    }

    readFile() {
        return fs.promises.readFile(this._PATH, "utf-8")
    }

    writeFile() {
        return promises.writeFile(this._PATH, JSON.stringify(this._products, null, '\t'));
    }

    async addProduct(...campos) {
        await this.inicializarValores();
        const id = await this.proximoId()
        const code = campos[4];
        const existeCode = this._products.some(product => product.code === code);
        (campos.length > 6) ? (
            (existeCode) ? (console.log(`El code "${code}" ya existe`))
                : (this._products.push(new Product(id, ...campos)),
                    await this.writeFile(), console.log("Se agrego el producto"))
        ) :
            (console.log("Se espera 7 parametros"))
    }

    async getProducts() {
        try {
            const data = await this.readFile();
            return JSON.parse(data)
        }
        catch (error) {
            return [];
        }
    }

    async getProductById(idProducto) {
        try {
            const data = JSON.parse(await this.readFile())

            const product = data.find(product => product._id === idProducto);

            return product || new Error("Error id no encontrado");

        } catch (error) {

            console.log("No se pudo leer el archivo");
        }

    }

    async updateProduct(idProducto, campos) {

        await this.inicializarValores()
        let producctoEditado;

        if (this.existeProducto(idProducto)) {
            this._products = this._products.map(producto => {
                (producto._id === idProducto) && (
                    producto = { ...producto, ...campos },
                    producctoEditado=producto
                )
                return producto;
            }) 
            await this.writeFile();
            console.log("Se actualizo el producto con ID ", idProducto)
        }
        
        return {
         "accion":"actualizacion",
         "producto":producctoEditado
        }
    }

    async deleteProduct(idProducto) {
        await this.inicializarValores();

        try {
            if (!this.existeProducto(idProducto)) {
                throw new Error("No existe el ID " + idProducto)
            }

            const productoEliminado = this._products.find(product => product._id === idProducto);
            this._products = this._products.filter(product => product._id != idProducto);
            await this.writeFile();
            console.log("Se elimino el producto con ID :" + idProducto)
            return {
                'accion': "eliminacion",
                'producto': productoEliminado
            };
        } catch (error) {
            console.log(error)
        }

    }

    existeProducto(idProducto) {
        return this._products.some(product => product._id === idProducto)
    }

    async proximoId() {
        try {
            const data = JSON.parse(await this.readFile()).pop();
            return data._id + 1;
        } catch (error) {
            return 0;
        }
    }

}

//const pm = new ProductManager();
//console.log(await pm.proximoId())
//await pm.addProduct("Gato", "El mejor gato", 50, "img", 402, 50,"animal")
//console.log(await pm.getProductById(0))
//await pm.updateProduct(1, { 'title': "Caballo" });
//await pm.deleteProduct(0);

