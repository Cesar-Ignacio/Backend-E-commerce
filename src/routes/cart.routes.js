import { Router } from "express";
import { CartManager } from "../dao/cartManager.js";
import { handleAddProductCartById, handleCreateCart, handleDeleteProductCartById, handleGetCartById } from "../controllers/carts.controller.js";

const routes = Router();

const cm = new CartManager;

/**Devuelve un carrito  */
routes.get("/:cid", handleGetCartById)

/**Crea un nuevo carrito vacio */
routes.post("/:uid", handleCreateCart)

/**Agregamos un producto en un carrito */
routes.post("/:cid/product/:pid", handleAddProductCartById)

/**Eliminar producto de carrito */
routes.delete("/:cid/product/:pid",handleDeleteProductCartById)

export default routes;