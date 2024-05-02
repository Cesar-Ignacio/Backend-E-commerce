import { Router } from "express";
import { uploader } from "../uploader.js";
import { ProductManager } from "../class/ProductManager.js";

const routes = Router();
const pm = new ProductManager;

/**Devuelve todos los productos */
routes.get("/", async (req, res) => {
    const limite = req.query.limit;
    let data = await pm.getProducts();
    (limite) && (data = data.filter((product, i) => i < limite));
    res.send(data)
});

/**Devuelve un producto  */
routes.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const data = await pm.getProductById(parseInt(id));
    res.status(200).send(data);
});

/**Crea un nuevo producto */
routes.post("/", uploader.single("thumbnail"), async (req, res) => {
    
    const socketServer = req.app.get("socketServer");
    const campos = req.body;
    const thumbnail = req.file?.originalname || "default.png";
    await pm.addProduct(campos._title, campos._description, campos._price, thumbnail, campos._code, campos._stock, campos._category);
    res.status(200).send({ ...campos, 'thumbnail': thumbnail })
    socketServer.emit("getProducts", await pm.getProducts());
});

/**Edita un producto */
routes.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const campos = req.body;
    await pm.updateProduct(parseInt(id), campos);
    res.status(200);
})

/**Elimina un producto */
routes.delete("/:pid", async (req, res) => {
    const socketServer=req.app.get("socketServer")
    const id = req.params.pid;
    await pm.deleteProduct(parseInt(id));
    socketServer.emit("getProducts",await pm.getProducts())
})

export default routes;