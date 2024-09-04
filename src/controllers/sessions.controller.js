import { userService } from "../services/index.js";
import sendResponse from "../utils/sendResponse.js";


const hadleCurrent = async (req, res) => {
    try {
        if (!req.session.user) {
            res.redirect('/login');
        }
        sendResponse(res, 200, true, "session", { user: req.session.user })
    } catch ({ message }) {
        console.error('Error al iniciar sesion', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }

}

const handleLoginPassportLocal = async (req, res) => {
    try {
        const { message } = req.authInfo;
        req.session.user = req.user;
        await userService.updateLastConnection(req.session.user._id);
        const data = {
            url: '/'
        }
        sendResponse(res, 200, true, message, data);
        req.logger.info(`inicio de sesion ${req.user.email}`)
    } catch ({ message }) {
        console.error('Error al iniciar sesion', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

const handleLogout = (req, res) => {
    try {
        req.logger.info(`logout ${req.session.user.email}`)
        req.session.destroy(err => {
            if (err) {
                sendResponse(res, 400, false, err.message)
            }
            else {
                sendResponse(res, 200, true, "Sesion cerrada", { url: '/login' })
            }
        })

    } catch ({ message }) {
        console.error('Error al cerrar sesion', message);
        const errorData = {
            error: message,
        };
        sendResponse(res, 500, false, 'Error en el servidor', errorData);
    }
}

const handleLoginPassportGitHub = async (req, res, next) => {
    try {
        // req.user es inyectado AUTOMATICAMENTE por Passport al parsear el done()
        req.session.user = req.user;
        req.session.save(async (err) => {
            if (err) {
                throw new CustomError(errorsDictionary.INTERNAL_ERROR, { message: err.message });
            }
            await userService.updateLastConnection(req.session.user._id);
            req.logger.info(`inicio de sesion ${req.session.user.email}`)
            res.redirect('/');
        });
    } catch (error) {
        req.logger.warning(`inicio de session ${error.message}`)
        next(error);
    }
};

export default { handleLoginPassportLocal, handleLogout, hadleCurrent, handleLoginPassportGitHub }