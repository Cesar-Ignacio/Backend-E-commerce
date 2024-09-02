
import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { userService } from "../services/index.js";
import { hashPassword } from "../utils/bcrypt.js";
import sendResponse from "../utils/sendResponse.js";

const handleCreateUserPassport = async (req, res, next) => {
    try {
        const { message } = req.authInfo;
        const data = await userService.createUser(req.user);
        req.session.user = data;
        const userData = {
            user: data,
            url: '/'
        }
        sendResponse(res, 201, true, message, userData)
        req.logger.info(`Se creo un nuevo usuario con email ${data.email}`)
    } catch (error) {
        req.logger.warning(`Error al crear usuario ${error.message}`);
        next(error);
    }
}

const hadlePasswordReset = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { _id } = req.user;
        const newHasPassword = await hashPassword(password);
        const updateUser = await userService.changeUserPassword(_id, newHasPassword);
        req.logger.info(`${updateUser.email} cambio su contraseña exitosamente`)
        sendResponse(res, 200, true, "Nueva contraseña creada", { url: "/login" });
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

const handleDocumentUpload = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const documents = req.files.map(({ originalname, path }) => {
            return {
                name: originalname,
                reference: path
            }
        })
        const updatedUser= await userService.addDocumentToUserDocumentsField(userId,documents)
        req.logger.info(`El usuario con el correo x ha cargado documentos para solicitar la actualización a Premium.`);
        sendResponse(res, 200, "Hola quieres subir un archivo", updatedUser)
    } catch (error) {
        next(error);
    }
}

export default { handleCreateUserPassport, handleUserRoleChange, hadlePasswordReset, handleDocumentUpload }
