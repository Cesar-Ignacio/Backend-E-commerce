import { modelProduct } from "./models/products.model.js";

export class ProductsModelManager {
    constructor() { }

    async getAll() {
        try {
            return await modelProduct.find().lean();
        } catch (error) {
            console.error("Error al devolver los productos:", error);
            throw error;
        }
    }

    async createProduct(datos) {
        try {
            // Validar que datos sea un objeto no nulo
            if (!datos || typeof datos !== 'object') {
                throw new Error("Los datos del producto deben ser un objeto no nulo.");
            }

            // Crear una instancia del producto
            const product = new modelProduct(datos);

            // Guardar el producto en la base de datos
            await product.save();
            return product;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }
    
    async updateProduct(idProduct, campos) {
        try {
            const updatedProduct = await modelProduct.findByIdAndUpdate(idProduct, campos, { new: true, runValidators: true });

            // Verificar que si se actulizo el producto
            if (!updatedProduct) {
                throw new Error(`El producto con ID ${idProduct} no fue encontrado o no pudo ser actulizado`);
            }

            return updatedProduct;

        } catch (error) {
            console.error("Error al actualizar el producto:", error)
            throw error;
        }
    }

    async deleteProduct(idProduct) {

        try {
            // Validar que idProduct sea un string no vacío
            if (typeof idProduct !== 'string' || idProduct.trim() === '') {
                throw new Error("El parámetro 'idProduct' debe ser un string no vacío.");
            }

            // Intentar eliminar el producto
            const result = await modelProduct.findByIdAndDelete(idProduct);

            // Verificar si el producto fue eliminado
            if (!result) {
                throw new Error(`El producto con ID ${idProduct} no fue encontrado o no pudo ser eliminado.`);
            }

            return `Producto con ID ${idProduct} fue eliminado exito`;

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    }

    async getLimitedProducts(limit) {
        try {
            const products = await modelProduct.find().limit(limit);
            return products;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            throw error;
        }
    }

    async getProductById(idProduct) {
        try {
            const product = await modelProduct.findById(idProduct);
            return product;
        } catch (error) {
            console.error("Product not found:", error)
            throw error;
        }
    }


}