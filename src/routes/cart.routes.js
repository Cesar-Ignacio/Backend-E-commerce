import { Router } from "express";
import cartController from "../controllers/carts.controller.js";
import validateObjectIds from "../middleware/validateId.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { cartSchema } from "../schema/cart.schema.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";

const routes = Router();


/**Devuelve un carrito  */

routes.get("/:cartId", validateObjectIds, cartController.handleGetCartById)

/**Crea un nuevo carrito vacio */
routes.post("/:userId", handlePolice(["USER", "PREMIUM"]), validateObjectIds, cartController.handleCreateCart)

/**Finalizar comprar */
routes.post("/:cartId/purchase", handlePolice(["USER", "PREMIUM"]), validateObjectIds, cartController.handleCompletePurchase)

/**Agregamos un producto en un carrito */
routes.post("/:cartId/product/:productId", handlePolice(["USER", "PREMIUM"]), validateObjectIds, cartController.handleAddProductCartById)

/**Eliminar producto de carrito */
routes.delete("/:cartId/product/:productId", handlePolice(["USER", "PREMIUM"]), validateObjectIds, cartController.handleDeleteProductCartById)

/**Actualizar cantidad de producto de un carrito */
routes.put("/:cartId/product/:productId", handlePolice(["USER", "PREMIUM"]), validateObjectIds, validateRequest(cartSchema), cartController.handleUpdateProductQuantity);

/**Eliminar todos los productos de un carrito */
routes.delete("/:cartId", handlePolice(["USER", "PREMIUM"]), validateObjectIds, cartController.handleDeleteAllProductsCart);


export default routes;