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
        await pmm.createProduct(datos);        
        res.status(201).send(datos)
        socketServer.emit("getProducts", await pmm.getAll());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.log({ message: 'Internal Server Error' })
    }

}

export const handleDeleteProductRequest = async (req, res) => {
    try {
        const socketServer = req.app.get("socketServer")
        const productId = req.params.pid;
        //const productData = await pm.deleteProduct(parseInt(productId));
        const da = await pmm.deleteProduct(productId);
        if (da) {
            res.status(200).send("bien");;
            socketServer.emit("getProducts", await pmm.getAll())
        }
        else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const handleEditProductRequest = async (req, res) => {
    try {
        const productId = req.params.pid
        const campos = req.body;
        const productData = await pm.updateProduct(parseInt(productId), campos);

        if (productData) {
            res.status(200).send(productData);
        }
        else {
            res.status(404).send({ message: 'Product not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const handleGetProductByIdRequest = async (req, res) => {
    try {
        const productId = req.params.pid;
        const productData = await pm.getProductById(parseInt(productId));
        if (productData) {
            res.status(200).send(productData);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const handleGetProductsRequest = async (req, res) => {
    try {
        const limite = req.query.limit;
        let data = await pm.getProducts();
        (limite) && (data = data.slice(0, limite));
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}