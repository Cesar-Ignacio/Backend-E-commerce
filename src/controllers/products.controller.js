import mongoose from "mongoose";
import { ProductManager } from "../dao/ProductManager.js";
import { ProductsModelManager } from "../dao/products.mdb.js";


const pm = new ProductManager();
const pmm = new ProductsModelManager();

export const handleCreateProduct = async (req, res) => {

    try {
        const socketServer = req.app.get("socketServer");
        const thumbnail = req.file?.originalname ?? "default.png";
        const datos = {
            ...req.body,
            thumbnail: thumbnail || "default.png"
        }
        if (!datos.price || !datos.category) {
            return res.status(400).send({ message: "Faltan datos obligatorios: precio y categoría." });
        }
        const product = await pmm.createProduct(datos);
        res.status(201).send({
            message: "Producto creado exitosamente.",
            product: product
        })
        socketServer.emit("getProducts", await pmm.getAll());
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

export const handleDeleteProductRequest = async (req, res) => {
    try {
        const socketServer = req.app.get("socketServer")
        const productId = req.params.pid;
        // fileSystem  const productData = await pm.deleteProduct(parseInt(productId));
        const data = await pmm.deleteProduct(productId);
        res.status(200).send(data);
        socketServer.emit("getProducts", await pmm.getAll())

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleEditProductRequest = async (req, res) => {
    try {
        const productId = req.params.pid
        const campos = req.body;
        //fileSystem const productData = await pm.updateProduct(parseInt(productId), campos);
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('ID inválido');
        }
        const updatedProduct = await pmm.updateProduct(productId, campos)
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleGetProductByIdRequest = async (req, res) => {
    try {
        const productId = req.params.pid;
        // fileSystem const productData = await pm.getProductById(parseInt(productId));
        const productDataM = await pmm.getProductById(productId)
        res.status(200).send(productDataM);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const handleGetProductsRequest = async (req, res) => {
    try {
        let data = await pmm.getPaginatedProducts(req.query);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}