import { Router } from "express";
import emailsController from "../controllers/emails.controller.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { emailSchema } from "../schema/email.schema.js";
const routes = Router();



routes.post("/sendResetLink", validateRequest(emailSchema), emailsController.handleSendResetLink);


export default routes