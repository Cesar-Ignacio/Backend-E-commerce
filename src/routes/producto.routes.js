import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const routes = Router();
const pm = new ProductManager();

routes.get("/", async (req, res) => {
    const limite = req.query.limit;
    let data = await pm.getProducts();
    (limite) && (data = data.filter((product, i) => i < limite));
    res.send(data)
})

routes.get("/:pid",async(req,res)=>{
    const id=req.params.pid;
    const data=await pm.getProductById(parseInt(id));
    res.status(200).send(data);
})

routes.post("/",async(req,res)=>{
    const campos=req.body;
    // console.log()
    await pm.addProduct(campos._title,campos._description,campos._price,campos._thumbnail,campos._code,campos._stock)
    res.status(200).send(campos)
})

export default routes;