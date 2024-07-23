import { modelProduct } from "../../models/products.model.js";

export class ProductsDao {
    constructor() { }

    async create(datos) {
        try {
            const product = await modelProduct.create(datos);
            return product;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }

    async update(productId, productData) {
        try {
            const updatedProduct = await modelProduct.findByIdAndUpdate(productId, productData, { new: true, runValidators: true });

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

    async delete(idProduct) {
        try {
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

    async getPaginated(limit, page, query, sort) {
        try {
            const filter = JSON.parse(query);
            const products = await modelProduct.paginate(filter, { page: page, limit: limit, sort: { price: sort } });
            return products;

        } catch (error) {
            console.error("Error al obtener los productos:", error);
            throw error;
        }
    }

    async getById(productId) {
        try {
            const product = await modelProduct.findById(productId);
            if (!product) {
                throw new Error(`El producto con ID ${productId} no fue encontrado`);
            }
            return product;
        } catch (error) {
            console.error("Product not found:", error)
            throw error;
        }
    }


}