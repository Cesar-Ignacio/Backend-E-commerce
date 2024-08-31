import { Router } from "express";

import productController from "../controllers/products.controller.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";
import { validatePagination } from "../middleware/validatePagination.middleware.js";
import { paginationSchema } from "../schema/pagination.schema.js";
import validateObjectIds from "../middleware/validateId.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { productSchema } from "../schema/product.schema.js";
import { validateImageUpload } from "../middleware/validateImageUpload.middleware.js";
import uploader from "../utils/uploader.js";

const routes = Router();


/**Devuelve todos los productos */
routes.get("/", validatePagination(paginationSchema), productController.handleGetProductsRequest);

/**Devuelve un producto  */
routes.get("/:productId",handlePolice(["ADMIN","PREMIUM","USER"]), validateObjectIds, productController.handleGetProductByIdRequest);

/**Crea un nuevo producto */
routes.post("/", handlePolice(["ADMIN", "PREMIUM"]), validateImageUpload(uploader.product,'single','thumbnail'), validateRequest(productSchema), productController.handleCreateProduct);

/**Edita un producto */
routes.put("/:productId", handlePolice(["ADMIN", "PREMIUM"]), validateObjectIds, validateRequest(productSchema), productController.handleEditProductRequest)

/**Elimina un producto */
routes.delete("/:productId", handlePolice(["ADMIN", "PREMIUM"]), validateObjectIds, productController.handleDeleteProductRequest)


export default routes;