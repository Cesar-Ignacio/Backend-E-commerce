import { Router } from "express";
import { CartManager } from "../dao/memory/cartManager.js";
import { handleAddProductCartById, handleCreateCart, handleDeleteAllProductsCart, handleDeleteProductCartById, handleGetCartById, handleUpdateProductQuantity } from "../controllers/carts.controller.js";

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

/**Actualizar cantidad de producto de un carrito */
routes.put("/:cid/products/:pid",handleUpdateProductQuantity);

/**Eliminar todos los productos de un carrito */
routes.delete("/:cid",handleDeleteAllProductsCart);
export default routes;