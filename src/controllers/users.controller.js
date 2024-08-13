
import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { userService } from "../services/index.js";
import { hashPassword } from "../utils/bcrypt.js";
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

const hadlePasswordReset = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { _id } = req.user;
        const newHasPassword = await hashPassword(password);
        const updateUser = await userService.changeUserPassword(_id, newHasPassword);
        req.logger.info(`${updateUser.email} cambio su contraseña exitosamente`)
        sendResponse(res, 200, true, "Nueva contraseña creada", { url:"/login" });
    } catch (error) {
        next(error);
    }
}

const handleUserRoleChange = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundUser = await userService.findOneById(userId);
        if (!foundUser) {
            req.logger.warning(`ID de usuario no encontrado: ${userId}`);
            throw new CustomError(errorsDictionary.ID_NOT_FOUND, { message: "No se encontro el ID del usuario" });
        }
        const userWithNewRole = await userService.UserRoleChange(foundUser)
        sendResponse(res, 200, true, "Cambio de rol exitoso", { userWithNewRole })
        req.logger.info(`Usuario ${foundUser.email} cambio de rol ${foundUser.role}->${userWithNewRole.role} `)
    }
    catch (error) {
        next(error);
    }
}

export default { handleCreateUserPassport, handleUserRoleChange, hadlePasswordReset }
