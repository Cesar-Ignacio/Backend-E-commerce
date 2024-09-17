import { DateTime, Interval } from "luxon";

import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import { cartService, userService } from "../services/index.js";
import { hashPassword } from "../utils/bcrypt.js";
import sendResponse from "../utils/sendResponse.js";
import { transport } from "../utils/transportNodeMailer.js";
import { config } from "../config.js";


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
            const message = `El usuario ${foundUser.email} no puede ser promovido a Premium sin haber proporcionado la documentación necesaria.`;
            req.logger.warning(message);
            throw new CustomError(errorsDictionary.NO_DOCUMENTS_PROVIDED, { message });
        }
        const userWithNewRole = await userService.UserRoleChange(foundUser)
        if(req.session.user.role!="ADMIN")
        {
            req.session.user.role = userWithNewRole.role
        }
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

const handleDeleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundUser = await userService.findOneById(userId);
        if (!foundUser) {
            req.logger.warning(`ID de usuario no encontrado: ${userId}`);
            throw new CustomError(errorsDictionary.ID_NOT_FOUND, { message: "No se encontro el ID del usuario" });
        }
        const userDelete = await userService.deleteUser(userId);
        await cartService.deleteCart(foundUser.cart_id)
        sendResponse(res, 200, true, "Usuario Eliminado", userDelete);
        req.logger.info(`El usuario con emial: ${foundUser.email} fue eliminado con exito`);
    } catch (error) {
        next(error);
    }
}

const handleRemoveInactiveUsers = async (req, res, next) => {
    try {
        const users = await userService.getUserListDev();
        const now = DateTime.now();
        const inactiveUsers = [];
        users.forEach(async (user) => {
            const interval = Interval.fromDateTimes(user.last_connection, now);
            const duration = interval.toDuration(['days', 'hours', 'minutes']);
            if (duration.toObject().hours >= 1 && user.role != "ADMIN") {
                inactiveUsers.push(user)
                const response = await transport.sendMail({
                    from: `E-commerce <${config.GMAIL_APP_USER}>`,
                    to: `${user.email}`,
                    subject: "Cuenta Eliminada por Inactividad",
                    html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #555;">Cuenta Eliminada por Inactividad</h2>
                    <p>Hola,</p>
                    <p>Lamentamos informarte que tu cuenta ha sido eliminada debido a un periodo prolongado de inactividad. Para nosotros es importante mantener la seguridad y el buen funcionamiento de nuestra plataforma.</p>
                    <p>Si crees que esto ha sido un error o deseas reactivar tu cuenta, por favor, contáctanos lo antes posible.</p>
                    <p>Gracias por tu comprensión.</p>
                    <p>El equipo de E-commerce</p>
                    </div>
                    `
                });
                await userService.deleteUser(user.id);
                await cartService.deleteCart(user.cart_id)
                req.logger.info(`Se ha eliminado la cuenta que le pertenece al user ${user.email}, por inactividad`)
            }
            // console.log(`Intervalo: ${duration.toObject().days} días, ${duration.toObject().hours} horas, ${duration.toObject().minutes} minutos`);
        });
        sendResponse(res, 200, true, "Eliminacion de usuarios inactivos", inactiveUsers);
    } catch (error) {
        next(error);
    }
}

export default { handleCreateUserPassport, handleUserRoleChange, hadlePasswordReset, handleDocumentUpload, handleGetUserList, handleRemoveInactiveUsers, handleDeleteUser }
