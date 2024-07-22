import { Router } from "express";
import messageController from "../controllers/messages.controller.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { messageSchema } from "../schema/message.schema.js";

const routes = Router();
// devuelve todos los mensajes
routes.get('/', messageController.handleGetMessages);
// crea un nuevo mensaje
routes.post('/', validateRequest(messageSchema),messageController.handleCreateMessage)

export default routes;