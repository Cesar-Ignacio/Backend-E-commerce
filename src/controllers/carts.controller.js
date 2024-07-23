import { cartService, productService, ticketService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";
import { v4 as uuidv4 } from "uuid";

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

const handleCompletePurchase = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            return sendResponse(res, 404, false, 'Carrito no encontrado');
        }
        const ticket = {
            code: uuidv4(),
            amount: 0,
            purchaser: req.session.user.email
        };
        const zeroStockProductIds = [];
        const { products } = cart;
        for (const product of products) {
            if (product.quantity <= product._id.stock) {
                ticket.amount += product.quantity * product._id.price;
                await cartService.deleteProductFromCartById(cartId, product._id._id);
                const productData = { stock: product._id.stock - product.quantity };
                await productService.updateProduct(product._id._id, productData);
            }
            else { zeroStockProductIds.push(product._id._id) }

        }

        if (!ticket.amount) // Evaluará si ticket.amount es distinto de 0
        {
            return sendResponse(res, 409, false, "No se pudo completar la compra debido a productos sin stock", zeroStockProductIds);
        }
        const data = await ticketService.createTicket(ticket);
        sendResponse(res, 201, true, "Compra completada con éxito", data);

    } catch ({ message }) {
        console.log('Error al completar la compra', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error al completar la compra', errorData);
    }
};

export default { handleCompletePurchase, handleGetCartById, handleCreateCart, handleAddProductCartById, handleDeleteProductCartById, handleUpdateProductQuantity, handleDeleteAllProductsCart }

