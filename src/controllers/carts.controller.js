import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { cartService, productService, ticketService, userService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";
import { v4 as uuidv4 } from "uuid";

const handleGetCartById = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const data = await cartService.getCartById(cartId);
        if (!data) {
            req.logger.warning(`No se encontro el carrito con ID ${cartId}`);
            throw new CustomError(errorsDictionary.CART_NOT_FOUND, { message: `No se encontro el carrito con ID ${cartId}` });
        }
        sendResponse(res, 200, true, "Carrito recuperado", data)
    } catch (error) {
        req.logger.warning(`Error al obtener carrito ${error.message}`);
        next(error);
    }
}

const handleCreateCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundUser = await userService.findOneById(userd);
        if (!foundUser) {
            req.logger.warning(`El ID de usuario ${userId} no corresponde a ningún usuario existente.`);
            throw new CustomError(errorsDictionary.USER_NOT_FOUND, { message: `El ID de usuario ${userId} no corresponde a ningún usuario registrado.` });
        }
        const foundCart = await cartService.getCartByUserId(userId);
        if (foundCart) {
            req.logger.warning(`El usuario con ID ${userId} ya tiene un carrito asociado.`);
            return sendResponse(res, 200, true, "El carrito ya existe.");
        }
        const newCart = await cartService.createCart(userId);
        sendResponse(res, 201, true, "Carrito creado exitosamente.", newCart);
    } catch (error) {
        req.logger.warning(`Error al crear el carrito ${error.message}`);
        next(error);
    }
}

const handleAddProductCartById = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const { email } = req.session.user;
        const product = await productService.getProductById(productId);
        let message;
        const cartExists = await cartService.getCartById(cartId);
        const productExists = await productService.getProductById(productId);
        if (!cartExists) {
            message = `No se encontro el carrito con ID ${cartId}`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.CART_NOT_FOUND, { message });
        }
        if (!productExists) {
            message = `El producto con ID ${productId} no se encontro`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.PRODUCT_NOT_FOUND, { message })
        }
        if (product?.owner === email) {
            message = `El usuario con correo ${email} intentó agregar su propio producto con ID ${productId} al carrito.`
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.CANNOT_ADD_OWN_PRODUCT, { message });
        }
        const isProductInCart = await cartService.checkProductExistsInCart(cartId, productId);
        if (isProductInCart) {
            message = `El producto con ID ${productId} ya existe en el carrito `
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.RESOURCE_ALREADY_EXISTS, { message })
        }
        const data = await cartService.addProductCart(cartId, productId);
        sendResponse(res, 201, true, "Producto agregado a carrito", data)
    } catch (error) {
        next(error);
    }
}

const handleDeleteProductCartById = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        let message;
        const cartExists = await cartService.getCartById(cartId);
        const productExistsCart = await cartService.checkProductExistsInCart(cartId, productId);
        if (!cartExists) {
            message = `No se encontro el carrito con ID ${cartId}`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.CART_NOT_FOUND, { message });
        }
        if (!productExistsCart) {
            message = `El producto con ID ${productId} no existe en el carrito`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.PRODUCT_NOT_FOUND, { message })
        }
        const data = await cartService.deleteProductFromCartById(cartId, productId);
        sendResponse(res, 200, true, "Producto eliminado de carrito", data)
        req.logger.info(`El usuario ${req.user.email} elimino el producto con ID ${productId} de su carrito`);
    } catch (error) {
        next(error)
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

const handleDeleteAllProductsCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const data = await cartService.deleteAllProductsCart(carId);
        if (!data) {
            req.logger.warning(`No se encontro el carrito con ID ${cartId}`);
            throw new CustomError(errorsDictionary.CART_NOT_FOUND, { message: `No se encontro el carrito con ID ${cartId}` });
        }
        sendResponse(res, 200, true, "Carrito vaciado", data)
    } catch (error) {
        req.logger.warning(`Error al vacia carrito ${error.message}`);
        next(error);
    }
}

const handleCompletePurchase = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            const message = `No se encontro el cart con ID ${cartId}`
            req.logger.warning(message)
            throw new CustomError(errorsDictionary.CART_NOT_FOUND, { message })
        }
        if (!cart.products.length) {
            const message = `El carrito con ID ${cartId} se encuentra sin productos`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.EMPTY_CART, { message })
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

    } catch (error) {
        req.logger.warning(`Error al completar la compra ${error.message}`);
        next(error);

    }
};

export default { handleCompletePurchase, handleGetCartById, handleCreateCart, handleAddProductCartById, handleDeleteProductCartById, handleUpdateProductQuantity, handleDeleteAllProductsCart }

