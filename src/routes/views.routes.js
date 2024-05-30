import { Router } from "express";
import { renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewProductDetails } from "../controllers/views.controller.js";

const routes = Router();

routes.get("/", renderViewHoma)

routes.get("/createProduct",renderViewCreateProduct);

routes.get("/chat",renderViewChat);

routes.get("/productDetails/:id",renderViewProductDetails)

routes.get("/carts/:cid",renderViewCarts)

export default routes;