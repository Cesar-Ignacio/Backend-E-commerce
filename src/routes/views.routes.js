import { Router } from "express";
import { renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewLogin, renderViewProductDetails, renderViewRegister } from "../controllers/views.controller.js";
import { handlePolice } from "../middleware/handlePolice.js";

const routes = Router();


routes.get("/", handlePolice(["USER", "PRIMIUM", "ADMIN"]), renderViewHoma)

routes.get("/createProduct", handlePolice(["ADMIN"]),renderViewCreateProduct);

routes.get("/chat", handlePolice(["PUBLIC"]), renderViewChat);

routes.get("/productDetails/:id",handlePolice(["USER", "PRIMIUM", "ADMIN"]),renderViewProductDetails);

routes.get("/carts", handlePolice(["USER", "PRIMIUM", "ADMIN"]), renderViewCarts);

routes.get("/login",handlePolice(["PUBLIC"]), renderViewLogin);

routes.get("/register", handlePolice(["PUBLIC"]),renderViewRegister);

export default routes;