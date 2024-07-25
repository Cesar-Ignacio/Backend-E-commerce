import { Router } from "express";
import sendResponse from "../utils/sendResponse.js";
import generateMockProducts from "../mock/mocking.mock.js";

const routes = Router();

routes.get('/', (req, res) => {
    try {
        const data = generateMockProducts();
        sendResponse(res, 200, true, "X", { docs: data });
    } catch (error) {
        console.error('Error al obtener productos mock', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
})

export default routes;