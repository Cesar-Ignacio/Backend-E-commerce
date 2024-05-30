import { modelCart } from "./models/carts.model.js";
import { modelProduct } from "./models/products.model.js";

export class CartModelManager {
    constructor() {

    }
    async getCartById(idCart) {
        try {
            const cart = await modelCart.findById(idCart).populate({ path: 'products._id', model: modelProduct }).lean();
            if (!cart) {
                throw new Error("No se encontro el carrito");
            }
            return cart
        } catch (error) {
            console.error('Error al obtener el carrito:', error.message);
            throw error
        }
    }

    async getProductCart(idCart){
        try {
            const cart=await modelCart.findById(idCart).lean();
            if (!cart) {
                throw new Error("No se encontro el carrito");
            }
            return cart
        } catch  (error) {
            console.error('Error al obtener el carrito:', error.message);
            throw error
        }
    }

    async createCart(idUser) {
        try {
            const cart = new modelCart({ '_user_id': idUser, "products": [] })
            const newCart = await cart.save();
            return newCart;

        } catch (error) {
            console.error("Error al crear el carrito:", error.message)
            throw error;
        }
    }

    async addProductCart({ cid, pid }) {
        try {

            const updatedCart = await modelCart.findByIdAndUpdate(cid, { $push: { products: { _id: pid } } }, { new: true, useFindAndModify: false })

            if (!updatedCart) {
                throw new Error('Carrito no encontrado');
            }

            return updatedCart;

        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error
        }
    }

    async deleteProductCart({ cid, pid }) {
        try {
            const cart = await modelCart.findOneAndUpdate({ _id: cid }, { $pull: { products: { _id: pid } } }, { new: true })
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity({ cid, pid }, { quantity }) {
        try {
            const cart = await modelCart.findOneAndUpdate({ _id: cid, "products._id": pid }, { $set: { "products.$.quantity": quantity } }, { new: true });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProductsCart({ cid }) {
        try {
            const cart = await modelCart.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
            return cart
        } catch (error) {
            throw error
        }
    }
}