import mongoose from "mongoose";
import { CartManager } from "../dao/cartManager.js";
import { CartModelManager } from "../dao/carts.mdb.js";
import { modelCart } from "../dao/models/carts.model.js";

const cm = new CartManager();
const cmm = new CartModelManager();

export const handleGetCartById = async (req, res) => {
    try {
        const idCart = req.params.cid;

        if (!mongoose.Types.ObjectId.isValid(idCart)) {
            throw new Error('ID inválido');
        }
        //fileSystem const data = await cm.getProductCart(parseInt(idCart));
        const data = await cmm.getCartById(idCart);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleCreateCart = async (req, res) => {
    try {

        const idUser = req.params.uid;
        // validamos el id user
        //const data= await cm.addCart();
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return res.status(400).send({ message: 'ID de usuario inválido' });
        }
        const newCart = await cmm.createCart(idUser);
        res.status(201).send(newCart);
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).send({ message: error.message });
    }
}

export const handleAddProductCartById = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const productId = req.params.pid;
        // fileSystem  const data=await cm.addProductCart(parseInt(req.params.cid), parseInt(req.params.pid))
        // validar que los id sean correctos
        if (!mongoose.Types.ObjectId.isValid(idCart) || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('ID de carrito o producto inválido');
        }
        const updatedCart = await cmm.addProductCart(idCart, productId)
        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}