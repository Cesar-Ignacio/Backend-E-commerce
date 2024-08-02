import sendResponse from "../utils/sendResponse.js";


const hadleCurrent = async (req, res) => {
    try {
        if (!req.session.user) {
            res.redirect('/login');
        }
        sendResponse(res,200,true,"session",{user:req.session.user})
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
        const data = {
            url: '/'
        }
        sendResponse(res, 200, true, message, data);
        req.logger.info(`${req.method} ${req.url} inicio de sesion ${req.user.email}`)
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

export default { handleLoginPassportLocal, handleLogout, hadleCurrent }