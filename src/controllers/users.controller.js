
import { userService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";

const handleCreateUserPassport = async (req, res) => {
    try {
        const { message } = req.authInfo;
        const data = await userService.createUser(req.user);
        req.session.user = data;
        const userData = {
            user: data,
            url: '/'
        }
        sendResponse(res, 201, true, message, userData)
    } catch ({ message }) {
        console.error('Error al crear Usuario', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

export default { handleCreateUserPassport }
