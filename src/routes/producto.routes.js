import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const routes = Router();
const pm = new ProductManager();

/**Devuelve todos los productos */
routes.get("/", async (req, res) => {
    const limite = req.query.limit;
    let data = await pm.getProducts();
    (limite) && (data = data.filter((product, i) => i < limite));
    res.send(data)
});

/**Devuelve un producto  */
routes.get("/:pid",async(req,res)=>{
    const id=req.params.pid;
    const data=await pm.getProductById(parseInt(id));
    res.status(200).send(data);
});

/**Crea un nuevo producto */
routes.post("/",async(req,res)=>{
    const campos=req.body;
    await pm.addProduct(campos._title,campos._description,campos._price,campos._thumbnail,campos._code,campos._stock);
    res.status(200).send(campos)
});

/**Edita un producto */
routes.put("/:pid",async (req,res)=>{
    const id=req.params.pid
    const campos=req.body;
    await pm.updateProduct(parseInt(id),campos);
})

/**Elimina un producto */
routes.delete("/:pid",async(req,res)=>{
    const id=req.params.pid;
    await pm.deleteProduct(parseInt(id));
})

export default routes;