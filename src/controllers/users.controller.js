import { DateTime, Interval } from "luxon";

import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { userService } from "../services/index.js";
import { hashPassword } from "../utils/bcrypt.js";
import sendResponse from "../utils/sendResponse.js";


const handleGetUserList = async (req, res, next) => {
    try {
        const users = await userService.getUserList();
        sendResponse(res, 200, true, "Lista de usuarios", users);
    } catch (error) {
        next(error);
    }
}

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
        if (!foundUser.hasDocuments) {
            const message = `El usuario ${req.session.user.email} no puede ser promovido a Premium sin haber proporcionado la documentación necesaria.`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.NO_DOCUMENTS_PROVIDED, { message });
        }
        const userWithNewRole = await userService.UserRoleChange(foundUser)
        req.session.user.role = userWithNewRole.role
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
        const foundUser = await userService.findOneById(userId);
        if (!foundUser) {
            req.logger.warning(`ID de usuario no encontrado: ${userId}`);
            throw new CustomError(errorsDictionary.ID_NOT_FOUND, { message: "No se encontro el ID del usuario" });
        }
        if (!req.files || req.files.length === 0) {
            req.logger.warning(`No se enviaron documentos para el usuario: ${userId}`);
            throw new CustomError(errorsDictionary.NO_DOCUMENTS_PROVIDED, { message: "No se enviaron documentos" });
        }
        const documents = req.files.map(({ originalname, path }) => {
            return {
                name: originalname,
                reference: path
            }
        })
        const updatedUser = await userService.addDocumentToUserDocumentsField(userId, documents)
        req.session.user.hasDocuments = updatedUser.hasDocuments
        sendResponse(res, 200, true, "Los documentos fueron cargados con éxito", updatedUser)
        req.logger.info(`El usuario con el correo ${foundUser.email} ha cargado documentos para solicitar la actualización a Premium.`);
    } catch (error) {
        next(error);
    }
}

const handleRemoveInactiveUsers = async (req, res, next) => {
    try {
        const users = await userService.getUserList();
        const now = DateTime.now();
        users.forEach(({ last_connection, email, role }) => {

            const interval = Interval.fromDateTimes(last_connection, now);

            const duration = interval.toDuration(['days', 'hours', 'minutes']);

            if (duration.toObject().days > 1 && role != "ADMIN") {
                console.log(`Eliminar al user ${email} y enviar mail`);
            }

            console.log(`Intervalo: ${duration.toObject().days} días, ${duration.toObject().hours} horas, ${duration.toObject().minutes} minutos`);
        });
        sendResponse(res, 200, true, "Comenzamos", users);
    } catch (error) {
        next(error);
    }
}

export default { handleCreateUserPassport, handleUserRoleChange, hadlePasswordReset, handleDocumentUpload, handleGetUserList, handleRemoveInactiveUsers }
