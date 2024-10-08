import CustomError from "../error/customError.error.js";
import errorsDictionary from "../error/errorDictionary.error.js";
import sendResponse from "../utils/sendResponse.js";

export const handlePolice = (policies) => {
    return (req, res, next) => {
        if (policies.includes("PUBLIC")) return next();

        const user = req.session.user;

        // Redirigir si no hay usuario en la sesión
        if (!user) {
            req.logger.warning(`Unauthenticated user attempted to access a restricted page`)
            return res.redirect('/login');
        }

        // Verificar si el rol del usuario está permitido
        if (!policies.includes(user.role.toUpperCase())) {
            let message = '';
            if (user.role.toUpperCase() === 'USER') {
                message = 'Access Denied: User role does not have the required permissions.';
            } else if (user.role.toUpperCase() === 'PREMIUM') {
                message = 'Access Denied: Premium role does not have the required permissions.';
            } else {
                message = 'Access Denied: Your role does not have the required permissions.';
            }
            req.logger.warning(`${user.email} ${message}`)
            throw new CustomError(errorsDictionary.AUTHORIZATION_ERROR,{message})
        }

        // Agregar el usuario a la solicitud y continuar
        req.user = user;
        next();
    }
}