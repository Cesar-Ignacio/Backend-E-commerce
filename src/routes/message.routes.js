import { Router } from "express";
import { handleCreateMessage, handleGetMessages } from "../controllers/messages.controller.js";

const routes = Router();
// devuelve todos los mensajes
routes.get('/', handleGetMessages);
// crea un nuevo mensaje
routes.post('/', handleCreateMessage)

export default routes;