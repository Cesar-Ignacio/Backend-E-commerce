import { Router } from "express";
import { CartManager } from "../cartManager.js";

const routes=Router();

const cm = new CartManager();

/**Devuelve un carrito  */
routes.get("/:cid", async (req, res) => {
    const data = await cm.getProductCart(parseInt(req.params.cid));
    res.send(data);
})

/**Crea un nuevo carrito vacio */
routes.post("/", async (req, res) => {
    await cm.addCart();
})

/**Agregamos un producto en un carrito */
routes.post("/:cid/product/:pid", async (req, res) => {
    await cm.addProductCart(parseInt(req.params.cid), parseInt(req.params.pid))
})

export default routes;