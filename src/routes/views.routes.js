import { response, Router } from "express";
import { renderViewTickets, renderViewCarts, renderViewChat, renderViewCreateProduct, renderViewHoma, renderViewLogin, renderViewProductDetails, renderViewRegister, renderViewPasswordReset, renderViewNewPasswordEmail, renderViewPremiumDocsUpload, renderViewPremium } from "../controllers/views.controller.js";
import { handlePolice } from "../middleware/handlePolice.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const routes = Router();

routes.get("/", handlePolice(["USER", "PREMIUM", "ADMIN"]), renderViewHoma)

routes.get("/createProduct", handlePolice(["ADMIN", "PREMIUM"]), renderViewCreateProduct);

routes.get("/chat", handlePolice(["USER", "PREMIUM",]), renderViewChat);

routes.get("/productDetails/:productId", handlePolice(["USER", "PREMIUM", "ADMIN"]), renderViewProductDetails);

routes.get("/carts", handlePolice(["USER", "PREMIUM"]), renderViewCarts);

routes.get("/login", handlePolice(["PUBLIC"]), renderViewLogin);

routes.get("/register", handlePolice(["PUBLIC"]), renderViewRegister);

routes.get("/passwordReset", handlePolice(["PUBLIC"]), renderViewPasswordReset);

routes.get("/newPasswordEmailTemplate", verifyToken, renderViewNewPasswordEmail);

routes.get("/ticket/:ticketId", handlePolice(["USER", "PREMIUM"]), renderViewTickets);

routes.get("/premiumDocsUpload", handlePolice(["USER", "PREMIUM"]), renderViewPremiumDocsUpload)

routes.get("/premium", renderViewPremium);

export default routes;