import { modelProduct } from "./models/products.model.js";

export class ProductsModelManager {
    constructor() { }

    async getAll() {
        try {
            return await modelProduct.find().lean();
        } catch (error) {
            return error;
        }
    }

    async createProduct(datos) {
        try {
            const product = new modelProduct(datos);
            await product.save();
            console.log("Producto creado");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(idProduct) {
        try {
            await modelProduct.findByIdAndDelete(idProduct);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}