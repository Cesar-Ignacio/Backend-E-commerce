import mongoose from "mongoose";
import { CartManager } from "../dao/memory/cartManager.js";
import { CartModelManager } from "../dao/mongo/carts.mdb.js";
import { cartServicie } from "../services/index.service.js";


const cm = new CartManager();
const cmm = new CartModelManager();

export const handleGetCartById = async (req, res) => {
    try {
        const idCart = req.params.cid;

        if (!mongoose.Types.ObjectId.isValid(idCart)) {
            throw new Error('ID inválido');
        }
        //fileSystem const data = await cm.getProductCart(parseInt(idCart));
        //const data = await cmm.getCartById(idCart);
       const data = await cartServicie.getByIdI(idCart);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleCreateCart = async (req, res) => {
    try {
        
        const idUser = req.params.uid;
        //const data= await cm.addCart();
        // validamos el id user
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
        // fileSystem  const data=await cm.addProductCart(parseInt(req.params.cid), parseInt(req.params.pid))
        validateObjectIds(req.params)
        const updatedCart = await cmm.addProductCart(req.params)
        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export const handleDeleteProductCartById = async (req, res) => {
    try {
        validateObjectIds(req.params)
        const data = await cmm.deleteProductCart(req.params);
        res.status(200).send(data);
    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}

export const handleUpdateProductQuantity = async (req, res) => {
    try {
        const data = await cmm.updateProductQuantity(req.params, req.body)
        res.status(200).send(data);
    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}

export const handleDeleteAllProductsCart = async (req, res) => {
    try {
        const data = await cmm.deleteAllProductsCart(req.params)
        res.status(200).send(data);
    } catch ({ message }) {
        res.status(500).send({ message: message });
    }
}

const validateObjectIds = ({ cid, pid }) => {
    const ids = [cid, pid];
    ids.forEach(id => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`ID inválido: ${id}`);
        }
    });
};


