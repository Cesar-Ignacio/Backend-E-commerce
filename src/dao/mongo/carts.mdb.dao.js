import { modelCart } from "../../models/carts.model.js";
import { modelProduct } from "../../models/products.model.js";

export class CartDao {
    constructor() {

    }
    async getById(idCart) {
        try {
            const cart = await modelCart.findById(idCart).populate({ path: 'products._id', model: modelProduct }).lean();
            return cart
        } catch (error) {
            console.error('Error al obtener el carrito:', error.message);
            throw error
        }
    }

    async getByUserId(idUser)
    {
        try {
            const cart= await modelCart.findOne({ _user_id: idUser }).lean();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async create(idUser) {
        try {
            const cart = new modelCart({ '_user_id': idUser, "products": [] })
            const newCart = await cart.save();
            return newCart;

        } catch (error) {
            console.error("Error al crear el carrito:", error.message)
            throw error;
        }
    }

    async add(cartId, productId) {
        try {

            const updatedCart = await modelCart.findByIdAndUpdate(cartId, { $push: { products: { _id: productId } } }, { new: true, useFindAndModify: false })

            if (!updatedCart) {
                throw new Error('Carrito no encontrado');
            }

            return updatedCart;

        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error
        }
    }

    async deleteCart(cartId){
        try {
            return await modelCart.findByIdAndDelete(cartId);
        } catch (error) {
            throw error
        }
    }

    async delete(cartId, productId) {
        try {
            const cart = await modelCart.findOneAndUpdate({ _id: cartId }, { $pull: { products: { _id: productId } } }, { new: true })
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async update(cartId, productId, quantity) {
        try {
            const cart = await modelCart.findOneAndUpdate({ _id: cartId, "products._id": productId }, { $set: { "products.$.quantity": quantity } }, { new: true });
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll(cartId) {
        try {
            const cart = await modelCart.findByIdAndUpdate(cartId, { $set: { products: [] } }, { new: true });
            return cart
        } catch (error) {
            throw error
        }
    }

    async getByCartIdAndProductId(cartId,productId)
    {
        try {
            const cart = await modelCart.findOne({ _id: cartId, "products._id": productId }).lean();
            return cart;
        } catch (error) {
            throw error
        }
    }

}