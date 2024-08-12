import { Router } from "express";
import { renderViewTickets, renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewLogin, renderViewProductDetails, renderViewRegister } from "../controllers/views.controller.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";

const routes = Router();


routes.get("/", handlePolice(["USER", "PREMIUM", "ADMIN"]), renderViewHoma)

routes.get("/createProduct", handlePolice(["ADMIN","PREMIUM"]), renderViewCreateProduct);

routes.get("/chat", handlePolice(["USER", "PREMIUM",]), renderViewChat);

routes.get("/productDetails/:productId", handlePolice(["USER", "PREMIUM", "ADMIN"]), renderViewProductDetails);

routes.get("/carts", handlePolice(["USER", "PREMIUM"]), renderViewCarts);

routes.get("/login", handlePolice(["PUBLIC"]), renderViewLogin);

routes.get("/register", handlePolice(["PUBLIC"]), renderViewRegister);

routes.get("/ticket/:ticketId", handlePolice(["USER", "PREMIUM"]), renderViewTickets);

export default routes;