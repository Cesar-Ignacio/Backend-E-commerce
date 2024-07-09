import { Router } from "express";
import { uploader } from "../uploader.js";
import { handleCreateProduct, handleDeleteProductRequest, handleEditProductRequest, handleGetProductByIdRequest, handleGetProductsRequest } from "../controllers/products.controller.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";

const routes = Router();

/**Devuelve todos los productos */
routes.get("/",handleGetProductsRequest );

/**Devuelve un producto  */
routes.get("/:pid",handleGetProductByIdRequest);

/**Crea un nuevo producto */
routes.post("/", uploader.single("thumbnail"),handleCreateProduct );

/**Edita un producto */
routes.put("/:pid",handleEditProductRequest)

/**Elimina un producto */
routes.delete("/:pid",handlePolice(["ADMIN"]),handleDeleteProductRequest)

export default routes;