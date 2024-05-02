import { Router } from "express";
import { CartManager } from "../class/cartManager.js";


const routes=Router();

const cm = new CartManager;

/**Devuelve un carrito  */
routes.get("/:cid", async (req, res) => {
    const data = await cm.getProductCart(parseInt(req.params.cid));
    res.send(data);
})

/**Crea un nuevo carrito vacio */
routes.post("/", async (req, res) => {
    const nuevoCarrito= await cm.addCart();
    res.status(200).send(nuevoCarrito);
})

/**Agregamos un producto en un carrito */
routes.post("/:cid/product/:pid", async (req, res) => {
    const cart=await cm.addProductCart(parseInt(req.params.cid), parseInt(req.params.pid))
    res.status(200).send(cart);
})

export default routes;