import { ProductManager } from "../class/ProductManager.js";

const pm = new ProductManager();

export const handleCreateProduct = async (req, res) => {

    try {
        const socketServer = req.app.get("socketServer");
        const campos = req.body;
        const thumbnail = req.file?.originalname || "default.png";
        await pm.addProduct(campos.title, campos.description, campos.price, thumbnail, campos.code, campos.stock, campos.category);
        res.status(201).send({ ...campos, 'thumbnail': thumbnail })
        socketServer.emit("getProducts", await pm.getProducts());

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }

}

export const handleDeleteProductRequest = async (req, res) => {
    try {
        const socketServer = req.app.get("socketServer")
        const productId = req.params.pid;
        const productData = await pm.deleteProduct(parseInt(productId));
        if (productData) {
            res.status(200).send(productData);
            socketServer.emit("getProducts", await pm.getProducts())
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