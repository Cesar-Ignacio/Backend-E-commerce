import { Router } from "express";
import { renderViewTickets, renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewLogin, renderViewProductDetails, renderViewRegister } from "../controllers/views.controller.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";

const routes = Router();


routes.get("/", handlePolice(["USER", "PRIMIUM", "ADMIN"]), renderViewHoma)

routes.get("/createProduct", handlePolice(["ADMIN"]), renderViewCreateProduct);

routes.get("/chat", handlePolice(["USER", "PRIMIUM",]), renderViewChat);

routes.get("/productDetails/:productId", handlePolice(["USER", "PRIMIUM", "ADMIN"]), renderViewProductDetails);

routes.get("/carts", handlePolice(["USER", "PRIMIUM"]), renderViewCarts);

routes.get("/login", handlePolice(["PUBLIC"]), renderViewLogin);

routes.get("/register", handlePolice(["PUBLIC"]), renderViewRegister);

routes.get("/ticket/:ticketId", handlePolice(["USER", "PRIMIUM"]), renderViewTickets);

export default routes;