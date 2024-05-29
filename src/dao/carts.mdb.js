import { modelCart } from "./models/carts.model.js";

export class CartModelManager {
    constructor() {

    }

    async getCartById(idCart) {
        try {
            const cart = await modelCart.findById(idCart);
            if (!cart) {
                throw new Error("No se encontro el carrito");
            }
            return cart
        } catch (error) {
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

    async addProductCart(idCart, idProduct) {
        try {

            const updatedCart = await modelCart.findByIdAndUpdate(idCart, { $push: { products: { _id: idProduct } } }, { new: true, useFindAndModify: false })

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
            return cart;
        } catch (error) {
            throw error;
        }
    }

}