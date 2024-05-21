import { modelProduct } from "./models/products.model.js";

export class ProductsModelManager {
    constructor() { }

    async getAll(){
        try {
            return await modelProduct.find().lean();
        } catch (error) {
            return error;
        }
    }
}