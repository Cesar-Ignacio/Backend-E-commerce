import { messageService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

 const handleGetMessages = async (req, res) => {
    try {
        const data = await messageService.get();
        const responseData = {
            items: data,
        };
        sendResponse(res, 200, true, 'Recuperacion exitosa', responseData)
    } catch ({ message }) {
        console.error("Error al recuperar mensajes", message)
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

const handleCreateMessage = async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const { email, message } = req.body;
        const data = await messageService.createMessage(email, message);
        const allMessages = await messageService.get();
        socketServer.emit('messages', allMessages);
        sendResponse(res, 201, true, "Mensaje creado sin problemas", data)
    } catch ({ message }) {
        console.error('Error al crear mensaje', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

export default {handleGetMessages,handleCreateMessage};