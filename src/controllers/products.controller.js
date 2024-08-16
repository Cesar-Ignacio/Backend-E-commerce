
import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { productService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";


const handleCreateProduct = async (req, res, next) => {

    try {
        const socketServer = req.app.get("socketServer");
        const thumbnail = req.file?.originalname ?? "default.png";
        const { role, email } = req.session.user;
        const owner = role === "ADMIN" ? "ADMIN" : email;
        const productData = {
            ...req.body,
            owner,
            thumbnail
        }
        const data = await productService.createProduct(productData);
        req.logger.info(`Nuevo producto creado por ${email} role:${role}`)
        sendResponse(res, 201, true, "Producto creado exitosamente.", data);
        socketServer.emit("getProducts", await productService.getPaginatedProducts(3, 1, '{}', 1));/**mejorar*/
    } catch (error) {
        req.logger.info(`${error.message}`);
        error.method = "handleCreateProduct";
        error.action = "Creating Product";
        next(new CustomError(errorsDictionary.RECORD_CREATION_ERROR, error));
    }

}

const handleDeleteProductRequest = async (req, res, next) => {
    try {
        const socketServer = req.app.get("socketServer")
        const { productId } = req.params;
        const { email, role } = req.session.user;
        const product = await productService.getProductById(productId);
        if (role != "ADMIN" && product.owner != email) {
            req.logger.warning(`${email} intenta eliminar el producto ${productId}`);
            throw new CustomError(errorsDictionary.AUTHORIZATION_ERROR, { message: "No cuentas con lo permisos necesario para eliminar este producto" })
        }
        await productService.deleteProduct(productId);
        req.logger.info(`Usuario ${email} ${role} elimino el producto ${productId} `)
        sendResponse(res, 200, true, "Producto eliminado");
        socketServer.emit("getProducts", await productService.getPaginatedProducts(3, 1, '{}', 1));/**mejorar*/
    } catch (error) {
        next(error);
    }
}

const handleEditProductRequest = async (req, res) => {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const data = await productService.updateProduct(productId, productData);
        sendResponse(res, 200, true, "Producto actulizado", data)
    } catch ({ message }) {
        console.error('Error al crear producto', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

const handleGetProductByIdRequest = async (req, res) => {
    try {
        const { productId } = req.params;
        const data = await productService.getProductById(productId);
        sendResponse(res, 200, true, 'Producto recuperado', data);
    } catch ({ message }) {
        console.error('Error al recuperar producto', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

const handleGetProductsRequest = async (req, res, next) => {
    try {
        const { limit, page, query, sort } = req.validatedQuery;
        let data = await productService.getPaginatedProducts(limit, page, query, sort);
        sendResponse(res, 200, true, 'Datos recuperados', data);
    } catch (error) {
        next(error);
    }
}

export default { handleCreateProduct, handleDeleteProductRequest, handleEditProductRequest, handleGetProductByIdRequest, handleGetProductsRequest }