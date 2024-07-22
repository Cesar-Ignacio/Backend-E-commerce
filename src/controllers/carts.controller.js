import { cartService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

const handleGetCartById = async (req, res) => {
    try {
        const { cartId } = req.params;
        const data = await cartService.getCartById(cartId);
        sendResponse(res, 200, true, "Carrito recuperado", data)
    } catch ({ message }) {
        console.error('Error al obtener carrito:', message);
        sendResponse(res, 500, false, message)
    }
}

const handleCreateCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await cartService.createCart(userId);
        sendResponse(res, 201, true, "Carrito creado", data)
    } catch ({ message }) {
        console.error('Error al crear el carrito:', message);
        sendResponse(res, 500, false, message)
    }
}

const handleAddProductCartById = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const data = await cartService.addProductCart(cartId, productId);
        sendResponse(res, 201, true, "Producto agregado a carrito", data)
    } catch ({ message }) {
        console.error('Error al agregar productos en un carrito:', message);
        sendResponse(res, 500, false, message)
    }
}

const handleDeleteProductCartById = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const data = await cartService.deleteProductFromCartById(cartId, productId);
        sendResponse(res, 200, true, "Producto eliminado de carrito", data)
    } catch ({ message }) {
        console.error('Error al eliminar producto de carrito:', message);
        sendResponse(res, 500, false, message)
    }
}

const handleUpdateProductQuantity = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;
        const data = await cartService.updateProductQuantity(cartId, productId, quantity);
        sendResponse(res, 200, true, "Cantidad actulizada", data)
    } catch ({ message }) {
        console.error('Error al actualizar cantidad de producto:', message);
        sendResponse(res, 500, false, message)
    }
}

const handleDeleteAllProductsCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const data = await cartService.deleteAllProductsCart(cartId);
        sendResponse(res, 200, true, "Carrito vaciado", data)
    } catch ({ message }) {
        console.error('Error al vacia carrito:', message);
        sendResponse(res, 500, false, message);
    }
}

export default { handleGetCartById, handleCreateCart, handleAddProductCartById, handleDeleteProductCartById, handleUpdateProductQuantity, handleDeleteAllProductsCart }

