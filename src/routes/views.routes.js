import { Router } from "express";
import { renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewLogin, renderViewProductDetails, renderViewRegister } from "../controllers/views.controller.js";

const routes = Router();

routes.get("/", renderViewHoma)

routes.get("/createProduct",renderViewCreateProduct);

routes.get("/chat",renderViewChat);

routes.get("/productDetails/:id",renderViewProductDetails);

routes.get("/carts/:cid",renderViewCarts);

routes.get("/login",renderViewLogin);

routes.get("/register",renderViewRegister);

export default routes;