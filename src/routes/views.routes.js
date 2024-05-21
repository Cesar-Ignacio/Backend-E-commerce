import { Router } from "express";
import { renderViewCreateProduct, renderViewHoma,renderViewRealTimeProducts } from "../controllers/views.controller.js";

const routes = Router();

routes.get("/", renderViewHoma)

routes.get("/realTimeProducts", renderViewRealTimeProducts)

routes.get("/createProduct",renderViewCreateProduct);

export default routes;